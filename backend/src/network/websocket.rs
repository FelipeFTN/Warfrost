use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use futures_util::stream::StreamExt;


#[tokio::main]
pub async fn start() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(accept_connection(stream));
    }
}

async fn accept_connection(stream: tokio::net::TcpStream) {
    let ws_stream = accept_async(stream).await.unwrap();

    println!("New WebSocket connection: {}", ws_stream.get_ref().peer_addr().unwrap());

    let (write, read) = ws_stream.split();

    read.forward(write).await.unwrap();
}

