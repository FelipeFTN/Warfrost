use simple_websockets::{Event, Message, Responder};
use std::collections::HashMap;

pub fn start() {
    // Listen for WebSockets on port 8080:
    let event_hub = simple_websockets::launch(8080).expect("failed to listen on port 8080.");

    // map between client ids & client's 'Responder':
    let mut clients: HashMap<u64, Responder> = HashMap::new();

    // Work in Progress: Create a separeted Handler
    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                println!("A client connected with id #{}.", client_id);
                // add their Responser to our 'clients' map:
                clients.insert(client_id, responder);
            }
            Event::Disconnect(client_id) => {
                println!("A client with id #{} disconnected.", client_id);
                // add their Responser to our 'clients' map:
                clients.remove(&client_id);
            }
            Event::Message(client_id, message) => {
                if let Message::Text(text) = &message {
                    println!("Received a message from client #{}: {}", client_id, text);
                    // retrieve this client's 'Responder':
                    let responder = clients.get(&client_id).unwrap();

                    // this code is far from being good.
                    // I will be updating it later.
                    if text.contains("mouse") {
                        if let Some((x, y)) = get_coordinates(text.to_string()) {
                            responder.send(Message::Text(format!("player#0:move:x{}y{}", x, y)));
                        } else { responder.send(Message::Text(format!("Error: {:?}", text))); }
                    } else { responder.send(Message::Text("Hello! :)".to_string())); }
                }
            }
        }
    }
}

fn get_coordinates(text: String) -> Option<(i32, i32)> {
    let regex = regex::Regex::new(r"x(\d+)y(\d+)").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let x = captures.get(1).unwrap().as_str().parse::<i32>().unwrap();
        let y = captures.get(2).unwrap().as_str().parse::<i32>().unwrap();
        Some((x, y))
    } else {
        None
    }
}
