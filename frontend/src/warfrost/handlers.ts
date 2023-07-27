function cursorHandler(WF: any) {
    WF.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
            const { x, y } = pointer.position;
            WF.socket.send(`mouse:right:click:x${x}y${y}`);
        }
    });
}

function playersHandler(WF: any) {
    WF.socket.on("players::update", WF);
}

export { cursorHandler, playersHandler };
