use simple_websockets::{Message, Responder};
use std::collections::HashMap;
use rand::{thread_rng, Rng};

pub fn get_coordinates(text: String) -> Option<(i32, i32)> {
    let regex = regex::Regex::new(r":x(\d+)y(\d+)").unwrap();
    if let Some(captures) = regex.captures(&text) {
        let x = captures.get(1).unwrap().as_str().parse::<i32>().unwrap();
        let y = captures.get(2).unwrap().as_str().parse::<i32>().unwrap();
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

pub fn send_new_player(
    clients: &mut HashMap<u64, Responder>,
    players: &mut HashMap<u64, String>,
    client_id: u64,
) {
    let responder = clients.get(&client_id).unwrap();
    responder.send(Message::Text(format!(
        "new::player#{}::{}",
        client_id,
        players.get(&client_id).unwrap()
    )));
}
