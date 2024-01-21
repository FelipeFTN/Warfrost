import * as Models from '../warfrost/models';
import * as Phaser from 'phaser';
import Warfrost from '../game';

class Unit extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    public id : number;
    public team : number;
    private speed : number = 100; // TODO: Acceleration too
    private health : number = 100;
    public unit : Phaser.GameObjects.Sprite;
    private WF : Warfrost;

    constructor(WF: Warfrost, unit: Models.UnitData) {
        super(WF, unit.x, unit.y, "unit");
        this.setTexture("unit");
        this.id = unit.id;
        this.scene = WF;

        // Unit - GameObjects - Stuff
        this.setInteractive();
        this.setDepth(1);
        this.setData('id', unit.id);
        this.setData('selected', false);
        this.setData('team', unit.team);

        // I hate to admit but this fuckin' logic
        // Just doesn't make sense, not even work
        // I need to rework this as soon as possible
        // Clicking over the unit should select it!!
        // Checks for any unit interation
        console.log("Setting interactive")
        this.setInteractive().on("pointerover", (pointer: Phaser.Input.Pointer) => {
            if (pointer.leftButtonReleased()) {
                console.log("SELECTED!!!")
                this.setData('selected', true);
                WF.selection.handleSelection(this);
            }
        });
        console.log("Setted interactive")

        // GLOBAL STUFF
        this.scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);
    }

    // Getters & Setters
    getId() : number { return this.id; }

    getPosition() : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.x, this.y);
    }

    // If it's true, then the unit moved
    // if not... well, you know.
    comparePositionMove(x: number, y: number) : boolean {
        if (this.getPosition().x != x || this.getPosition().y != y) return true;
        return false;
    }

    // This should make the unit move properly
    move() {
        const destination : Phaser.Math.Vector2 = this.getData("destination");
        if (destination == null) { return; }
        if (this.speed > 0) {
            // This should make the unit stop properly
            if (Phaser.Math.Distance.BetweenPoints(this, destination) <= 2) { 
                this.body.reset(destination.x, destination.y);
                return;
            }
        }

        this.scene.physics.moveToObject(this, destination, this.speed);
    }
}
export default Unit;
