let CONFIG = require('../data/config');

CONFIG.quarter.width = CONFIG.tile.width * CONFIG.quarter.x;
CONFIG.quarter.height = CONFIG.tile.height * CONFIG.quarter.y;

CONFIG.district.width = CONFIG.tile.width * CONFIG.district.x;
CONFIG.district.height = CONFIG.tile.height * CONFIG.district.y;

CONFIG.world.width = CONFIG.district.width * CONFIG.world.x;
CONFIG.world.height = CONFIG.district.height * CONFIG.world.y;

module.exports = CONFIG;