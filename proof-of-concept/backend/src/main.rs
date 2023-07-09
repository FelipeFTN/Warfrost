mod network;

fn main() {
    let n = match network::start_network() {
        Ok(n) => println!("Ready to Work! {:?}", n),
        Err(e) => println!("Work Work {:?}", e)
    };
    println!("We got the n: {:?}", n);
}
