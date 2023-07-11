async function network(message: string = "end") {
  const socket = new WebSocket('ws://127.0.0.1:8080');

  // Handle WebSocket connection open event
  socket.onopen = () => {
    console.log('WebSocket connection established');

    // Send a message to the server
    socket.send('Hello, server!');
  };

  // Handle WebSocket message received event
  socket.onmessage = (event: any) => {
    const message = event.data;
    console.log('Received message:', message);
  };

  // Handle WebSocket connection close event
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
}
export default network;
