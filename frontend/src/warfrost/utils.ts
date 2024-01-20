function getId(message: string) {
    const regex = /#(\d+)/;
    const matches = message.match(regex);

    if (matches && matches.length === 2) {
        const id = parseInt(matches[1]);
        return id;
    }
    return null;
}

function getCoordinates(coordinates: string) {
    const regex = /#(\d+)[\w:]+x(\d+)y(\d+)/;
    const matches = coordinates.match(regex);

    if (matches && matches.length === 4) {
        const id = parseInt(matches[1]);
        const x = parseInt(matches[2]);
        const y = parseInt(matches[3]);

        return { id, x, y };
    }
    return null;
}

function getUnits(message: string) {
    const regex = /units::update::(\[.*\])/;
    const matches = message.match(regex);

    if (matches && matches.length === 2) {
        const units = matches[1];
        return JSON.parse(units);
    }
    return null;
}

function formatObjectsArray(array: Array<object>, objectKeys: Array<string>) {
    const objects = array.map((item: object) => {
        const properties = objectKeys.map((key: string) => {
            if (typeof item[key] === 'string') { return `"${key}": "${item[key]}"`; }
            else if (typeof item[key] === 'object' && item[key].length == 0) { return `"${key}": []`; } // This shitty logic will break with real objects e.g: {} (not arrays)
            else { return `"${key}": ${item[key]}`; }
        }).join(', ');
        return `{${properties}}`;
    });

    return `[${objects.join(', ')}]`;
}

/// Get random spawn point coordinates
function getSpawnPoint() {
    const min = 20;
    const max = 300;
    const random_x = Math.floor(Math.random() * (max - min + 1) + min);
    const random_y = Math.floor(Math.random() * (max - min + 1) + min);
    return { x: random_x, y: random_y };
}

export { formatObjectsArray, getId, getCoordinates, getUnits, getSpawnPoint };
