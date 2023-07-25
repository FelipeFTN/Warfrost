use simple_websockets::{Message, Responder};
use std::collections::HashMap;

use crate::network::utils::{get_coordinates, get_spawn};

pub fn network() {

}

// ws stands for web socket.
pub fn ws_message(client_id: u64, message: Message, clients: &mut HashMap<u64, Responder>) {
    if let Message::Text(text) = &message {
        println!("Received a message from client #{}: {}", client_id, text);
        let responder = clients.get(&client_id).unwrap();

        match text {
            text if text.contains("mouse:right:click") => {
                if let Some((x, y)) = get_coordinates(text.to_string()) {
                    responder.send(Message::Text(format!("object#0::move::x{}y{}", x, y)));
                } else {
                    responder.send(Message::Text(format!("Error: {:?}", text)));
                }
            }
            _ => {
                responder.send(Message::Text(String::from("Hello from Server ;)")));
            }
        }
    }
}

pub fn ws_disconnect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
) {
    println!("A client with id #{} disconnected.", client_id);
    clients.remove(&client_id);
}

pub fn ws_connect(
    client_id: u64,
    clients: &mut HashMap<u64, Responder>,
    responder: Responder,
) {
    println!("A client connected with id #{}.", client_id);
    clients.insert(client_id, responder);
    // send_new_player(clients, players, client_id);
}
