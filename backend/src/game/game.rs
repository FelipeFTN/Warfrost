use players::Players;

use crate::network::websocket::start_network;

pub fn warfrost() {
    let mut players = Players::new();
    start_network();
}
