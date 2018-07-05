let TOOL = require('./tool');

let TARGET = {};

TARGET.id = 1;
TARGET.model = 0;
TARGET.users = [];
TARGET.bots = [];

/**
 * Генерация ботов
 * @width {integer} ширина поля генерации ботов
 * @height {integer} высота поля генерации ботов
 * @delta {integer} количество ботов на квадрат 100х100
 */

let width = 10000;
let height = 10000;
let delta = 1;
TARGET.botCount = Math.floor(width * height * delta / 10000);

// TARGET.botCount = 0;
// width = Math.ceil(Math.sqrt(TARGET.botCount * 10000 / delta));
// height = width;

let x = Math.floor(width / 2);
let y = Math.floor(height / 2);

TARGET.generateId = () => 't' + (TARGET.id++).toString(36);
TARGET.generateX = () => 10000 + TOOL.getRandomInt(-x, x);
TARGET.generateY = () => 10000 + TOOL.getRandomInt(-y, y);
TARGET.generateSide = () => ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'][TOOL.getRandomInt(7)];

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

    ws.user = {
        id: TARGET.generateId(),
        name: '',
        model: TARGET.model++,
        action: 'stand',
        // side: TARGET.generateSide(),
        side: 's',
        // x: TARGET.generateX(),
        x: 10000 + 125,
        // y: TARGET.generateY(),
        y: 10000 - 125,
        kill: 0,
        stun: 0,
        die: 0,
        score: 0,
        contract: undefined,
        hunter: 0,
        last: undefined,
        // speed: 2,
        speed: 100,
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

TARGET.initBot = data => {

    data = data || {};

    let bot = {
        id: TARGET.generateId(),
        model: data.model || 0,
        action: data.action || 'stand',
        side: data.side || TARGET.generateSide(),
        x: data.x || TARGET.generateX(),
        y: data.y || TARGET.generateY(),
        speed: 2
    };

    TARGET.bots.push(bot);

    return bot;

};

// создание ботов
while (TARGET.bots.length < TARGET.botCount) TARGET.initBot();

TARGET.updateBots = () => {

    let models = [];
    TARGET.users.forEach(user => models.push(user.model));
    TARGET.bots.forEach((bot, i) => bot.model = models[i % models.length] || 0);

};

module.exports = TARGET;