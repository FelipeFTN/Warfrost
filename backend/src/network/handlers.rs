use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::game::network::{*};
use crate::network::utils::{*};
use crate::game::players::Players;
use crate::pathfind::models::Grids;

// ws stands for web socket.
pub fn ws_message(client_id: u64, message: Message, clients: &mut HashMap<u64, Responder>, players: &mut Players, grids: &mut Grids) {
    if let Message::Text(text) = &message {
        println!("Received a message from client #{}: {}", client_id, text);
        let responder = clients.get(&client_id).unwrap();

        match text {
            text if text.contains("players::update") => {
                players_update(players, text, responder);
            }
            text if text.contains("players::move") => {
                player_move(players, text, responder)
            }
            text if text.contains("pathfind::grid") => {
                pathfind(players, grids, text, responder);
            }
            _ => {
                responder.send(Message::Text(String::from("Error: Unhandled message from Server")));
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
}

pub fn ws_connect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
    responder: Responder,
) {
    println!("A client connected with id #{}.", client_id);
    clients.insert(client_id, responder.clone());
    if let Some((x, y)) = get_coordinates(get_spawn()) {
        let team: i8 = client_id.try_into().unwrap(); // Convert to 8 bits integer
        players.add_player(x, y, Some(team), Some(String::from("Default")), Some(Vec::new()));
        update_players(clients, players);
        responder.send(Message::Text(String::from(format!("client::id::#{:?}", client_id))));
    } else {
        responder.send(Message::Text(String::from("Error: could not perform connection due to bad Cooordinates")));
    }
}
