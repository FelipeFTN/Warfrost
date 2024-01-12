import * as Models from '../warfrost/models';
import * as utils from '../warfrost/utils';
import Warfrost from '../game';

function getId(message: string, WF: Warfrost) {
    if (!message.includes("client::id")) { return; }
    let id: number;
    if ((id = utils.getId(message))) {
        WF.clientId = id;
    }
}

// DEPRECATED: I will be using the updatePlayers function
// with some stupid logic to make the players moves correctly.
function movePlayer(message: string, WF: Warfrost) {
    if (!message.includes("player::move")) { return; }
    let player: {id: number, x: number, y: number};
    if ((player = utils.getCoordinates(message))) {
        WF.players[player.id].setPosition(player.x, player.y);
    }
}

function updatePlayers(message: string, WF: Warfrost) {
    if (!message.includes("players::update")) { return; }
    let players: Array<Models.PlayerData>;
    if ((players = utils.getPlayers(message))) {
        WF.playersData = players;
    }
}

function removePlayer(message: string, WF: Warfrost) {
    if (!message.includes("client::disconnected")) { return; }
    let id: number;
    if ((id = utils.getId(message))) {
        WF.playersData.map((player: Models.PlayerData) => {
            if (player.id !== id) return;
            WF.playersData.splice(id, 1);
        });
    }
}

export { getId, movePlayer, updatePlayers, removePlayer };
