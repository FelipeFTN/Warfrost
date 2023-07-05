import * as Phaser from 'phaser';

class Warfrost extends Phaser.Scene {
  constructor() {
    super("Warfrost");
  }

  preload() {
    this.load.image("map", "assets/map.png");
    this.load.image("player", "assets/player.png");
  }

  create() {
    // Add the map
    const map = this.add.image(0, 0, "map").setOrigin(0);

    // Add the player sprite
    const player = this.add.sprite(100, 100, "player");
    player.setDepth(1); // Ensure the player sprite is rendered on top of the map

    // Enable cursor keys for player movement
    const cursors = this.input.keyboard.createCursorKeys();

    // Update player movement
    this.input.keyboard.on("keydown", (event: KeyboardEvent) => {
      const speed = 10;

      if (cursors.left?.isDown) {
        player.x -= speed;
      } else if (cursors.right?.isDown) {
        player.x += speed;
      }

      if (cursors.up?.isDown) {
        player.y -= speed;
      } else if (cursors.down?.isDown) {
        player.y += speed;
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
