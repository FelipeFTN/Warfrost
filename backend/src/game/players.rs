use serde::Serialize;
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Player {
    id: u64,
    x: i64,
    y: i64,
}

#[derive(Debug)]
struct Players {
    players_map: HashMap<u64, Player>,
}

pub impl Players {
    fn new() -> self {
        Players {
            players_map: HashMap::new(),
        }
    }

    fn add_player(&mut self, id: u64, x: i64, y: i64) {
        let player = Player { id, x, y };
        self.players_map.insert(id, player);
    }

    fn remove_player(&mut self, id: u64) {
        self.players_map.remove(&id);
    }

    fn update_player(&mut self, id: u64, new_x: i64, new_y: i64) {
        if let Some(Player) = self.players_map.get_mut(&id) {
            player.x = new_x;
            player.y = new_y;
        }
    }

    fn get_player(&self, id: u64) -> Option<&Player> {
        self.players_map.get(&id)
    }

    fn get_all_players(&self) -> Vec<&Player> {
        self.players_map.values().collect()
    }
}
