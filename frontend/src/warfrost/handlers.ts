import * as Phaser from 'phaser';

import * as Utils from "./utils";

function cursorHandler(WF: any) {
    WF.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.rightButtonDown()) {
            const { x, y } = pointer.position;
            WF.playersData.forEach((player: any) => {
                if (!player.selected) { return; }
                player.x = x;
                player.y = y;
            })
            // Needs formatation to send players::update::[{id: 0, x: 10, y: 10...}, {...}]
            WF.socket.send(`players::update::${Utils.formatObjectsArray(WF.playersData, ['id', 'x', 'y', 'selected'])}`);
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
