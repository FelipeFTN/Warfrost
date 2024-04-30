import * as Phaser from 'phaser';

import Selection from './warfrost/selection';
import * as Models from './warfrost/models';
import Pathfind from './warfrost/pathfind';
import Socket from './network/websocket';
import Unit from './warfrost/unit';

class Warfrost extends Phaser.Scene {

    public pathfind: Pathfind;

    public unitsData: Array<Models.UnitData>;

    public clientId: number;

    public selection: Selection;

    public selected: string;

    public units: object;

    public socket: Socket;
        
    public screen = this.scale.gameSize;

    public camera = this.cameras.main;

    public speed = 0.01;

    constructor() {
        super("Warfrost");
        
        // Shitty variable, but this just exists
        // for we to track how many units
        // we have active in the session.
        this.units = {};
        this.socket = new Socket(process.env.HOST, process.env.PORT);
    }

    preload() {
        // Keep sound running when tab focus change
        this.sound.pauseOnBlur = false;

        // Disable right click
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        // Set up socket
        this.socket.connect(this);

        // Listen for clientID
        this.socket.on("client::id", this);

        // Load images
        this.load.image("map", "assets/maps/map_0.png");
        this.load.image("unit", "assets/unit.png");
    }

    create() {
        // Display Map
        this.add.image(0, -300, "map").setOrigin(0);

        // Client start
        this.socket.send("client::start");

        // Unit socket event listener
        this.socket.on("units::update", this);

        // Pathfind
        // this.pathfind = new Pathfind(this);

        // Set up selection
        this.selection = new Selection(this);
    }

    // -----------------------------------------------------
    // units DATA TYPES:
    // units    = {id: { Phaser Sprite Object}, id: {...}}
    // unitData = [{id: 0, x: 10, y: 10}, {...}]
    // -----------------------------------------------------

    update(time: number, delta: number) {
        // Mouse events listener
        this.input.on('pointerdown', this.onPointerDown, this);
        this.input.on('pointermove', this.onPointerMove, this);
        this.input.on('pointerup', this.onPointerUp, this);

        // Pathfind
        // this.pathfind.draw();

        // Listen for clientID
        this.socket.on("client::id", this);

        // Disconnect Listener 
        this.socket.on("client::disconnect", this);

        // Unit socket event listener
        this.socket.on("units::update", this);

        // Camera Position
        this.cameraMovement(this.input.activePointer);

        // Create or Update New Units!
        this?.unitsData?.forEach((unit: Models.UnitData) => {
            // If unit already exists, update its position
            if (this.units[unit.id]) {
                const p: Unit = this.units[unit.id];
                this.selection.handleSelection(p);

                // Move unit 
                p.setData("destination", new Phaser.Math.Vector2(unit.x, unit.y));
                p.move();

                // Update unit in units list
                this.units[p.id] = p;
                return;
            }

            // ... If not, then, create it
            const p : Unit = new Unit(this, unit);

            // Set unit into units object
            this.units[p.getId()] = p;

            // This doesn't need to run many times
            this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
                if (pointer.rightButtonReleased()) {
                    if (!p.getData('selected')) return;

                    const mouse_vector = pointer.position;
                    p.setData("destination", new Phaser.Math.Vector2(mouse_vector));

                    // Needs formatation to send units::update::[{id: 0, x: 10, y: 10...}, {...}]
                    this.socket.send(`units::move::[{"id": ${p.id}, "x": ${Math.floor(mouse_vector.x)}, "y": ${Math.floor(mouse_vector.y)}}]`);
                }
            });
        });

        if (this.unitsData === undefined) { console.warn("Warning: Units Data is Undefined."); }
        const unitsIds = this.unitsData?.map((item: Models.UnitData) => item.id);

        // Check every units saved into front-end
        for (const id in this.units) {
            // Checks if some unit disconnected and destroy it
            if (!unitsIds.includes(Number(id))) {
                this.units[id].destroy();
                delete this.units[id];
            }
        }
    }

    // Work in progress - camera movement
    cameraMovement(pointer: Phaser.Input.Pointer): void {
        console.log(`variables: \n pointer.x: ${pointer.x} \n pointer.y: ${pointer.y} \n screen.width: ${screen.width} \n screen.height: ${screen.height} \n speed: ${this.speed} \n camera.zoom: ${this.camera.zoom} \n camera.scrollX: ${this.camera.scrollX} \n camera.scrollY: ${this.camera.scrollY} \n`);
        // Move camera x
        if (pointer.x <= 10) {
            this.camera.scrollX = -this.speed / this.camera.zoom;
        } else if (pointer.x >= screen.width - 10) {
            this.camera.scrollX = this.speed / this.camera.zoom;
        }

        // Move camera y
        if (pointer.y <= 10) {
            this.camera.scrollY = -this.speed / this.camera.zoom;
        } else if (pointer.y >= screen.height - 10) {
            this.camera.scrollY = this.speed / this.camera.zoom;
        }
    }

    onPointerDown(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonDown()) {
            this.selection.startSelection(pointer.x, pointer.y);
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer): void {
        if (pointer.leftButtonReleased()) {
            if (this.selection.isSelecting) { this.selection.endSelection(); }
        }

        // Set fullscreen
        // if (!this.scale.isFullscreen) { this.scale.startFullscreen(); }
    }

    onPointerMove(pointer: Phaser.Input.Pointer): void {
        // Update selection
        this.selection.updateSelection(pointer.x, pointer.y);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    // width: window.innerWidth,
    // height: window.innerHeight,
    scene: Warfrost,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    scale: {
        mode: Phaser.Scale.NONE,
        parent: 'warfrost',
        autoCenter: Phaser.Scale.NO_CENTER,
        // width: window.innerWidth,
        // height: window.innerHeight 
    },
};

const game = new Phaser.Game(config);

export default Warfrost;
