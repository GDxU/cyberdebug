let COLLISION = {};

let CONFIG = require('./config');

COLLISION.building = require('../data/building');

COLLISION.boundary = {
    a: {
        x: 3750,
        y: 4000
    },
    b: {
        x: CONFIG.world.width - 3750,
        y: CONFIG.world.height - 4000
    }
};

COLLISION.isPointInRectangle = (point, rectangle) => rectangle.a.x <= point.x && point.x < rectangle.b.x && rectangle.a.y <= point.y && point.y < rectangle.b.y;

COLLISION.isCollision = a => {

    let collision = !COLLISION.isPointInRectangle(a, COLLISION.boundary);

    if (!collision) for (let i = 0; i < COLLISION.quarter.length; i++) if (COLLISION.isPointInRectangle(a, COLLISION.quarter[i])) {
        collision = true;
        break;
    }

    return collision;

};

COLLISION.quarter = [];

for (let worldX = 0; worldX < CONFIG.world.x; worldX++) {

    for (let worldY = 0; worldY < CONFIG.world.y; worldY++) {

        for (let buildingX = 0; buildingX < COLLISION.building[0].length; buildingX++) {

            for (let buildingY = 0; buildingY < COLLISION.building[1].length; buildingY++) {

                let x = CONFIG.district.width * worldX + CONFIG.tile.width * COLLISION.building[0][buildingX];
                let y = CONFIG.district.height * worldY + CONFIG.tile.height * COLLISION.building[1][buildingY];

                if (COLLISION.isPointInRectangle({x: x, y: y}, COLLISION.boundary)) COLLISION.quarter.push({

                    a: {
                        x: x,
                        y: y
                    },

                    b: {
                        x: x + CONFIG.quarter.width,
                        y: y + CONFIG.quarter.height
                    }

                });

            }

        }

    }

}

module.exports = COLLISION;