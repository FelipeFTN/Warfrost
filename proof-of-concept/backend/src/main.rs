mod network;
mod pathfind;

fn main() {
    // network();
    find_path();
}

fn find_path() {
    pathfind::find();
}

// fn network() {
//     let n = match network::start_network() {
//         Ok(n) => println!("Ready to Work! {:?}", n),
//         Err(e) => println!("Work Work {:?}", e)
//     };
//     println!("We got the n: {:?}", n);
// }
