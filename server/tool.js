let os = require('os');

let TOOL = {};

TOOL.getRandomInt = (min, max) => {

    if (!max) {

        max = min;
        min = 0;

    }

    return Math.floor(Math.random() * (max - min + 1)) + min;

};

TOOL.getIp = (ip) => {

    let faces = os.networkInterfaces();

    Object.keys(faces).forEach(name => {
        faces[name].forEach(face => {
            if (face.family === 'IPv4' && face.internal === false) ip = face.address;
        });
    });

    return ip;

};

module.exports = TOOL;