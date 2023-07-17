use simple_websockets::{Event, Responder, Message};
use std::collections::HashMap;

pub fn start() {
    // Listen for WebSockets on port 8080:
    let event_hub = simple_websockets::launch(8080)
        .expect("failed to listen on port 8080.");
    
    // map between client ids & client's 'Responder':
    let mut clients: HashMap<u64, Responder> = HashMap::new();

    // Work in Progress: Create a separeted Handler
    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                println!("A client connected with id #{}.", client_id);
                // add their Responser to our 'clients' map:
                clients.insert(client_id, responder);
            },
            Event::Disconnect(client_id) => {
                println!("A client with id #{} disconnected.", client_id);
                // add their Responser to our 'clients' map:
                clients.remove(&client_id);
            },
            Event::Message(client_id, message) => {
                if let Message::Text(text) = &message {
                    println!("Received a message from client #{}: {}", client_id, text);
                } 
                // retrieve this client's 'Responder':
                let responder = clients.get(&client_id).unwrap();
                // echo the message back;
                responder.send(message);
            },
        }    
    }
}
