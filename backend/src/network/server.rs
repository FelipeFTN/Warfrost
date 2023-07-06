#![allow(unused_assignments)]

use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpStream, TcpListener};
use std::env;
use std::io;

#[tokio::main]
pub async fn main() -> io::Result<()> {
    let mut port = String::new();
    match env::var("PORT") {
        Ok(val) => { port = val; },
        Err(_) =>  { port = "8080".to_string(); },
    };

    let host = format!("{}:{}", "127.0.0.1", port);
    let listener = TcpListener::bind(host).await?;

    loop {
        let (socket, _) = listener.accept().await?;

        tokio::spawn(async move {
            // Process each socket concurrently.
            process(socket).await
        });
    }
}

async fn process(socket: TcpStream) {
    let mut socket_instance = socket;
    // Read data from the stream
    let mut buffer = vec![0; 1024];
        let read_bytes = match socket_instance.read(&mut buffer).await {
        Ok(n) => n,
        Err(err) => {
            eprintln!("Error reading from socket: {}", err);
            return;
        }
    };

    // Convert the received data to a string
    let received_data = String::from_utf8_lossy(&buffer[..read_bytes]);

    // Print the incoming request
    println!("Received request: {}", received_data);

    // Write a response back to the client
    let response = "Hello from the server!";
        if let Err(err) = socket_instance.write_all(response.as_bytes()).await {
        eprintln!("Error writing response to socket: {}", err);
        return;
    }
}

