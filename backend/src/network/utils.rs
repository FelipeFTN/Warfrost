use rand::{thread_rng, Rng};
use simple_websockets::{Message, Responder};
use std::collections::HashMap;
use regex::Regex;

use crate::game::players::{Players, Player};
use crate::pathfind::models::Grid;

pub fn get_players(text: String) -> Option<Vec<Player>> {
    let regex = Regex::new(r"::(\[[^\]]+\])").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let players_str = captures.get(1).unwrap().as_str();
        match serde_json::from_str(players_str) {
            Ok(players_json) => {
                let players: Vec<Player> = players_json;
                Some(players)
            },
            Err(e) => {
                println!("players: {:?}", e);
                None
            },
        }
    } else {
        None
    }
}

pub fn get_id(text: String) -> Option<u64> {
    let regex = regex::Regex::new(r"#(\d+)").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let id  = captures.get(1).unwrap().as_str().parse::<u64>().unwrap();
        Some( id )
    } else {
        None
    }
}

pub fn get_coordinates(text: String) -> Option<(i16, i16)> {
    let regex = regex::Regex::new(r"x(\d+)y(\d+)").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let x = captures.get(1).unwrap().as_str().parse::<i16>().unwrap();
        let y = captures.get(2).unwrap().as_str().parse::<i16>().unwrap();
        Some((x, y))
    } else {
        None
    }
}

pub fn get_spawn() -> String {
    let min_value = 20;
    let max_value = 300;

    let x = thread_rng().gen_range(min_value..=max_value);
    let y = thread_rng().gen_range(min_value..=max_value);

    return String::from(format!("x{}y{}", x, y));
}

pub fn update_players(
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
) {
    send_all_clients(clients,
        format!(
            "players::update::{}",
            players.get_players_json()
        )
    )
}

pub fn send_all_clients(clients: &mut HashMap<u64, Responder>, message: String) {
    // Iterate over the clients in the HashMap using a for loop.
    for (_, responder) in clients {
        responder.send(Message::Text(message.clone()));
    }
}

pub fn get_pathfind_grid(text: String) -> Option<Vec<Grid>> {
    let regex = Regex::new(r"pathfind::grid::(\[[^\]]+\])").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let pathfind_str = captures.get(1).unwrap().as_str();
        match serde_json::from_str(pathfind_str) {
            Ok(pathfind_json) => {
                let grid: Vec<Grid> = pathfind_json;
                Some(grid)
            },
            Err(_) => None,
        }
    } else {
        None
    }
}
