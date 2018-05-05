let WebSocket = require('ws');

let TOOL = require('./tool');
let ACTION = require('./action');
let TARGET = require('./target');
let AI = require('./ai');

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

    // После установки соединения создаём объект игрока

    console.log('WS connection');

    ws.user = TARGET.appendUser();
    ws.need = true;

    // Посылаем в клиент идентификатор игрока

    ws.on('open', () => {

        console.log('WS open');

    });

    // Принимаем от клиента команды

    ws.on('message', message => {

        console.log('WS message', message);

        try {

            let data = JSON.parse(message);

            if (data.camera) WS.setCamera(ws, data.camera);
            if (data.name) WS.setName(ws, data.name);
            if (data.action) ACTION.sync(ws, data.action);

        } catch (error) {

            console.log(error);

        }

    });

    ws.on('close', () => {

        console.log('WS close');

        TARGET.removeUser(ws);

    });

    ws.on('error', () => {

        console.log('WS error');

    });

});

WS.setCamera = (ws, camera) => {

    let w = parseInt(camera.w);
    let h = parseInt(camera.h);

    if (!isNaN(w) && !isNaN(h)) ws.camera = {
        w: w,
        h: h
    };

};

WS.setName = (ws, name) => {

    ws.user.name = name;

};

WS.tr = 40;
WS.ms = 1000 / WS.tr;

setInterval(() => {

    AI.move();

    let totals = TARGET.getTotals();

    WS.server.clients.forEach(ws => {

        if (ws.readyState === WebSocket.OPEN) {

            let message = {
                users: TARGET.users.length,
                bots: TARGET.bots.length,
                totals: totals,
                targets: TARGET.getTargets(ws)
            };

            if (ws.need) {

                message.id = ws.user.id;
                delete ws.need;

            }

            ws.send(JSON.stringify(message));

        }
    });

}, WS.ms);

module.exports = WS;