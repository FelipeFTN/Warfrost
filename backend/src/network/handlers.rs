use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::game::network::{*};
use crate::network::utils::{*};
use crate::game::units::Units;
use crate::pathfind::models::Grids;

// Quick tip: ws stands for web socket.
/// WS Handler: Message from client handler
pub fn ws_message(client_id: u64, message: Message, clients: &mut HashMap<u64, Responder>, units: &mut Units, grids: &mut Grids) {
    if let Message::Text(text) = &message {
        println!("Received a message from client #{}: {}", client_id, text);
        let responder = clients.get(&client_id).unwrap();

        match text {
            text if text.contains("units::create") => {
                units_create(units, text, responder);
            }
            text if text.contains("units::update") => {
                units_update(units, text, responder);
            }
            text if text.contains("units::move") => {
                units_move(units, text, responder)
            }
            text if text.contains("pathfind::grid") => {
                pathfind(units, grids, text, responder);
            }
            _ => {
                responder.send(Message::Text(String::from("Error: Unhandled message from Server")));
            }
        }
        update_units(clients, units);
    }
}

/// WS Handler: Client disconnected handler
pub fn ws_disconnect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    units: &mut Units,
) {
    println!("A client with id #{} disconnected.", client_id);
    clients.remove(&client_id);
    units.remove_units_from_player(client_id.try_into().unwrap());
    send_all_clients(clients, 
        format!("client::disconnected::#{}", client_id)
    );
}

/// WS Handler: New client connected handler
pub fn ws_connect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    responder: Responder,
) {
    println!("A client connected with id #{}.", client_id);
    clients.insert(client_id, responder.clone());
    responder.send(Message::Text(String::from(format!("client::id::#{:?}", client_id))));
}
