let AI = require('./ai');
let CONFIG = require('./config');
let COLLISION = require('./collision');
let TOOL = require('./tool');

let TARGET = {};

TARGET.id = 1;
TARGET.model = 0;
TARGET.users = [];
TARGET.bots = [];

TARGET.generateId = () => 't' + (TARGET.id++).toString(36);
TARGET.generateSide = () => ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'][TOOL.getRandomInt(7)];
TARGET.generateCoordinates = () => {

    let a = {
        x: 0,
        y: 0
    };

    while (COLLISION.isCollision(a)) {

        a.x = TOOL.getRandomInt(COLLISION.boundary.a.x, COLLISION.boundary.b.x - 1);
        a.y = TOOL.getRandomInt(COLLISION.boundary.a.y, COLLISION.boundary.b.y - 1);

    }

    return a;

};

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
        detector: detector,
        morph: ws.user.morph,
        teleport: ws.user.teleport,
        glitch: ws.user.glitch,
        sfx: ws.user.sfx
    };

};

TARGET.syncUser = (ws, data) => {

    if (data.user) {

        ws.user.name = data.user.name.substr(0, 20);

    }

};

TARGET.appendUser = ws => {

    ws.camera = {
        w: 100,
        h: 100
    };

    let coordinates = TARGET.generateCoordinates();

    ws.user = {
        id: TARGET.generateId(),
        name: '',
        model: TARGET.model++,
        action: 'stand',
        side: TARGET.generateSide(),
        x: coordinates.x,
        y: coordinates.y,
        kill: 0,
        stun: 0,
        die: 0,
        score: 0,
        contract: undefined,
        hunter: 0,
        last: undefined,
        speed: 300,
        morph: 0,
        teleport: 0,
        glitch: 0,
        sfx: []
    };

    ws.user.ws = ws;

    TARGET.users.push(ws.user);
    TARGET.updateBots();

};

TARGET.removeUser = id => {

    TARGET.users = TARGET.users.filter(user => user.id !== id);
    TARGET.updateBots();

};

TARGET.exportTargets = ws => {

    let x = Math.floor(ws.camera.w / 2) + 100;
    let y = Math.floor(ws.camera.h / 2) + 100;

    let x1 = ws.user.x - x;
    let x2 = ws.user.x + x;
    let y1 = ws.user.y - y;
    let y2 = ws.user.y + y;

    let targets = [];
    let filter = t => x1 < t.x && t.x < x2 && y1 < t.y && t.y < y2;

    TARGET.bots.concat(TARGET.users).filter(filter).forEach(target => {

        targets.push({
            id: target.id,
            model: target.model,
            action: target.action,
            side: target.side,
            x: target.x,
            y: target.y
        });

    });

    return targets;

};

TARGET.appendBot = data => {

    data = data || {};

    let bot = {
        id: TARGET.generateId(),
        model: 0,
        action: 'walk',
        side: data.side,
        x: data.x,
        y: data.y,
        // speed: TOOL.getRandomInt(1, 4)
        speed: TOOL.getRandomInt(200, 500) / 100
    };

    TARGET.bots.push(bot);

    return bot;

};

TARGET.initBots = () => {

    let X = AI.bot.way.X;
    let Y = AI.bot.way.Y;
    let w = CONFIG.world.width;
    let h = CONFIG.world.height;

    for (let i = 0; i < 10000; i++) {

        TARGET.appendBot(TOOL.getRandomInt(1) ? {
            x: TOOL.getRandomInt(X[i % X.length][0] + 5, X[i % X.length][1] - 5),
            y: TOOL.getRandomInt(0, h),
            side: TOOL.getRandomInt(1) ? 'n' : 's'
        } : {
            x: TOOL.getRandomInt(0, w),
            y: TOOL.getRandomInt(Y[i % Y.length][0] + 5, Y[i % Y.length][1] - 5),
            side: TOOL.getRandomInt(1) ? 'e' : 'w'
        });

    }

};

TARGET.initBots();

TARGET.updateBots = () => {

    let models = [];
    TARGET.users.forEach(user => models.push(user.model));
    TARGET.bots.forEach(bot => bot.model = models[TOOL.getRandomInt(0, models.length - 1)]);

};

module.exports = TARGET;