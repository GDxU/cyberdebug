let WebSocket = require('ws');

let TOOL = require('./tool');
let TARGET = require('./target');
let CAR = require('./car');
let TRAFFIC = require('./traffic');
let RAIN = require('./rain');
let SUN = require('./sun');
let CAMERA = require('./camera');
let TOTAL = require('./total');
let AI = require('./ai');
let ACTION = require('./action');
let CONTRACT = require('./contract');
let SKILL = require('./skill');

let WS = {};

WS.ip = '' || TOOL.getIp();
WS.port = 81;

WS.server = new WebSocket.Server({
    host: WS.ip,
    port: WS.port
}, () => {

    console.log('WS running at ws://' + WS.ip + ':' + WS.port + '/');

});

WS.server.on('connection', ws => {

    console.log('WS connection');

    TARGET.appendUser(ws);

    ws.on('message', message => {

        console.log('WS message', message);

        try {

            let data = JSON.parse(message);

            CAMERA.sync(ws, data);
            TARGET.syncUser(ws, data);
            ACTION.sync(ws, data);
            SKILL.sync(ws, data);

        } catch (error) {

            console.log(error);

        }

    });

    ws.on('close', () => {

        console.log('WS close');

        CONTRACT.disconnect(ws.user);
        TARGET.removeUser(ws.user.id);

    });

    ws.on('open', () => {

        console.log('WS open');

    });

    ws.on('error', () => {

        console.log('WS error');

    });

});

WS.tr = 40;
WS.ms = 1000 / WS.tr;

setInterval(() => {

    let traffic = TRAFFIC.status();
    let rain = RAIN.export();
    let sun = SUN.export();

    let totals = TOTAL.export();

    let count = {
        user: TARGET.users.length,
        bot: TARGET.bots.length,
        car: CAR.store.length
    };

    WS.server.clients.forEach(ws => {

        if (ws.readyState === WebSocket.OPEN) {

            let message = {

                user: TARGET.exportUser(ws),

                targets: TARGET.exportTargets(ws),
                cars: CAR.export(ws),

                traffic: traffic,
                rain: rain,
                sun: sun,

                totals: totals,

                count: count

            };

            ws.send(JSON.stringify(message));

        }
    });

}, WS.ms);

AI.bot.start(TARGET.bots);
AI.car.start(CAR.store);
TRAFFIC.start();
RAIN.start();
SUN.start();

module.exports = WS;