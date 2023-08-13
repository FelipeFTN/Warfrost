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

function getPlayers(message: string) {
    const regex = /players::update::(\[.*\])/;
    const matches = message.match(regex);

    if (matches && matches.length === 2) {
        const players = matches[1];
        return JSON.parse(players);
    }
    return null;
}

function formatObjectsArray(array: any, objectKeys: any) {
  const objects = array.map((item: any) => {
    const properties = objectKeys.map((key: any) => `\"${key}\": ${item[key]}`).join(', ');
    return `{${properties}}`;
  });

  return `[${objects.join(', ')}]`;
}

export { formatObjectsArray, getId, getCoordinates, getPlayers };
