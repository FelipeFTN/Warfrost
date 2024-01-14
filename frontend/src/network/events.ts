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

export { getId, updatePlayers, removePlayer };
