let TRAFFIC = {};

TRAFFIC.i = 0;
TRAFFIC.map = require('../data/traffic');

TRAFFIC.x = TRAFFIC.map[0].length;
TRAFFIC.y = TRAFFIC.map.length;

TRAFFIC.timeout = {
    YELLOW: 3000,
    VERTICAL: 5000,
    HORIZONTAL: 5000,
    PEDESTRIAN: 7000
};

TRAFFIC.schedule = [
    'YELLOW',
    'VERTICAL',
    'YELLOW',
    'HORIZONTAL'
];

TRAFFIC.isCross = a => {

    let x = Math.floor(a.x / 250);
    let y = Math.floor(a.y / 250);

    return (
        0 <= x && x < TRAFFIC.x &&
        0 <= y && y < TRAFFIC.y &&
        TRAFFIC.map[y][x] === '#'
    );

};

TRAFFIC.status = () => {

    return TRAFFIC.schedule[TRAFFIC.i % TRAFFIC.schedule.length];

};

TRAFFIC.next = () => {

    TRAFFIC.i++;

    setTimeout(() => {

        TRAFFIC.next();

    }, TRAFFIC.timeout[TRAFFIC.status()]);

};

module.exports = TRAFFIC;