let WebSocket = require('ws');

let TOOL = require('./tool');
let TARGET = require('./target');
let CAMERA = require('./camera');
let TOTAL = require('./total');
let AI = require('./ai');
let ACTION = require('./action');
let CONTRACT = require('./contract');

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

        } catch (error) {

            console.log(error);

        }

    });

    ws.on('close', () => {

        console.log('WS close');

        CONTRACT.remove(ws);
        TARGET.removeUser(ws);

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

    AI.move();

    let totals = TOTAL.get();

    WS.server.clients.forEach(ws => {

        if (ws.readyState === WebSocket.OPEN) {

            let message = {
                user: TARGET.getUser(ws),
                targets: TARGET.getTargets(ws),
                totals: totals,
                users: TARGET.users.length,
                bots: TARGET.bots.length
            };

            ws.send(JSON.stringify(message));

        }
    });

}, WS.ms);

module.exports = WS;