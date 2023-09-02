import * as Phaser from 'phaser';

import Selection from './warfrost/selection';
import * as Models from './warfrost/models';
import Pathfind from './warfrost/pathfind';
import * as WF from './warfrost/handlers';
import Socket from './network/websocket';

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

        // Cursor Listener
        WF.cursorHandler(this);

        // Pathfind
        this.pathfind = new Pathfind(this);

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
        this.pathfind.draw();

        // Set clientID
        this.socket.on("client::id", this);

        // Disconnect Listener 
        this.socket.on("client::disconnect", this);

        // Player socket event listener
        this.socket.on("players::update", this);

        // Pathfind

        this.playersData.forEach((player: Models.PlayerData) => {
            // If player does exists, update its position
            if (this.players[player.id]) {
                // Update position & Check for selection
                this.players[player.id].setPosition(player.x, player.y);
                this.selection.handleSelection(this, this.players[player.id]);
                return;
            }

            // ... If not, then, create it
            this.players[player.id] = this.add.sprite(player.x, player.y, "player");
            this.players[player.id].setInteractive();
            this.players[player.id].setDepth(1);
            this.players[player.id].setData('id', player.id);
            this.players[player.id].setData('selected', false);

            // Checks for any player interation
            this.players[player.id].on("pointerdown", (pointer: Phaser.Input.Pointer) => (
                WF.playerClicked(pointer, player.id, this)
            ));
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
        if (pointer.rightButtonDown()) return;
        this.selection.startSelection(pointer.x, pointer.y);
    }

    onPointerUp(_pointer: Phaser.Input.Pointer): void {
        this.selection.endSelection();
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
};

const game = new Phaser.Game(config);

export default Warfrost;
