let TOOL = require('./tool');

let TARGET = {};

TARGET.id = 0;
TARGET.model = 0;
TARGET.users = [];
TARGET.bots = [];

TARGET.generateId = () => {

    return TARGET.id++;

};

TARGET.get = id => TARGET.bots.concat(TARGET.users).filter(target => target.id === id)[0];

TARGET.exportUser = ws => {

    let contract = undefined;

    if (ws.user.contract) {

        let hud = 0;
        let distance = [200, 400, 600, 800];

        for (; hud < distance.length; hud++) if (TOOL.getDistance(ws.user, ws.user.contract) < distance[hud]) break;

        contract = {
            name: ws.user.contract.name,
            model: ws.user.contract.model,
            hunter: ws.user.contract.hunter,
            hud: hud,
            azimuth: TOOL.getAzimuth(ws.user, ws.user.contract)
        };

    }

    return {
        id: ws.user.id,
        contract: contract,
        hunter: ws.user.hunter
    };

};

TARGET.syncUser = (ws, data) => {

    if (data.user) {

        ws.user.name = data.user.name;

    }

};

TARGET.appendUser = ws => {

    ws.user = {
        id: TARGET.generateId(),
        name: '',
        model: TARGET.model++,
        x: 10000 + TOOL.getRandomInt(-400, 400),
        y: 10000 + TOOL.getRandomInt(-400, 400),
        kill: 0,
        stun: 0,
        die: 0,
        score: 0,
        contract: undefined,
        hunter: 0
    };

    TARGET.users.push(ws.user);
    TARGET.updateBots();

};

TARGET.removeUser = ws => {

    TARGET.users = TARGET.users.filter(user => user.id !== ws.user.id);
    TARGET.updateBots();

};

TARGET.exportTargets = ws => {

    let camera = ws.camera || {w: 100, h: 100};

    if (camera.x > 2000) camera.x = 2000;
    if (camera.y > 2000) camera.y = 2000;

    let x = Math.floor(camera.w / 2) + 100;
    let y = Math.floor(camera.h / 2) + 100;

    let x1 = ws.user.x - x;
    let x2 = ws.user.x + x;
    let y1 = ws.user.y - y;
    let y2 = ws.user.y + y;

    let targets = [];

    TARGET.bots.concat(TARGET.users).filter(t => x1 < t.x && t.x < x2 && y1 < t.y && t.y < y2).forEach(target => {

        targets.push({
            id: target.id,
            model: target.model,
            x: target.x,
            y: target.y
        });

    });

    return targets;

};

TARGET.initBots = () => {

    for (let i = 0; i < 100; i++) {

        TARGET.bots.push({
            id: TARGET.generateId(),
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