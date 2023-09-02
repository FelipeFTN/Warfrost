use simple_websockets::Responder;
use std::collections::HashMap;
use super::players::Players;

use crate::network::websocket::network;
use crate::pathfind::models::Grids;

pub fn warfrost() {
    let mut players = Players::new();
    let mut clients: HashMap<u64, Responder> = HashMap::new();
    let mut grids = Grids::new();
    network(&mut clients, &mut players, &mut grids);
}
