# iFarmsNG Site

Public website for **iFarmsNG Agro Business Technology Ltd**, a CAC-registered Nigerian agribusiness focused on rice production in Benue State.

Built in Rust with [Axum](https://github.com/tokio-rs/axum). Pages are server-rendered HTML, so they stay small and load quickly on slow mobile networks.

## Status

Early development. Track progress in the [Issues](../../issues) and [Milestones](../../milestones).

| Feature | Status |
|---|---|
| Axum server | Done |
| Landing page (HTML and CSS) | In progress |
| Static file serving | Planned |
| Waitlist form and validation | Planned |
| PostgreSQL storage for signups | Planned |
| Docker image and deployment | Planned |

## Tech stack

- **Language:** Rust (stable)
- **Web framework:** Axum on the Tokio runtime
- **Templates:** Askama (planned)
- **Database:** PostgreSQL via SQLx (planned)
- **CI:** GitHub Actions (`fmt`, `clippy`, `test`, `build`)

## Getting started

### Prerequisites

- Rust stable toolchain ([rustup.rs](https://rustup.rs))
- PostgreSQL (needed once the waitlist is added)

### Run locally

```bash
git clone https://github.com/YOUR-USERNAME/ifarmsng-site.git
cd ifarmsng-site
cp .env.example .env
cargo run
```

Open <http://localhost:3000>.

### Configuration

Copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `DATABASE_URL` | PostgreSQL connection string (planned) | `postgres://user:pass@localhost:5432/ifarmsng` |

## Project structure

```
ifarmsng-site/
├── .github/
│   ├── workflows/ci.yml       # fmt, clippy, test, build
│   └── dependabot.yml         # weekly dependency updates
├── migrations/                # SQLx migrations (planned)
├── src/
│   ├── main.rs                # server startup and router
│   ├── routes.rs              # request handlers (planned)
│   ├── models.rs              # data types (planned)
│   └── error.rs               # application error type (planned)
├── static/
│   ├── css/style.css
│   └── img/
├── templates/
│   ├── base.html              # shared layout
│   └── index.html             # landing page
├── .env.example
├── .gitignore
├── Cargo.toml
├── Cargo.lock
└── README.md
```

## Development workflow

1. Create a branch from `main`: `git checkout -b feat/short-description`
2. Make small, focused commits using [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`).
3. Before pushing, run the same checks CI runs:

   ```bash
   cargo fmt --all -- --check
   cargo clippy --all-targets -- -D warnings
   cargo test
   cargo build --release
   ```

4. Open a pull request. CI must pass before merging.
5. Squash-merge into `main`.

## Deployment

Planned: a multi-stage Dockerfile that builds a single release binary, deployed to a small VPS behind HTTPS. Releases are tagged `vX.Y.Z` and published as GitHub Releases.

## Contact

iFarmsNG Agro Business Technology Ltd, Abuja, Nigeria.

## License

Proprietary. All rights reserved.
