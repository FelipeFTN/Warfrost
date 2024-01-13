import * as Models from '../warfrost/models';
import * as Phaser from 'phaser';
import Warfrost from '../game';

class Player {
    private id : number;
    private speed : number; // TODO: Acceleration too
    private health : number;
    private position : Phaser.Math.Vector2;
    public player : Phaser.GameObjects.Sprite;
    private scene : Warfrost;

    constructor(scene: Warfrost, player: Models.PlayerData) {
        this.scene = scene;
        this.id = player.id;
        this.health = 100;
    }

    // Getters & Setters
    getId() : number { return this.id; }

    getPosition() : Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.player.x, this.player.y);
    }

    // If it's true, then the player moved
    // if not... well, you know.
    comparePositionMove(x: number, y: number) : boolean {
        if (this.getPosition().x != x || this.getPosition().y != y) return true;
        return false;
    }

    // This should make the player move properly
    move(WF: Warfrost) {
        const destination : Phaser.Math.Vector2 = this.player.getData("destination");
        if (destination == null) { return }
        if (this.getPosition().equals(destination)) { return; }

        WF.physics.moveToObject(this.player, destination, 200);

        // const movement = this.getPosition().subtract(destination);
        // const movement = destination.subtract(this.getPosition());

        // console.log(movement);
    }
}
export default Player;
