import * as Models from '../warfrost/models';
import * as Phaser from 'phaser';
import Warfrost from '../game';

class Player extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    private id : number;
    private speed : number = 100; // TODO: Acceleration too
    private health : number = 100;
    private position : Phaser.Math.Vector2;
    public player : Phaser.GameObjects.Sprite;
    private WF : Warfrost;

    constructor(WF: Warfrost, player: Models.PlayerData) {
        super(WF, player.x, player.y, "player");
        this.setTexture("player");
        this.id = player.id;
        this.scene = WF;

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

    // If it's true, then the player moved
    // if not... well, you know.
    comparePositionMove(x: number, y: number) : boolean {
        if (this.getPosition().x != x || this.getPosition().y != y) return true;
        return false;
    }

    // This should make the player move properly
    move(WF: Warfrost) {
        const destination : Phaser.Math.Vector2 = this.getData("destination");
        if (destination == null) { return; }
        if (this.speed > 0) {
            if (Phaser.Math.Distance.BetweenPoints(this, destination) <= 2) { 
                this.body.reset(destination.x, destination.y);
                return;
            }
        }

        WF.physics.moveToObject(this, destination, this.speed);

        // const movement = this.getPosition().subtract(destination);
        // const movement = destination.subtract(this.getPosition());

        // console.log(movement);
    }
}
export default Player;
