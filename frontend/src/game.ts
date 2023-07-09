import * as Phaser from 'phaser';

import Network from './network/main'

class Warfrost extends Phaser.Scene {
  private player: Phaser.GameObjects.Sprite;

  constructor() {
    super("Warfrost");
    this.player = null;
  }

  preload() {
    this.load.image("map", "assets/map.png");
    this.load.image("player", "assets/player.png");
  }

  create() {
    this.add.image(0, 0, "map").setOrigin(0);
    this.player = this.add.sprite(100, 100, "player");
    this.player.setDepth(1);

    this.CursorHandler();
  }

  private CursorHandler() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        const { x, y } = pointer.position;

        // Send X and Y to Server - port 8080
        Network(`${x}:${y}`);
      }
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Warfrost,
  pixelArt: true,
};

const game = new Phaser.Game(config);
