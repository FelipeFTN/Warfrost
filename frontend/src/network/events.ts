import * as utils from "../warfrost/utils";

function move(message: string, WF: any) {
    if (message.includes("move")) {
        let move: any;
        if (move = utils.getCoordinates(message)) {
            // obj.x = move.x;
            // obj.y = move.y;
        }
    }
}

function updatePlayers(message: string, WF: any) {
    if (message.includes("players::update")) {
        let players: any;
        if (players = utils.getPlayers(message)) {
            WF.players = players;
        }
    }
}
export { move, updatePlayers };
