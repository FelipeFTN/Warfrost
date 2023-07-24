function cursorHandler(WF: any) {
  WF.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.rightButtonDown()) {
      const { x, y } = pointer.position;
      WF.socket.send(`mouse:right:click:x${x}y${y}`);
    }
  });
  WF.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.leftButtonDown()) {
      const { x, y } = pointer.position;
      WF.socket.send(`mouse:left:click:x${x}y${y}`);
    }
  });
}

export { cursorHandler };
