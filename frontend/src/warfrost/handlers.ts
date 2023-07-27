function cursorHandler(WF: any) {
    WF.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
            const { x, y } = pointer.position;
            WF.socket.send(`mouse::right::click::x${x}y${y}`);
        }
    });
}

function playerClicked(pointer: Phaser.Input.Pointer, id: number, WF: any) {
    if (pointer.leftButtonDown()) {
        WF.selected = `player::select::#${id}`;
        console.log(WF.selected);
        WF.socket.send(WF.selected);
    }
}

export { cursorHandler, playerClicked };
