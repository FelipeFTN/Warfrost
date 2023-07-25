use simple_websockets::{Event, Responder};
use std::collections::HashMap;

use crate::game::network::{ws_connect, ws_disconnect, ws_message};
use crate::game::players::Players;

pub fn network(players: &mut Players) {
    // Listen for WebSockets on port 8080
    // TODO: Get the port from environment variable
    let event_hub = simple_websockets::launch(8080).expect("failed to listen on port 8080.");

    // map between client ids & client's 'Responder'
    let mut clients: HashMap<u64, Responder> = HashMap::new();

    loop {
        match event_hub.poll_event() {
            Event::Connect(_client_id, responder) => {
                ws_connect(0, &mut clients, players, responder);
            }
            Event::Disconnect(_client_id) => {
                ws_disconnect(0, &mut clients, players);
            }
            Event::Message(_client_id, message) => {
                ws_message(0, message, &mut clients, players);
            }
        }
    }
}
