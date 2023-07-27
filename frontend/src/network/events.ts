import * as utils from "../warfrost/utils";

function id(message: string, WF: any) {
    if (!message.includes("client::id")) { return; }
    let id: number;
    if (id = utils.getId(message)) {
        WF.clientId = id;
    }
}

function move(message: string, WF: any) {
    if (!message.includes("move")) { return; }
    let move: any;
    if (move = utils.getCoordinates(message)) {
        // WF.x = move.x;
        // WF.y = move.y;
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

export { id, move, updatePlayers, removePlayer };
