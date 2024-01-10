use simple_websockets::{Event, Responder};
use std::collections::HashMap;
use std::net::TcpListener;

use crate::pathfind::models::Grids;
use crate::network::handlers::{*};
use crate::game::players::Players;

pub fn network(clients: &mut HashMap<u64, Responder>, players: &mut Players, grids: &mut Grids) {
    // Listen for WebSockets on port 8080
    // TODO: Get the port from environment variable
    let listener = TcpListener::bind("0.0.0.0:8080").unwrap();
    let event_hub = simple_websockets::launch_from_listener(listener).expect("failed to listen on port 8080.");

    // map between client ids & client's 'Responder'
    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                ws_connect(client_id, clients, players, responder);
            }
            Event::Disconnect(client_id) => {
                ws_disconnect(client_id, clients, players);
            }
            Event::Message(client_id, message) => {
                ws_message(client_id, message, clients, players, grids);
            }
        }
    }
}
