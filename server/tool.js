let os = require('os');

let TOOL = {};

TOOL.getRandomInt = (min, max) => {

    if (!max) {

        max = min;
        min = 0;

    }

    return Math.floor(Math.random() * (max - min + 1)) + min;

};

TOOL.getIp = ip => {

    let faces = os.networkInterfaces();

    Object.keys(faces).forEach(name => {
        faces[name].forEach(face => {
            if (face.family === 'IPv4' && face.internal === false) ip = face.address;
        });
    });

    return ip;

};

TOOL.toRadian = degree => Math.PI / 180 * degree;

TOOL.toDegree = radian => 180 / Math.PI * radian;

TOOL.getDistance = (a, b) => {

    let dx = b.x - a.x;
    let dy = b.y - a.y;

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

};

TOOL.getAzimuth = (a, b) => {

    let dx = b.x - a.x;
    let dy = b.y - a.y;

    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    let dxa = Math.abs(dx);
    let beta = Math.acos(dxa / distance);

    return dx < 0 ? TOOL.toRadian(270) + (dy < 0 ? beta: -beta) : TOOL.toRadian(90) + (dy < 0 ? -beta: beta);

};

TOOL.move = (a, b, s) => {

    if (a && b && s) {

        if (a.x < b.x) a.x += s;
        if (a.x > b.x) a.x -= s;
        if (a.y < b.y) a.y += s;
        if (a.y > b.y) a.y -= s;

        if (Math.abs(a.x - b.x) < s) a.x = b.x;
        if (Math.abs(a.y - b.y) < s) a.y = b.y;

    }

};

module.exports = TOOL;