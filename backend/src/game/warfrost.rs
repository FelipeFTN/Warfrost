use simple_websockets::Responder;
use std::collections::HashMap;
use super::units::Units;

use crate::network::websocket::network;
use crate::pathfind::models::Grids;

pub fn warfrost() {
    let mut units = Units::new();
    let mut clients: HashMap<u64, Responder> = HashMap::new();
    let mut grids = Grids::new();
    network(&mut clients, &mut units, &mut grids);
}
