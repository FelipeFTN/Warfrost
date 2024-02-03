import * as Phaser from 'phaser';

import Warfrost from '../game';

export class Selection {
    private graphics: Phaser.GameObjects.Graphics;
    private scene: Warfrost;
    public isSelecting: boolean;
    private startPos: Phaser.Math.Vector2;
    private selectionRect: Phaser.Geom.Rectangle;

    constructor(scene: Warfrost) {
        this.scene = scene;
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(2);
        this.isSelecting = false;
        this.startPos = new Phaser.Math.Vector2();
        this.selectionRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
    }

    startSelection(x: number, y: number): void {
        this.isSelecting = true;
        this.startPos.set(x, y);
    }

    updateSelection(x: number, y: number): void {
        if (this.isSelecting) {
            const width = Math.abs(x - this.startPos.x); // Calculate absolute width
            const height = Math.abs(y - this.startPos.y); // Calculate absolute height
            const rectX = Math.min(x, this.startPos.x); // Determine the top-left X coordinate of the rectangle
            const rectY = Math.min(y, this.startPos.y); // Determine the top-left Y coordinate of the rectangle

            this.selectionRect.setPosition(rectX, rectY);
            this.selectionRect.setSize(width, height);

            this.graphics.clear();
            this.graphics.fillStyle(0x00ff00, 0.4); // Transparent green color
            this.graphics.fillRect(rectX, rectY, width, height);
        }
    }

    handleSelection(unit: Phaser.GameObjects.Sprite): void {
        // Check for spriting collision with selection zone
        if (this.isSelecting) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(unit.getBounds(), this.selectionRect)) {
                if (this.scene.clientId != unit.getData('team')) return;
                unit.setTint(0x00ff00);
                unit.setData('selected', true);
            } else {
                unit.clearTint();
                unit.setData('selected', false);
            }
        }
    }

    endSelection(): void {
        this.selectionRect.setPosition(0, 0);
        this.selectionRect.setSize(0, 0);
        this.isSelecting = false;
        this.graphics.clear();
    }
}
export default Selection;
