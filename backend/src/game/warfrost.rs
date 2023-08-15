use simple_websockets::Responder;
use std::collections::HashMap;
use super::players::Players;

use crate::network::websocket::network;

pub fn warfrost() {
    let mut players = Players::new();
    let mut clients: HashMap<u64, Responder> = HashMap::new();
    network(&mut clients, &mut players);
}
