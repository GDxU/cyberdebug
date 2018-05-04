let TOOL = require('./tool');

let TARGET = {};

TARGET.id = 0;
TARGET.model = 0;
TARGET.users = [];
TARGET.bots = [];

TARGET.getTargets = ws => {

    let camera = ws.camera || {w: 100, h: 100};

    let x = Math.round(camera.w / 2) + 100;
    let y = Math.round(camera.h / 2) + 100;

    let x1 = ws.user.x - x;
    let x2 = ws.user.x + x;
    let y1 = ws.user.y - y;
    let y2 = ws.user.y + y;

    return TARGET.bots.concat(TARGET.users).filter(t => x1 < t.x && t.x < x2 && y1 < t.y && t.y < y2);

};

TARGET.appendUser = () => {

    let user = {
        id: TARGET.id++,
        model: TARGET.model++,
        x: 10000 + TOOL.getRandomInt(-400, 400),
        y: 10000 + TOOL.getRandomInt(-400, 400)
    };

    TARGET.users.push(user);
    TARGET.updateBots();

    return user;

};

TARGET.removeUser = ws => {

    TARGET.users = TARGET.users.filter(user => user.id !== ws.user.id);
    TARGET.updateBots();

};

TARGET.initBots = () => {

    for (let i = 0; i < 100; i++) {

        TARGET.bots.push({
            id: TARGET.id++,
            model: 0,
            x: 10000 + TOOL.getRandomInt(-400, 400),
            y: 10000 + TOOL.getRandomInt(-400, 400)
        });

    }

};
TARGET.initBots();

TARGET.updateBots = () => {

    let models = [];
    TARGET.users.forEach(user => models.push(user.model));
    TARGET.bots.forEach((bot, i) => bot.model = models[i % models.length] || 0);

};

module.exports = TARGET;