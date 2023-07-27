use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone)]
#[derive(Serialize, Deserialize)]
pub struct Player {
    id: u64,
    x: i16,
    y: i16,
    selected: bool,
}

impl Player {
    fn new(x: i16, y:i16) -> Self {
        static mut NEXT_ID: u64 = 0;
        let selected = false;

        // Use unsafe block to increment and assign the ID
        let id = unsafe {
            let current_id = NEXT_ID;
            NEXT_ID += 1;
            current_id
        };

        Player { id, x, y, selected}
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Players {
    players_map: HashMap<u64, Player>,
}

impl Players {
    pub fn new() -> Self {
        Players {
            players_map: HashMap::new(),
        }
    }

    pub fn add_player(&mut self, x: i16, y: i16) {
        let player = Player::new(x, y);
        self.players_map.insert(player.id, player);
    }

    pub fn remove_player(&mut self, id: u64) {
        self.players_map.remove(&id);
    }

    pub fn update_player(&mut self, id: u64, new_x: i16, new_y: i16) {
        if let Some(player) = self.players_map.get_mut(&id) {
            player.x = new_x;
            player.y = new_y;
        }
    }

    #[allow(dead_code)]
    pub fn get_player(&self, id: u64) -> Option<&Player> {
        self.players_map.get(&id)
    }

    #[allow(dead_code)]
    pub fn get_players(&self) -> Vec<&Player> {
        self.players_map.values().collect()
    }

    pub fn set_selected(&mut self, id: u64, selected: bool) {
        if let Some(player) = self.players_map.get_mut(&id) {
            player.selected = selected;
        }
    }

    pub fn get_selected(&mut self) -> Option<u64> {
        self.players_map.iter()
            .filter(|(_, item)| item.selected)
            .find_map(|(id, _)| Some(*id))
    }

    pub fn get_players_json(&self) -> String {
        // Convert the HashMap to a Vec of Player structs
        let players: Vec<Player> = self.players_map
            .iter()
            .map(|(&id, player)| Player {
                id,
                x: player.x.clone(),
                y: player.y.clone(),
                selected: player.selected.clone(),
            })
            .collect();
        // Serialize the Vec<Player> to a JSON string
        let json_string = serde_json::to_string(&players).unwrap();

        format!("{}", json_string)
    }
}
