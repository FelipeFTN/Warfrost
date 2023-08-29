use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Grid {
    x: i16,
    y: i16,
    width: i16,
    height: i16,
}


