use simple_websockets::{Message, Responder};

use crate::network::utils::{get_id, get_coordinates};
use crate::game::players::Players;


pub fn player_select(players: &mut Players, text: &String, responder: &Responder) {
    if let Some( id ) = get_id(text.to_string()) {
        players.set_selected(id, true);
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}

pub fn mouse_click(players: &mut Players, text: &String, responder: &Responder) {
    if let Some((x, y)) = get_coordinates(text.to_string()) {
        if let Some( id ) = players.get_selected() {
            players.update_player(id, x, y);
            responder.send(Message::Text(format!("player::move::#{}::x{}y{}", id, x, y)));
        }
    } else {
        responder.send(Message::Text(format!("Error: {:?}", text)));
    }
}
