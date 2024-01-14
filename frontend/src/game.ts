import * as Phaser from 'phaser';

import Selection from './warfrost/selection';
import * as Models from './warfrost/models';
import Pathfind from './warfrost/pathfind';
import Socket from './network/websocket';
import Player from './warfrost/player';

class Warfrost extends Phaser.Scene {

    public pathfind: Pathfind;

    public playersData: Array<Models.PlayerData>;

    public clientId: number;

    public selection: Selection;

    public selected: string;

    public players: object;

    public socket: Socket;

    constructor() {
        super("Warfrost");
        
        // Shitty variable, but this just exists
        // for we to track how many players
        // we have active in the session.
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
        this.socket.on("players::update", this);

        // Pathfind
        // this.pathfind = new Pathfind(this);

        // Set up selection
        this.selection = new Selection(this);
    }

    // -----------------------------------------------------
    // PLAYERS DATA TYPES:
    // players    = {id: { Phaser Sprite Object}, id: {...}}
    // playerData = [{id: 0, x: 10, y: 10}, {...}]
    // -----------------------------------------------------

    update() {
        // Mouse events listener
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointermove', this.onPointerMove, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Pathfind
        // this.pathfind.draw();

        // Set clientID
        this.socket.on("client::id", this);

        // Disconnect Listener 
        this.socket.on("client::disconnect", this);

        // Player socket event listener
        this.socket.on("players::update", this);

        this.playersData.forEach((player: Models.PlayerData) => {
            // If player already exists, update its position
            if (this.players[player.id]) {
                // console.log(`player: ${this.players[player.id].player}`)
                const p = this.players[player.id];
                this.selection.handleSelection(p);
                p.move(this);
                return;
            }

            // ... If not, then, create it
            const p : Player = new Player(this, player);

            p.setInteractive();
            p.setDepth(1);
            p.setData('id', player.id);
            p.setData('selected', false);

            // Set player into players object
            this.players[p.getId()] = p;

            // Checks for any player interation
            p.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                if (pointer.leftButtonDown()) {
                    p.setData('selected', true);
                }
            });

            this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
                if (pointer.rightButtonReleased()) {
                    if (!p.getData('selected')) return;

                    const mouse_vector = pointer.position;
                    p.setData("destination", new Phaser.Math.Vector2(mouse_vector));

                    // Needs formatation to send players::update::[{id: 0, x: 10, y: 10...}, {...}]
                    // this.socket.send(`players::move::[{"id": ${player.id}, "x": ${x}, "y": ${y}}]`);
                }
            });
            p.move(this);
        });

        const playersIds = this.playersData.map((item: Models.PlayerData) => item.id);

        // Check every players saved into front-end
        for (const id in this.players) {
            // Checks if some player disconnected and destroy it
            if (!playersIds.includes(Number(id))) {
                this.players[id].destroy();
                delete this.players[id];
            }
        }
        // Server movement listener
        this.socket.on("player::move", this);
    }

    onPointerDown(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonDown()) {
            this.selection.startSelection(pointer.x, pointer.y);
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonReleased()) {
            this.selection.endSelection();
        }
    }

    onPointerMove(pointer: Phaser.Input.Pointer): void {
        this.selection.updateSelection(pointer.x, pointer.y);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Warfrost,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
};

const game = new Phaser.Game(config);

export default Warfrost;
