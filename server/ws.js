let WebSocket = require('ws');

let TOOL = require('./tool');
let TARGET = require('./target');
let AI = require('./ai');
let ACTION = require('./action');

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

    ws.user = TARGET.appendUser();

    ws.on('message', message => {

        try {

            let data = JSON.parse(message);

            if (data.camera) {

                let w = parseInt(data.camera.w);
                let h = parseInt(data.camera.h);

                if (!isNaN(w) && !isNaN(h)) ws.camera = {
                    w: w,
                    h: h
                };

            }

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

    ws.on('open', () => {

        console.log('WS open');

    });

});

WS.tr = 40;
WS.ms = 1000 / WS.tr;

setInterval(() => {

    AI.move();

    WS.server.clients.forEach(ws => {

        if (ws.readyState === WebSocket.OPEN) {

            ws.send(JSON.stringify({
                id: ws.user.id,
                users: TARGET.users.length,
                bots: TARGET.bots.length,
                targets: TARGET.getTargets(ws)
            }));

        }
    });

}, WS.ms);

module.exports = WS;