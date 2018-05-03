let fs = require('fs');
let http = require('http');
let os = require('os');
let webSocket = require('ws');

// config

let ip = '';
let httpPort = 80;
let wsPort = 81;

// if ip empty

if (!ip) {

    let faces = os.networkInterfaces();

    Object.keys(faces).forEach(name => {
        faces[name].forEach(face => {
            if (face.family === 'IPv4' && face.internal === false) ip = face.address;
        });
    });

}

// http

let server = http.createServer((req, res) => {

    let path = '.' + (req.url === '/' ? '/client/index.html' : req.url);

    console.log('HTTP ' + req.connection.remoteAddress + ' ' + path);

    fs.readFile(path, (error, data) => {
        if (error) {
            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);
        } else {
            if (/\.html$/.test(path)) res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            if (/\.js$/.test(path)) res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            if (/\.css$/.test(path)) res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.end(data);
        }
    });

});

server.listen(httpPort, ip, () => {
    console.log('HTTP running at http://' + ip + ':' + httpPort + '/');
});

// ws

let wss = new webSocket.Server({
    host: ip,
    port: wsPort
}, () => {
    console.log('WS running at ws://' + ip + ':' + wsPort + '/');
});

wss.on('connection', ws => {

    console.log('WS connection');

    let user = {
        id: id++,
        name: getName(),
        type: usersType++,
        x: 10000 + getRandomInt(-400, 400),
        y: 10000 + getRandomInt(-400, 400)
    };

    ws.id = user.id;
    ws.user = user;
    users.push(user);

    updateBots();

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

            if (data.action) {

                if (data.action.type === 'go') {

                    let x = parseInt(data.action.x);
                    let y = parseInt(data.action.y);

                    if (!isNaN(x) && !isNaN(y)) {

                        let action = actions.filter(action => action.user.id === ws.id)[0];

                        if (action) {

                            action.x = x;
                            action.y = y;

                        } else {

                            actions.push({
                                type: 'go',
                                user: ws.user,
                                x: x,
                                y: y
                            });

                        }

                    }

                }

            }

        } catch (error) {

            console.log(error);

        }

    });

    ws.on('close', () => {
        console.log('WS close');
        users = users.filter(user =>  user.id !== ws.id);
        updateBots();
    });

    ws.on('error', () => {
        console.log('WS error');
    });

    ws.on('open', () => {
        console.log('WS open');
    });
});

// tools

let getRandomInt = (min, max) => {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getName = () => {
    let n = [
        'Эдвард',
        'Хэйтем',
        'Дункан',
        'Бартоломью',
        'Вудс',
        'Джек',
        'Бенджамин',
        'Джон',
        'Чарльз',
        'Стид'
    ];
    let s = [
        'Кенуэй',
        'Рид',
        'Скотт',
        'Уолпол',
        'Робертс',
        'Роджерс',
        'Тэтч',
        'Рэкхем',
        'Хорниголд',
        'Вэйн',
        'Боннет'
    ];
    return n[getRandomInt(n.length - 1)] + ' ' + s[getRandomInt(n.length - 1)];
};

// users

let usersType = 1;
let users = [];

let updateBots = () => {
    let s = [];
    users.forEach(user => s.push(user.type));
    bots.forEach((bot, i) => bot.type = s[i % s.length] || 0);
};

// bots

let id = 1;

let bots = [];

for (let i = 0; i < 100; i++) {

    bots.push({
        id: id++,
        name: getName(),
        type: 0,
        x: 10000 + getRandomInt(-400, 400),
        y: 10000 + getRandomInt(-400, 400)
    })

}

// actions

let speed = 5;
let actions = [];

setInterval(() => {

    actions.forEach(action => {

        if (action.type === 'go') {

            if (action.user.x < action.x) action.user.x += speed;
            if (action.user.x > action.x) action.user.x -= speed;
            if (action.user.y < action.y) action.user.y += speed;
            if (action.user.y > action.y) action.user.y -= speed;

            if (Math.abs(action.user.x - action.x) < speed) action.user.x = action.x;
            if (Math.abs(action.user.y - action.y) < speed) action.user.y = action.y;

            if (action.user.x === action.x && action.user.y === action.y) actions.splice(actions.indexOf(action), 1);

        }

    });

}, 25);

// broadcast

let t = 0;

setInterval(() => {

    t += 0.02;

    bots.forEach((bot, i) => {

        let s = Math.round(Math.sin(t));

        i % 2 ? bot.x += s : bot.y += s;

    });

    wss.clients.forEach(ws => {

        if (ws.readyState === webSocket.OPEN) {

            let camera = ws.camera || {w: 100, h: 100};
            let bx = 100;
            let by = 100;
            let x = Math.round(camera.w / 2) + bx;
            let y = Math.round(camera.h / 2) + by;

            let x1 = ws.user.x - x;
            let x2 = ws.user.x + x;
            let y1 = ws.user.y - y;
            let y2 = ws.user.y + y;

            ws.send(JSON.stringify({
                id: ws.id,
                speed: speed,
                users: users.length,
                bots: bots.length,
                camera: [camera.w, camera.h],
                buffer: [bx, by],
                range: [x * 2, y * 2],
                targets: bots.concat(users).filter(t => x1 < t.x && t.x < x2 && y1 < t.y && t.y < y2)
            }));

        }
    });

}, 25);