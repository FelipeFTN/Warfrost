use super::players::Players;

use crate::network::websocket::network;

pub fn warfrost() {
    let mut players = Players::new();
    network(&mut players);
}
