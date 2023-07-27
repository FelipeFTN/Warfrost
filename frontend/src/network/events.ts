import * as utils from "../warfrost/utils";

function getId(message: string, WF: any) {
    if (!message.includes("client::id")) { return; }
    let id: number;
    if (id = utils.getId(message)) {
        WF.clientId = id;
    }
}

function movePlayer(message: string, WF: any) {
    if (!message.includes("player::move")) { return; }
    let move: any;
    if (move = utils.getCoordinates(message)) {
        WF.players[move.id].setPosition(move.x, move.y);
        // WF.players[move.id].x = move.x;
        // WF.players[move.id].y = move.y;
    }
}

function updatePlayers(message: string, WF: any) {
    if (!message.includes("players::update")) { return; }
    let players: any;
    if (players = utils.getPlayers(message)) {
        WF.playersData = players;
    }
}

function removePlayer(message: string, WF: any) {
    if (!message.includes("client::disconnected")) { return; }
    let id: any;
    if (id = utils.getId(message)) {
        WF.playersData.map((player: any) => {
            if (player.id !== id) { return; }
            WF.playersData.splice(player, 1);
            WF.socket.message = "player disconnected";
        });
    }
}

export { getId, movePlayer, updatePlayers, removePlayer };
