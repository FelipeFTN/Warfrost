import * as events from "./events";

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

    async on(event: string, WF: any) { // this code is terrible, please improve
        switch (event) {
            case "client::id":
                events.getId(this.message, WF);
                break;
            case "players::update":
                events.updatePlayers(this.message, WF);
                break;
            case "client::disconnect":
                events.removePlayer(this.message, WF);
                break;
            case "player::move":
                events.movePlayer(this.message, WF);
                break;
            default:
                return false;
        }
        return true;
    }

    async send(message: string) {
        this.socket.send(message);
    }

    getMessage(): string { return this.message; }
}
export default Socket;
