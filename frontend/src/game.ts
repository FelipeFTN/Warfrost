import * as Phaser from 'phaser';

import Socket from './network/websocket'

class Warfrost extends Phaser.Scene {
  private player: Phaser.GameObjects.Sprite;
  private socket: Socket;

  constructor() {
    super("Warfrost");
    this.player = null;
    this.socket = new Socket(process.env.HOST, process.env.PORT);
  }

  preload() {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
    this.socket.connect();

    this.load.image("map", "assets/map.png");
    this.load.image("player", "assets/player.png");
  }

  create() {
    this.player = this.add.sprite(100, 100, "player");
    this.add.image(0, 0, "map").setOrigin(0);
    this.player.setDepth(1);

    console.log(this.player);

    this.CursorHandler();
  }

  update() {
    this.player.setPosition(this.player.x, this.player.y);
    this.socket.on("move", this.player);
  }

  private CursorHandler() {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        const { x, y } = pointer.position;
        this.socket.send(`mouse:right:click:x${x}y${y}`);
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
