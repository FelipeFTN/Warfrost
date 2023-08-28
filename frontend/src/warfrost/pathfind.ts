import * as Phaser from 'phaser';

class Pathfind {
    private graphics: Phaser.GameObjects.Graphics;
    private gridSize: number;
    private rows: number;
    private cols: number;
    private scene: Phaser.Scene;
    private grid: Phaser.Geom.Rectangle[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.graphics = this.scene.add.graphics();
        this.gridSize = 32;
        this.rows = 20;
        this.cols = 25;
        this.grid = [];

        // Create the grid rectangles
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const x = i * this.gridSize;
                const y = j * this.gridSize;
                const rect = new Phaser.Geom.Rectangle(x, y, this.gridSize, this.gridSize);
                this.grid.push(rect);
            }
        }

        // Set up input handlers
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.input.on('pointerdown', this.onPointerDown, this);
    }

    private onPointerMove(pointer: Phaser.Input.Pointer) {
        const { x, y } = pointer;
        const cell = this.grid.find((rect) => Phaser.Geom.Rectangle.Contains(rect, x, y));

        if (cell) {
            // Clear previous highlights
            this.graphics.clear();
            
            // Highlight the cell in green
            this.graphics.lineStyle(1, 0x00ff00); // Green color
            this.graphics.strokeRectShape(cell);
        }
    }

    private onPointerDown(pointer: Phaser.Input.Pointer) {
        const { x, y } = pointer;
        const cell = this.grid.find((rect) => Phaser.Geom.Rectangle.Contains(rect, x, y));

        if (cell) {
            // You can perform actions when a cell is clicked.
            // For example, you can emit an event or update a data structure.
            console.log('Clicked on cell:', cell);
        }
    }

    draw() {
        // Draw the initial grid
        this.graphics.lineStyle(1, 0xffffff); // Line color and thickness
        for (const rect of this.grid) {
            this.graphics.strokeRectShape(rect);
        }
    }
}

export default Pathfind;
