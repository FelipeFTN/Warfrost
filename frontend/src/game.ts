import * as Phaser from 'phaser';

import Socket from './network/websocket'

class Warfrost extends Phaser.Scene {
  private player: Phaser.GameObjects.Sprite;
  private playerPosition: any;
  private socket: Socket;
  private move: any;

  constructor() {
    super("Warfrost");
    this.player = null;
    this.playerPosition = { x: 100, y: 100 };
    this.socket = new Socket(process.env.HOST, process.env.PORT);
  }

  preload() {
    this.socket.connect();

    this.load.image("map", "assets/map.png");
    this.load.image("player", "assets/player.png");
  }

  create() {
    this.add.image(0, 0, "map").setOrigin(0);
    this.player = this.add.sprite(this.playerPosition.x, this.playerPosition.y, "player");
    this.player.setDepth(1);

    this.CursorHandler();
    this.move = this.socket.getMove();
    if (this.move) {
      this.playerPosition.x = this.move.x;
      this.playerPosition.y = this.move.y;
    }
  }

  update() {
    this.player.setPosition(this.playerPosition.x, this.playerPosition.y);
  }

  private CursorHandler() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        const { x, y } = pointer.position;

        // Send X and Y to Server - port 8080
        this.socket.send(`x: ${x}, y: ${y}`);
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
