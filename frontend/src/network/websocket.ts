class Socket {
  private socket: WebSocket;

  private host: string;

  private port: string;

  private message: string;

  constructor(host: string, port: string) {
    this.message = "";
    this.host = host;
    this.port = port;
  }

  async connect() {
    this.socket = new WebSocket(`ws://${this.host}:${this.port}`);

    // Handle WebSocket connection open event
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Handle WebSocket message received event
    this.socket.onmessage = (event: any) => {
      this.message = event.data;
      console.log(event.data);
    };

    // Handle WebSocket connection close event
    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };
  }

  async on(event: string, obj: any) {
    switch (event) {
      case "move":
        let move: any;
        if (this.message.includes("move")) {
          if (move = this.moveHandler(this.message)) {
            obj.x = move.x;
            obj.y = move.y;
          }
        }
        break;
      default:
        break;
    }
  }

  async send(message: string) {
    this.socket.send(message);
  }

  moveHandler(coordinates: string) {
    const regex = /object#(\d+):move:x(\d+)y(\d+)/;
    const matches = coordinates.match(regex);

    if (matches && matches.length === 4) {
      const id = parseInt(matches[1]);
      const x = parseInt(matches[2]);
      const y = parseInt(matches[3]);

      return { id, x, y };
    }
    return null;
  }
}
export default Socket;
