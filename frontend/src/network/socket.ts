import * as net from 'net';

export class Socket {
  private socket: net.Socket;

  private host: string;

  private port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  async connect() {
    this.socket = net.createConnection({ host: this.host, port: this.port });

    // When Connected
    this.socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
    });

    // When Disconnected
    this.socket.on('end', () => {
      console.log('Disconnected from the WebSocket server');
    });
  }

  async send(message: string) {
    this.socket.write(message);
  }

  // Send the WebSocket handshake request
  async handshake() {
    const handshakeRequest = [
      'Warfrost-Handshake'
    ].join('\r\n');

    this.send(handshakeRequest);
  }

  async listener() {
    this.socket.on('data', (data: Buffer) => {
      // Convert the data to a string
      const message = data.toString('utf-8');
      console.log('Received message from server:', message);
    });
  }

}
