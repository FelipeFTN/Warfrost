use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::network::utils::{get_coordinates, get_spawn, update_players, send_all_clients};
use crate::game::network::{player_select, player_unselect, mouse_click};
use crate::game::players::Players;

// ws stands for web socket.
pub fn ws_message(client_id: u64, message: Message, clients: &mut HashMap<u64, Responder>, players: &mut Players) {
    if let Message::Text(text) = &message {
        println!("Received a message from client #{}: {}", client_id, text);
        let responder = clients.get(&client_id).unwrap();

        match text {
            text if text.contains("player::select") => {
                player_select(players, text, responder);
            }
            text if text.contains("player::unselect") => {
                player_unselect(players, text, responder);
            }
            text if text.contains("mouse::right::click") => {
                mouse_click(players, text, responder);
            }
            _ => {
                responder.send(Message::Text(String::from("Hello from Server")));
            }
        }
        update_players(clients, players);
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
    send_all_clients(clients, 
        format!("client::disconnected::#{}", client_id)
    );
    // update_players(clients, players);
}

pub fn ws_connect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
    responder: Responder,
) {
    println!("A client connected with id #{}.", client_id);
    clients.insert(client_id, responder);
    clients.get(&client_id).unwrap().send(Message::Text(
        format!("client::id::#{}", client_id)
    ));
    if let Some((x, y)) = get_coordinates(get_spawn()) {
        players.add_player(x, y);
        update_players(clients, players);
    } else {
        panic!("error: get_coordinates");
    }
}
