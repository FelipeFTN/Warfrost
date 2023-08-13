use simple_websockets::{Message, Responder};

use crate::network::utils::{get_players, get_id, get_coordinates};
use crate::game::players::Players;

pub fn players_update(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( new_players ) = get_players(text.to_string()) {
        players.set_players(new_players);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

pub fn player_select(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( id ) = get_id(text.to_string()) {
        players.set_selected(id, true);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

pub fn player_unselect(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( id ) = get_id(text.to_string()) {
        players.set_selected(id, false);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

pub fn mouse_click(players: &mut Players, text: &String, responder: &Responder) {
    if let Some((x, y)) = get_coordinates(text.to_string()) {
        if let Some( id ) = players.get_selected() {
            players.update_player(id, x, y);
        }
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}
