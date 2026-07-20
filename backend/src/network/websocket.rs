use simple_websockets::{Event, Responder};
use std::collections::HashMap;
use std::net::TcpListener;
use std::env;

use crate::pathfind::models::Grids;
use crate::network::handlers::{*};
use crate::network::utils::{*};
use crate::game::units::Units;

pub fn network(clients: &mut HashMap<u64, Responder>, units: &mut Units, grids: &mut Grids) {
    // Bind address is configurable via the HOST/PORT environment variables
    // (the Docker image already sets both), falling back to sensible defaults.
    let host = env::var("HOST").unwrap_or_else(|_| String::from("0.0.0.0"));
    let port = env::var("PORT").unwrap_or_else(|_| String::from("8080"));
    let addr = format!("{host}:{port}");
    let listener = TcpListener::bind(&addr).unwrap();
    println!("Listening on {addr}...");
    let event_hub = simple_websockets::launch_from_listener(listener).expect("failed to listen on port 8080.");

    // map between client ids & client's 'Responder'
    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                ws_connect(client_id, clients, responder);
            }
            Event::Disconnect(client_id) => {
                ws_disconnect(client_id, clients, units);
            }
            Event::Message(client_id, message) => {
                ws_message(client_id, message, clients, units, grids);
            }
        }
        update_units(clients, units);
    }
}
