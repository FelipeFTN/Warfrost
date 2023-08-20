use simple_websockets::{Event, Responder, Message};
use std::collections::HashMap;

pub fn network() {
    let event_hub = simple_websockets::launch(8080).expect("failed to listen on port 8080.");

    let mut clients: HashMap<u64, Responder> = HashMap::new();

    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                clients.insert(client_id, responder.clone());
                responder.send(Message::Text(format!("Hello, {:?}", client_id)));
            }
            Event::Disconnect(client_id) => {
                let client = clients.get(&client_id).unwrap();
                client.send(Message::Text(format!("Bye, {:?}", client_id)));
            }
            Event::Message(client_id, message) => {
                let client = clients.get(&client_id).unwrap();
                client.send(Message::Text(format!("{:?} - {:?}", message, client_id)));
            }
        }
    }
}
