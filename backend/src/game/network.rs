use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::network::utils::{get_coordinates, get_spawn, update_players};
use crate::game::players::Players;

// ws stands for web socket.
pub fn ws_message(client_id: u64, message: Message, clients: &mut HashMap<u64, Responder>, players: &mut Players) {
    if let Message::Text(text) = &message {
        println!("Received a message from client #{}: {}", client_id, text);
        let responder = clients.get(&client_id).unwrap();

        match text {
            text if text.contains("mouse:right:click") => {
                if let Some((x, y)) = get_coordinates(text.to_string()) {
                    responder.send(Message::Text(format!("object#0::move::x{}y{}", x, y)));
                } else {
                    responder.send(Message::Text(format!("Error: {:?}", text)));
                }
            }
            _ => {
                responder.send(Message::Text(String::from("Hello from Server ;)")));
            }
        }
    }
}

pub fn ws_disconnect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
) {
    println!("A client with id #{} disconnected.", client_id);
    clients.remove(&client_id);
    players.remove_player(client_id);
}

pub fn ws_connect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
    responder: Responder,
) {
    println!("A client connected with id #{}.", client_id);
    clients.insert(client_id, responder);
    if let Some((x, y)) = get_coordinates(get_spawn()) {
        players.add_player(x, y);
        update_players(clients, players, client_id);
    } else {
        panic!("error: get_coordinates");
    }
}
