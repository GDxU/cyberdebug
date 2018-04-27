let ip = '127.0.0.1';
let port = 80;

// get server ip

let os = require('os');
let faces = os.networkInterfaces();

Object.keys(faces).forEach((name) => {
    faces[name].forEach((face) => {
        if (face.family === 'IPv4' && face.internal === false) ip = face.address;
    });
});

// http

let http = require('http');

let server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port, ip, () => {
    console.log('Server running at http://' + ip + ':' + port + '/');
});