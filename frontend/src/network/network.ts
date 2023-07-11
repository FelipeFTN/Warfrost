export class Socket {
  private socket: WebSocket;

  private host: string;

  private port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  async connect() {
    this.socket = new WebSocket(`ws://${this.host}:${this.port}`);

    console.log('WebSocket');
    // When Connected
    this.socket.addEventListener('open', () => {
      console.log('Connected to the WebSocket server');
    });

    // When Disconnected
    this.socket.addEventListener('close', () => {
      console.log('Disconnected from the WebSocket server');
    });
  }

  async send(message: string) {
    this.socket.send(message);
  }

  async listener() {
    this.socket.addEventListener('message', (event) => {
      // Handle the received message
      const message = event.data;
      console.log('Received message from server:', message);
    });
  }
}
