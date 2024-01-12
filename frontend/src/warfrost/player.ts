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
        this.position.set(this.player.x, this.player.y);
        this.id = player.id;
        this.health = 100;
    }

    // Getters & Setters
    getId() : number { return this.id; }

    setPosition(position: Phaser.Math.Vector2) {
        this.player.x = position.x;
        this.player.y = position.y;
        this.position = position;
    }

    getPosition() : Phaser.Math.Vector2 { return this.position.set(this.player.x, this.player.y); }

    // If it's true, then the player moved
    // if not... well, you know.
    comparePositionMove(x: number, y: number) : boolean {
        if (this.getPosition().x != x || this.getPosition().y != y) return true;
        return false;
    }

    // This should make the player move properly
    move(destination: Phaser.Math.Vector2) {
        // const difference : Phaser.Math.Vector2 = (this.position - destination).normalize()
        // const movement = this.position.subtract(destination).normalize();
        if (this.getPosition().equals(destination)) { return; }

        const movement = this.getPosition().subtract(destination);

        this.setPosition(movement);
    }
}
export default Player;
