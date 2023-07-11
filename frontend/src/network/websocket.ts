class Socket {
  private socket: WebSocket;

  private host: string;

  private port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  async connect() {
    this.socket = new WebSocket(`ws://${this.host}:${this.port}`);

    // Handle WebSocket connection open event
    this.socket.onopen = () => {
      console.log('WebSocket connection established');

      // Handle WebSocket message received event
      this.socket.onmessage = (event: any) => {
        const message = event.data;
        console.log('Received message:', message);
      };

      // Send a message to the server
      this.socket.send('Hello, server!');
    };

    // Handle WebSocket connection close event
    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };
  }

  async send(message: string) {
    this.socket.send(message);
  }
}
export default Socket;
