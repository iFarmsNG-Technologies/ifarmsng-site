use axum::{Router, response::Html, routing::get};

async fn index() -> Html<&'static str> {
    Html("<h1>iFarmsNG</h1> <p>Rice Farming, powered by iFarmsNG Technology</p>")
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(index));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Server running on http://0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}
