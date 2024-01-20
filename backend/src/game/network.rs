use simple_websockets::{Message, Responder};

use crate::network::utils::{*};
use crate::game::units::Units;
use crate::pathfind::models::Grids;

/// WS Handler: Create units
pub fn units_create(units: &mut Units, text: &String, responder: &Responder) {
    if let Some( new_units ) = get_units(text.to_string()) {
        for unit in new_units {
            units.create_unit(unit);
        }
    } else {
        responder.send(Message::Text(format!("Back-end Error: {:?}", text)));
    }
}

/// WS Handler: Update units
pub fn units_update(units: &mut Units, text: &String, responder: &Responder) {
    if let Some( new_units ) = get_units(text.to_string()) {
        units.set_units(new_units);
    } else {
        responder.send(Message::Text(format!("Back-end Error: {:?}", text)));
    }
}

/// WS Handler: Move units
/// Received a message from client #3: units::move::[{"id": 3, "x": 220, "y": 37}, {"id": 2, "x": 48, "y": 238}]
pub fn units_move(units: &mut Units, text: &String, responder: &Responder) {
    if let Some( move_units ) = get_units(text.to_string()) {
        units.set_units(move_units);
    } else {
        responder.send(Message::Text(format!("Back-end Error: {:?}", text)));
    }
}

/// [Work in Progress] WS Handler: Get pathfind grid
pub fn pathfind(_units: &mut Units, grids: &mut Grids, text: &String, responder: &Responder) {
    if let Some( game_grids ) = get_pathfind_grid(text.to_string()) {
        let mut id: u64 = 0;
        for mut grid in game_grids.clone() {
            grid.set_id(id);
            id += 1;
        }
        grids.add_grids(game_grids);
    } else {
        responder.send(Message::Text(format!("Back-end Error: {:?}", text)));
    }
}
