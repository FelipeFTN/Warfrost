import * as Phaser from 'phaser';

import * as WF from './warfrost/handlers';
import Socket from './network/websocket'

class Warfrost extends Phaser.Scene {
    private players: any;
    private socket: Socket;

    constructor() {
        super("Warfrost");
        this.players = {};
        this.socket = new Socket(process.env.HOST, process.env.PORT);
    }

    preload() {
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
        this.socket.connect();

        this.load.image("map", "assets/map.png");
        this.load.image("player", "assets/player.png");
    }

    create() {
        // this.player = this.add.sprite(100, 100, "player");
        this.add.image(0, -300, "map").setOrigin(0);
        // this.player.setDepth(1);

        // console.log(this.player);

        WF.cursorHandler(this);
    }

    update() {
        WF.playersHandler(this);
        this.players.map((player: any) => {
            player = this.add.sprite(player.x, player.y, "player");
            player.setDepth(1);
        });
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
