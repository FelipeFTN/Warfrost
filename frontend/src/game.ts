import * as Phaser from 'phaser';

import * as WF from './warfrost/handlers';
import Socket from './network/websocket'

class Warfrost extends Phaser.Scene {
    private clientId: number;

    private playersData: any;

    private players: any;

    private socket: Socket;

    constructor() {
        super("Warfrost");
        this.players = {};
        this.socket = new Socket(process.env.HOST, process.env.PORT);
    }

    preload() {
        // Disable right click
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        // Set up socket
        this.socket.connect();

        this.load.image("map", "assets/map.png");
        this.load.image("player", "assets/player.png");
    }

    create() {
        // Display Map
        this.add.image(0, -300, "map").setOrigin(0);

        // Player socket event listener
        WF.playersHandler(this);

        // Cursor Listener
        WF.cursorHandler(this);
    }

    // Obs:
    // this.players = {id: { Phaser Sprite Object}, id: {...}}
    // this.playerData = [{id: 0, x: 10, y: 10}, {...}]

    update() {
        // Set clientID
        this.socket.on("client::id", this);

        // Disconnect Listener 
        this.socket.on("client::disconnect", this);

        // Player socket event listener
        WF.playersHandler(this);

        this.playersData.forEach((player: any) => {
            if (player.id === this.clientId) { return; }
            if (this.players[player.id]) { return; }

            this.players[player.id] = this.add.sprite(player.x, player.y, "player");
            this.players[player.id].setDepth(1);
        });

        let playersIds = this.playersData.map((item: any) => item.id);

        for (const id in this.players) {
            if (!playersIds.includes(Number(id))) {
                this.players[id].destroy();
                delete this.players[id];
            }
        }

        // TODO: player movement
        // this.player.setPosition(this.player.x, this.player.y);
        // this.socket.on("move", this.player);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Warfrost,
    pixelArt: true,
};

const game = new Phaser.Game(config);
