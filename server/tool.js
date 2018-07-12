let os = require('os');

let COLLISION = require('./collision');

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

TOOL.move = (a, b) => {

    let move = undefined;

    if (a && b && a.speed) {

        let c = {
            x: a.x,
            y: a.y
        };

        if (a.x < b.x) c.x = a.x + a.speed;
        if (a.x > b.x) c.x = a.x - a.speed;
        if (a.y < b.y) c.y = a.y + a.speed;
        if (a.y > b.y) c.y = a.y - a.speed;

        if (Math.abs(c.x - b.x) < a.speed) c.x = b.x;
        if (Math.abs(c.y - b.y) < a.speed) c.y = b.y;

        if (!COLLISION.isCollision(c)) {

            a.x = c.x;
            a.y = c.y;

        }

        move = a.x === b.x && a.y === b.y;

    }

    return move;

};

TOOL.isPointInRectangle = (point, rectangle) => rectangle.a.x <= point.x && point.x < rectangle.b.x && rectangle.a.y <= point.y && point.y < rectangle.b.y;

TOOL.setSide = (a, b) => {

    let side = undefined;

    if (a && b) {

        if (a.x === b.x && a.y === b.y) side = a.side;
        else {

            if (a.x === b.x && a.y > b.y) side = 'n';
            if (a.x === b.x && a.y < b.y) side = 's';

            if (a.x > b.x && a.y === b.y) side = 'w';
            if (a.x < b.x && a.y === b.y) side = 'e';

            if (a.x < b.x && a.y > b.y) side = 'ne';
            if (a.x < b.x && a.y < b.y) side = 'se';

            if (a.x > b.x && a.y > b.y) side = 'nw';
            if (a.x > b.x && a.y < b.y) side = 'sw';

            a.side = side;

        }

    }

    return side;

};

TOOL.setAction = (a, b) => {

    let action = undefined;

    if (a && b) {

        action = a.x === b.x && a.y === b.y ? 'stand' : 'walk';

        a.action = action;

    }

    return action;

};

module.exports = TOOL;