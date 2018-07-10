let COLLISION = {};

COLLISION.data = require('../data/collision');

COLLISION.world = {
    x1: 3750,
    y1: 4000,
    x2: 21000,
    y2: 22250,
};

COLLISION.store = [];

for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
        for (let col = 0; col < COLLISION.data[0].length; col++)
            for (let row = 0; row < COLLISION.data[1].length; row++) {

    let x = COLLISION.data[0][col] + i * 8250;
    let y = COLLISION.data[1][row] + j * 8750;

    COLLISION.store.push({
        x1: x,
        y1: y,
        x2: x + 1000,
        y2: y + 750
    });

}

module.exports = COLLISION;