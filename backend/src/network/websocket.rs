use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use futures_util::stream::StreamExt;
use tokio_tungstenite::tungstenite::Message;
use futures_util::sink::SinkExt;


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

    let (mut write, read) = ws_stream.split();

    // Send a response back to the client
    // read.forward(write).await;

    read.for_each(|result| {
        match result {
            Ok(message) => {
                let msg = &message; // Todo: I did this with some sort of luck. Please study more
                                    // about Rust Ownership and Variables Scope. This do not look
                                    // like a good pattern to keep.
                let _ = write.send(Message::Text(msg.clone().to_string()));
                handle_message(msg.clone());
            }
            Err(err) => {
                eprintln!("error receiving message: {}", err);
            }
        }
        futures::future::ready(())
    }).await;

}


fn handle_message(message: Message) {
    match message {
        Message::Text(text) => {
            println!("Received text message: {}", text);
            // Handle the text message here
        }
        Message::Binary(data) => {
            println!("Received binary message with {} bytes", data.len());
            // Handle the binary message here
        }
        Message::Ping(_) => {
            // Handle the ping message here
        }
        Message::Pong(_) => {
            // Handle the pong message here
        }
        Message::Close(_) => {
            // Handle the close message here
            println!("WebSocket connection closed");
        }
        Message::Frame(_) => {

        }
    }
}
