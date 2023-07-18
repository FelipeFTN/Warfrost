class Socket {
  private socket: WebSocket;

  private host: string;

  private port: string;

  private move: any;

  constructor(host: string, port: string) {
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
        if (message.includes("move")) {
          this.move = this.moveHandler(message);
        }
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

  async moveHandler(coordinates: string) {
    const regex = /x(\d+)y(\d+)/;
    const matches = coordinates.match(regex);

    if (matches && matches.length === 3) {
      const x = parseInt(matches[1]);
      const y = parseInt(matches[2]);

      return { x, y };
    }
    return null;
  }
  getMove() { return this.move; }
}
export default Socket;
