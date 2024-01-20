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

function updateUnits(message: string, WF: Warfrost) {
    if (!message.includes("units::update")) { return; }
    let units: Array<Models.UnitData>;
    if ((units = utils.getUnits(message))) {
        WF.unitsData = units;
    }
}

function removeUnit(message: string, WF: Warfrost) {
    if (!message.includes("client::disconnected")) { return; }
    let id: number;
    if ((id = utils.getId(message))) {
        WF.unitsData.map((unit: Models.UnitData) => {
            if (unit.id !== id) return;
            WF.unitsData.splice(id, 1);
        });
    }
}

export { getId, updateUnits, removeUnit };
