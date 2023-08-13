import * as Phaser from 'phaser';

export class Selection {
    private graphics: Phaser.GameObjects.Graphics;
    private scene: Phaser.Scene;
    private isSelecting: boolean;
    private startPos: Phaser.Math.Vector2;
    private selectionRect: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene) {
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

    handleSelection(WF: any, player: Phaser.GameObjects.Sprite): void {
        if (!this.isSelecting) { return; }
        const playerId = player.getData('id');
        if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), this.selectionRect)) {
            // The player sprite is colliding with the selection zone
            // Do something with the player sprite here (e.g., add it to the selected units)
            // For example: player.setTint(0xff0000); // Tint the player sprite red
            player.setTint(0x00ff00);
            WF.selected = `player::select::#${playerId}`;
            WF.socket.send(WF.selected);
        } else {
            // The player sprite is not colliding with the selection zone
            // Do something else here (e.g., remove it from the selected units if it was previously selected)
            // For example: player.clearTint(); // Remove any tint applied previously
            player.clearTint();
            WF.selected = `player::unselect::#${playerId}`;
            WF.socket.send(WF.selected);
        }
    }

    endSelection(): void {
        this.isSelecting = false;
        this.graphics.clear();
    }
}
export default Selection;
