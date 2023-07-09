mod network;

fn main() {
    let n = match network::server::start() {
        Ok(n) => println!("Ready to Work! {:?}", n),
        Err(e) => panic!("Work Work {:?}", e)
    };
    println!("We got the return: {:?}", n);
}
