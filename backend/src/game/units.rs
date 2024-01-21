use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone)]
#[derive(Serialize, Deserialize)]
pub struct Unit {
    pub id: u64,
    pub x: i16,
    pub y: i16,
    pub team: Option<i8>,
    pub class: Option<String>,
    pub groups: Option<Vec<String>>,
}

impl Unit {
    pub fn new(x: i16, y: i16, team: Option<i8>, class: Option<String>, groups: Option<Vec<String>>) -> Self {
        static mut NEXT_ID: u64 = 0;

        // Use unsafe block to increment and assign the ID
        let id = unsafe {
            let current_id = NEXT_ID;
            NEXT_ID += 1;
            current_id
        };

        Unit { id, x, y, team, class, groups }
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Units {
    units_map: HashMap<u64, Unit>,
}

impl Units { pub fn new() -> Self {
        Units {
            units_map: HashMap::new(),
        }
    }

    pub fn create_unit(&mut self, x: i16, y: i16, team: Option<i8>, class: Option<String>, groups: Option<Vec<String>>) {
        let unit = Unit::new(x, y, team, class, groups);
        self.units_map.insert(unit.id, unit);
    }

    #[allow(dead_code)]
    pub fn add_unit(&mut self, unit: Unit) {
        self.units_map.insert(unit.id, unit);
    }

    #[allow(dead_code)]
    pub fn remove_unit(&mut self, id: u64) {
        self.units_map.remove(&id);
    }

    // Kinda stupid logic, maybe there is a better optmized way
    // to do this kind of stuff, but I have no pacient for this rn.
    pub fn remove_units_from_player(&mut self, team: i8) {
        for i in self.units_map.clone() {
            if let Some( unit_team ) = i.1.team {
                if unit_team == team {
                    self.units_map.remove(&i.0);
                }
            }
        }
    }

    #[allow(dead_code)]
    pub fn update_unit(&mut self, id: u64, new_x: i16, new_y: i16) {
        if let Some(unit) = self.units_map.get_mut(&id) {
            unit.x = new_x;
            unit.y = new_y;
        }
    }

    #[allow(dead_code)]
    pub fn get_unit(&self, id: u64) -> Option<&Unit> {
        self.units_map.get(&id)
    }

    #[allow(dead_code)]
    pub fn get_units(&self) -> Vec<&Unit> {
        self.units_map.values().collect()
    }

    /// This function should set new values for units.
    pub fn set_units(&mut self, units: Vec<Unit>) {
        for unit in units {
            if let Some(old_unit) = self.units_map.get_mut(&unit.id) {
                old_unit.x = unit.x;
                old_unit.y = unit.y;
            } else { self.units_map.insert(unit.id, unit); }
        }
    }

    pub fn get_units_json(&self) -> String {
        // Convert the HashMap to a Vec of Unit structs
        let units: Vec<Unit> = self.units_map
            .iter()
            .map(|(&id, unit)| Unit {
                id,
                x: unit.x.clone(),
                y: unit.y.clone(),
                team: unit.team.clone(),
                class: unit.class.clone(),
                groups: unit.groups.clone(),
            })
            .collect();
        // Serialize the Vec<Unit> to a JSON string
        let json_string = serde_json::to_string(&units).unwrap();

        format!("{}", json_string)
    }
}
