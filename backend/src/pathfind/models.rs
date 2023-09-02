use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone)]
#[derive(Serialize, Deserialize)]
pub struct Grid {
    #[serde(skip)]
    id: u64,
    x: i16,
    y: i16,
    width: i16,
    height: i16,
}

impl Grid {
    pub fn set_id(&mut self, id: u64) {
        self.id = id;
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Grids {
    grid_map: HashMap<u64, Grid>,
}

impl Grids {
    pub fn new() -> Self {
        Grids {
            grid_map: HashMap::new(),
        }
    }

    #[allow(dead_code)]
    pub fn add_grid(&mut self, grid: Grid) {
        self.grid_map.insert((grid.x/grid.width) as u64, grid);
    }

    pub fn add_grids(&mut self, grids: Vec<Grid>) {
        for grid in grids {
            self.grid_map.insert(grid.id, grid);
        }
    }
}
