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
        x: 10000 + getRandomInt(-100, 100),
        y: 10000 + getRandomInt(-100, 100)
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

for (let i = 0; i < 10000; i++) {

    bots.push({
        id: id++,
        name: getName(),
        type: 0,
        x: getRandomInt(10000 * 2),
        y: getRandomInt(10000 * 2)
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