let TOOL = require('./tool');

let TARGET = {};

TARGET.id = 0;
TARGET.model = 0;
TARGET.users = [];
TARGET.bots = [];

TARGET.generateId = () => TARGET.id++;
TARGET.generateX = () => 10000 + TOOL.getRandomInt(-400, 400);
TARGET.generateY = () => 10000 + TOOL.getRandomInt(-400, 400);

TARGET.get = id => TARGET.bots.concat(TARGET.users).filter(target => target.id === id)[0];

TARGET.exportUser = ws => {

    let distance = [250, 500, 750, 1000];

    // проверка контракта

    let contract = undefined;

    if (ws.user.contract) {

        let i = 0;

        for (; i < distance.length; i++) if (TOOL.getDistance(ws.user, ws.user.contract) < distance[i]) break;

        contract = {
            name: ws.user.contract.name,
            model: ws.user.contract.model,
            hunter: ws.user.contract.hunter,
            radar: i,
            azimuth: TOOL.getAzimuth(ws.user, ws.user.contract)
        };

    }

    // проверка охотника

    let detector = undefined;

    if (ws.user.hunter > 0) {

        detector = distance.length;

        TARGET.users.forEach(user => {

            if (user.contract && user.contract.id === ws.user.id) {

                let i = 0;

                for (; i < distance.length; i++) if (TOOL.getDistance(user, ws.user) < distance[i]) break;

                if (detector > i) detector = i;

            }

        });

    }

    // информация о пользователе

    return {
        id: ws.user.id,
        contract: contract,
        hunter: ws.user.hunter,
        detector: detector
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
        x: TARGET.generateX(),
        y: TARGET.generateY(),
        kill: 0,
        stun: 0,
        die: 0,
        score: 0,
        contract: undefined,
        hunter: 0,
        speed: 2
    };

    TARGET.users.push(ws.user);
    TARGET.updateBots();

};

TARGET.removeUser = id => {

    TARGET.users = TARGET.users.filter(user => user.id !== id);
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

TARGET.initBot = data => {

    data = data || {};

    let bot = {
        id: TARGET.generateId(),
        model: data.model || 0,
        x: data.x || TARGET.generateX(),
        y: data.y || TARGET.generateY()
    };

    TARGET.bots.push(bot);

    return bot;

};

// создание ботов
while (TARGET.bots.length < 100) TARGET.initBot();

TARGET.updateBots = () => {

    let models = [];
    TARGET.users.forEach(user => models.push(user.model));
    TARGET.bots.forEach((bot, i) => bot.model = models[i % models.length] || 0);

};

module.exports = TARGET;