use simple_websockets::{Message, Responder};

use crate::network::utils::{*};
use crate::game::players::Players;
use crate::pathfind::models::Grids;

pub fn players_update(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( new_players ) = get_players(text.to_string()) {
        players.set_players(new_players);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

// Received a message from client #3: players::move::[{"id": 3, "x": 220, "y": 37}, {"id": 2, "x": 48, "y": 238}]
pub fn player_move(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( move_players ) = get_players(text.to_string()) {
        players.set_players(move_players);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

pub fn pathfind(_players: &mut Players, grids: &mut Grids, text: &String, responder: &Responder) {
    if let Some( game_grids ) = get_pathfind_grid(text.to_string()) {
        let mut id: u64 = 0;
        for mut grid in game_grids.clone() {
            grid.set_id(id);
            id += 1;
        }
        grids.add_grids(game_grids);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}
