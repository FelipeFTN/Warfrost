import * as Phaser from 'phaser';

import Warfrost from '../game';

export class Hud {
    private scene: Warfrost;
    private panel: Phaser.GameObjects.Image;
    private countText: Phaser.GameObjects.Text;

    constructor(scene: Warfrost) {
        this.scene = scene;
        const height = scene.scale.gameSize.height;

        // Fixed HUD panel anchored to the bottom-left of the viewport
        this.panel = scene.add.image(0, height, "hud")
            .setOrigin(0, 1)
            .setScrollFactor(0)
            .setDepth(10);

        this.countText = scene.add.text(16, height - 24, "Units selected: 0", {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
        })
            .setScrollFactor(0)
            .setDepth(11);
    }

    // Refresh the HUD with the current number of selected units
    update(selectedCount: number): void {
        this.countText.setText(`Units selected: ${selectedCount}`);
    }
}
export default Hud;
