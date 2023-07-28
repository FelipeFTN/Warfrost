import * as Phaser from 'phaser';

export class Selection {
    private graphics: Phaser.GameObjects.Graphics;
    private scene: Phaser.Scene;
    private isSelecting: boolean;
    private startPos: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(2);
        this.isSelecting = false;
        this.startPos = new Phaser.Math.Vector2();
    }

    startSelection(x: number, y: number): void {
        this.isSelecting = true;
        this.startPos.set(x, y);
    }

    updateSelection(x: number, y: number): void {
        if (this.isSelecting) {
            const width = x - this.startPos.x;
            const height = y - this.startPos.y;

            this.graphics.clear();
            this.graphics.fillStyle(0x00ff00, 0.4); // Transparent green color
            this.graphics.fillRect(this.startPos.x, this.startPos.y, width, height);
        }
    }

    endSelection(): void {
        this.isSelecting = false;
        this.graphics.clear();
    }
}
export default Selection;
