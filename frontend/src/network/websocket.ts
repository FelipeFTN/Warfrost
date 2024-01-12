import * as events from "./events";

import Warfrost from '../game';

class Socket {
    private socket: WebSocket;

    private host: string;

    private port: string;

    private message: string;

    private messageQueue: Array<string>;

    constructor(host: string, port: string) {
        this.messageQueue = [];
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
        this.socket.onmessage = (event: MessageEvent) => {
            this.message = event.data;
            if (this.message.toLowerCase().includes("error")) {
                console.error(this.message);
                return;
            }
            this.messageQueue.push(this.message);
            console.log(event.data);
        };

        // Handle WebSocket connection close event
        this.socket.onclose = () => {
            console.log('Disconnected from the WebSocket server');
        };
    }

    // Trying to unfuck the message system.
    // A message queue is necessary for the front-end do not skip
    // any message comming from the server; since server process
    // data a lot faster than client.
    // Bugs still may happen here... must test it better.
    async on(event: string, WF: Warfrost) {
        const firstMessage = this.messageQueue[0] ?? "";
        if (!firstMessage.includes(event)) return false;
        switch (event) {
            case "client::id":
                events.getId(firstMessage, WF);
                this.messageQueue.shift();
                break;
            case "players::update":
                events.updatePlayers(firstMessage, WF);
                this.messageQueue.shift();
                break;
            case "client::disconnect":
                events.removePlayer(firstMessage, WF);
                this.messageQueue.shift();
                break;
            case "player::move":
                events.movePlayer(firstMessage, WF);
                this.messageQueue.shift();
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
