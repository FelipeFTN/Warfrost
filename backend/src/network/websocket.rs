use simple_websockets::{Event, Responder};
use std::collections::HashMap;

use super::utils::{ws_connect, ws_disconnect, ws_message};

pub fn start() {
    // Listen for WebSockets on port 8080
    // TODO: Get the port from environment variable
    let event_hub = simple_websockets::launch(8080).expect("failed to listen on port 8080.");

    // map between client ids & client's 'Responder'
    let mut clients: HashMap<u64, Responder> = HashMap::new();

    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                ws_connect(client_id, &mut clients, responder);
            }
            Event::Disconnect(client_id) => {
                ws_disconnect(client_id, &mut clients);
            }
            Event::Message(client_id, message) => {
                ws_message(client_id, message, &mut clients);
            }
        }
    }
}
