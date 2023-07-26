use rand::{thread_rng, Rng};
use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::game::players::Players;

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
    let max_value = 700;

    let x = thread_rng().gen_range(min_value..=max_value);
    let y = thread_rng().gen_range(min_value..=max_value);

    return String::from(format!("x{}y{}", x, y));
}

pub fn update_players(
    clients: &mut HashMap<u64, Responder>,
    players: &mut Players,
) {
    // let responder = clients.get(&client_id).unwrap();
    // responder.send(Message::Text(
    //     format!(
    //         "players::update::{}",
    //         players.get_players_json()
    //     )
    // ));
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
