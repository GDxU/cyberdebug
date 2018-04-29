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

    ws.id = uuid();
    users.push({
        id: ws.id,
        x: 0,
        y: 0
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

// users

let users = [];

// broadcast

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === webSocket.OPEN) {
            ws.send(JSON.stringify(users));
        }
    });
}, 25);