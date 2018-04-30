let fs = require('fs');
let http = require('http');
let os = require('os');
let uuid = require('uuid/v4');
let webSocket = require('ws');

// config

let ip = '';
let httpPort = 80;
let wsPort = 81;

// if ip empty

if (!ip) {

    let faces = os.networkInterfaces();

    Object.keys(faces).forEach((name) => {
        faces[name].forEach((face) => {
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

wss.on('connection', (ws) => {

    console.log('WS connection');

    // ws.id = uuid();
    ws.id = id++;
    users.push({
        id: ws.id,
        name: getName(),
        x: 1000 + getRandomInt(-100, 100),
        y: 1000 + getRandomInt(-100, 100)
    });

    ws.on('message', (message) => {
        // console.log('WS ' + message);
    });

    ws.on('close', () => {
        console.log('WS close');
        users = users.filter((user) => {
            return user.id !== ws.id;
        });
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

let users = [];

// bots

let id = 0;

let bots = [];

for (let i = 0; i < 100; i++) {

    bots.push({
        // id: uuid(),
        id: id++,
        name: getName(),
        x: getRandomInt(2000),
        y: getRandomInt(2000)
    })

}

// broadcast

let t = 0;

setInterval(() => {

    t += 0.02;

    bots.forEach((bot, i) => {

        let s = Math.round(Math.sin(t));

        i % 2 ? bot.x += s : bot.y += s;

    });

    wss.clients.forEach((ws) => {

        if (ws.readyState === webSocket.OPEN) {

            ws.send(JSON.stringify({
                id: ws.id,
                targets: bots.concat(users)
            }));

        }
    });

}, 25);