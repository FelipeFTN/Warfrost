function cursorHandler() {
  this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.rightButtonDown()) {
      const { x, y } = pointer.position;
      this.socket.send(`mouse:right:click:x${x}y${y}`);
    }
  });
  this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.leftButtonDown()) {
      const { x, y } = pointer.position;
      this.socket.send(`mouse:left:click:x${x}y${y}`);
    }
  });
}

export { cursorHandler };
