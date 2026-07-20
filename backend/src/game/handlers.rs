use simple_websockets::{Message, Responder};

use crate::network::utils::{*};
use crate::game::units::Units;
use crate::pathfind::models::Grids;

/// WS Handler: Create units
pub fn units_create(units: &mut Units, text: &String, responder: &Responder) {
    if let Some( new_units ) = get_units(text.to_string()) {
        for unit in new_units {
            units.create_unit(unit.x, unit.y, unit.team, unit.class, unit.groups);
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

/// WF Handler: Client start
/// This function will give to client everything they need to start playing (units, trops,
/// resources, house, etc.).
pub fn client_start(client_id: u64, units: &mut Units, responder: &Responder) {
    for _ in 0..=2 {
        if let Some((x, y)) = get_coordinates(get_spawn()) {
            let team: i8 = client_id.try_into().unwrap(); // Convert to 8 bits integer
            units.create_unit(x, y, Some(team), Some(String::from("Default")), Some(Vec::new()));
        } else {
            responder.send(Message::Text(String::from("Error: could not perform connection due to bad Cooordinates")));
        } 
    }
}

/// WS Handler: Get pathfind grid
/// [Work in Progress](https://github.com/FelipeFTN/Warfrost/commit/5073b6165e72d2475d94d15de5962926ed81133f)
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
