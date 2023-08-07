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

            // Check collision with player sprites
            const selectionRect = new Phaser.Geom.Rectangle(this.startPos.x, this.startPos.y, width, height);
            const playerSprites = this.scene.children.list.filter((child: any) => child instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite[];

            playerSprites.forEach((player) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), selectionRect)) {
                    // The player sprite is colliding with the selection zone
                    // Do something with the player sprite here (e.g., add it to the selected units)
                    // For example: player.setTint(0xff0000); // Tint the player sprite red
                } else {
                    // The player sprite is not colliding with the selection zone
                    // Do something else here (e.g., remove it from the selected units if it was previously selected)
                    // For example: player.clearTint(); // Remove any tint applied previously
                }
            });
        }
    }

    endSelection(): void {
        this.isSelecting = false;
        this.graphics.clear();
    }
}
export default Selection;
