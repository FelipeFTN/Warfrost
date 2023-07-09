import { Socket } from "./socket";

async function network(message: string = "end") {
  const socket = new Socket("127.0.0.1", 8080);

  socket.connect();
  socket.handshake();
  socket.listener();
  socket.send(message);
}

export default network;
