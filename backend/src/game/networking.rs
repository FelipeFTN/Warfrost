use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::Message};

#[tokio::main]
pub async fn start_connection() {
    let addr = "127.0.0.1:8080";

    let listener = TcpListener::bind(addr).await.expect("Failed to bind address");
    println!("Server listening on {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(accept_connection(stream));
    }
}

async fn accept_connection(stream: TcpStream) {
    if let Ok(ws_stream) = accept_async(stream).await {
        println!("New WebSocket connection established");

        let (mut writer, mut reader) = ws_stream.split();

        while let Some(Ok(msg)) = reader.next().await {
            if msg.is_text() || msg.is_binary() {
                let payload = msg.into_data();
                let received_text = String::from_utf8_lossy(&payload);
                println!("Received message: {}", received_text);
            }
        }
    }
}

