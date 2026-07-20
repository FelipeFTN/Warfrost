import * as Models from '../warfrost/models';
import * as Phaser from 'phaser';
import Warfrost from '../game';

class Unit extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    public id : number;
    public team : number;
    private speed : number = 100; // TODO: Acceleration too
    private health : number = 100;
    private maxHealth : number = 100;
    private healthBar : Phaser.GameObjects.Graphics;
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

        // GLOBAL STUFF
        this.scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.scene.add.existing(this);

        // Health bar drawn just above the unit
        this.healthBar = this.scene.add.graphics();
        this.healthBar.setDepth(2);
        this.drawHealthBar();
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

    // Draw a small health bar above the unit, tracking its current position
    drawHealthBar() {
        const width = 14;
        const height = 3;
        const x = this.x - width / 2;
        const y = this.y - this.height / 2 - 5;
        const frac = Phaser.Math.Clamp(this.health / this.maxHealth, 0, 1);

        this.healthBar.clear();
        // Dark backing for contrast
        this.healthBar.fillStyle(0x000000, 0.6);
        this.healthBar.fillRect(x - 1, y - 1, width + 2, height + 2);
        // Fill, colored by remaining health
        const color = frac > 0.5 ? 0x00ff00 : frac > 0.25 ? 0xffff00 : 0xff0000;
        this.healthBar.fillStyle(color, 1);
        this.healthBar.fillRect(x, y, width * frac, height);
    }

    // Keep the health bar in sync and clean it up with the unit
    destroy(fromScene?: boolean) {
        this.healthBar?.destroy();
        super.destroy(fromScene);
    }

    // This should make the unit move properly
    move() {
        this.drawHealthBar();
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
