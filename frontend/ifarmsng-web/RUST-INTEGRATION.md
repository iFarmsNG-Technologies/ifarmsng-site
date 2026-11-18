# Connecting this site to the Rust backend

> These Rust changes were written against the iFarmsNG Axum 0.8 project but **not compiled or run
> here** (no Rust toolchain in this session). Apply them, then run `cargo check` and `cargo test`.
> The existing `POST /api/contact` (HTML/HTMX) route and its tests are untouched.

## 1. Add a JSON endpoint: `POST /api/inquiries`

`src/models/inquiry.rs`, inside `impl FieldErrors`:
```rust
pub fn to_map(&self) -> std::collections::BTreeMap<String, String> {
    self.0.iter().map(|(k, v)| ((*k).to_string(), v.clone())).collect()
}
```

`src/routes/contact.rs` (add imports, then the handler):
```rust
use axum::extract::rejection::JsonRejection;
use axum::Json;
use serde::Serialize;
use std::collections::BTreeMap;

#[derive(Serialize)]
struct ErrorBody {
    errors: BTreeMap<String, String>,
}

#[derive(Serialize)]
struct OkBody {
    ok: bool,
}

pub async fn submit_json(
    State(state): State<AppState>,
    payload: Result<Json<ContactForm>, JsonRejection>,
) -> Response {
    let Json(raw) = match payload {
        Ok(p) => p,
        Err(rejection) => {
            tracing::warn!(error = %rejection, "rejected malformed JSON submission");
            return (rejection.status(), Json(ErrorBody { errors: BTreeMap::new() })).into_response();
        }
    };

    // Honeypot: pretend success, store nothing.
    if raw.is_honeypot_triggered() {
        tracing::warn!("honeypot triggered; submission discarded");
        return Json(OkBody { ok: true }).into_response();
    }

    let inquiry = match raw.validate() {
        Ok(i) => i,
        Err(boxed) => {
            let (_, errors) = *boxed;
            return (
                StatusCode::UNPROCESSABLE_ENTITY,
                Json(ErrorBody { errors: errors.to_map() }),
            )
                .into_response();
        }
    };

    match state.repo.insert(&inquiry).await {
        Ok(outcome) => {
            if let InsertOutcome::Created(id) = outcome {
                tracing::info!(%id, "inquiry stored");
                state.notify.notify_one(); // wake the email worker
            }
            Json(OkBody { ok: true }).into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "failed to store inquiry");
            StatusCode::INTERNAL_SERVER_ERROR.into_response()
        }
    }
}
```

`src/routes/mod.rs`, inside `contact_routes` (so it gets the same body limit and rate limit):
```rust
let contact_routes = Router::new()
    .route("/api/contact", post(contact::submit))
    .route("/api/inquiries", post(contact::submit_json))
    .layer(DefaultBodyLimit::max(CONTACT_BODY_LIMIT))
    .layer(middleware::from_fn_with_state(state.clone(), rate_limit::limit_requests));
```
The React form sends `full_name, company, email, phone, inquiry_type, subject, message, consent
("on"), website (honeypot), submission_id`. Statuses it handles: 200, 422 `{errors:{field:msg}}`,
429, anything else = generic failure.

Add a test in `tests/contact_api.rs` posting JSON with `content-type: application/json` and
asserting 200 + one stored row, 422 + `errors.email` for a bad email, and honeypot stores nothing.

## 2. Serve the exported site (`out/`) from Rust

Add `FRONTEND_DIR` to `Config` (optional string). In `build_router`, when it is set, serve the
site instead of the Askama pages:
```rust
use tower_http::services::{ServeDir, ServeFile};

if let Some(dir) = &state.config.frontend_dir {
    let site = ServeDir::new(dir)
        .precompressed_gzip()
        .not_found_service(ServeFile::new(format!("{dir}/404.html")));
    app = app.fallback_service(site);          // keep /health, /ready and /api/* routes
} else {
    app = app.route("/", get(pages::index)) /* ...existing Askama routes + fallback... */;
}
```
- Next writes real files (`privacy/index.html`), so you need no SPA fallback; unknown paths get a
  true 404 using `404.html`. `ServeDir` redirects `/privacy` to `/privacy/`.
- Caching: files under `/_next/static/` are content-hashed: send
  `Cache-Control: public, max-age=31536000, immutable`. HTML must be `no-cache`.
- `.env`: `FRONTEND_DIR=../ifarmsng-web/out`

## 3. Content-Security-Policy (important)

The Rust site currently sends `script-src 'self'`. Next's export puts **inline scripts** in each page
(2 on the home page: a tiny bootstrap and ~29 KB of page data), so with that CSP the page renders
but never becomes interactive and the form does nothing. Options:
1. **Quick:** in frontend mode use `script-src 'self' 'unsafe-inline'` (weaker XSS protection).
2. **Strict:** at build time, SHA-256 each inline script in `out/**/*.html` and list the hashes as
   `'sha256-...'` in `script-src` (regenerate on every build). Rust can compute these at startup.

Also allow what the page loads: `style-src 'self' https://fonts.googleapis.com`,
`font-src https://fonts.gstatic.com`, and, until you self-host the photos,
`img-src 'self' data: https://images.unsplash.com`.

## 4. Dev and Docker
- Dev: `cargo run` (:3000) + `npm run dev` (:3001). The Next dev server proxies `/api/*` to Rust,
  so there is no CORS to configure.
- Docker: add a Node stage (`npm ci && npm run build`) and `COPY --from=web /web/out /app/web`,
  then set `FRONTEND_DIR=/app/web`.
