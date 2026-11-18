use axum::{Router, routing::get};
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() {
    let dist = "../frontend/ifarmsng-web/out"; // adjust if the folder lives elsewhere, e.g. "frontend/out"

    let spa = ServeDir::new(dist)
        .append_index_html_on_directories(true)
        .fallback(ServeFile::new(format!("{dist}/404.html")));

    let app = Router::new()
        .route("/api/health", get(|| async { "ok" }))
        // add your other API routes under /api here
        .fallback_service(spa);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Server running on http://0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
