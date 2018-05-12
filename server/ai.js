let ACTION = require('./action');
let TARGET = require('./target');

let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

let temp = [];

for (let i = 0; i < 10; i++) temp.push(0);

AI.move = () => {

    for (let i = 0; i < temp.length; i++) temp[i] += (i + 1) / 100;

    TARGET.bots.forEach((bot, i) => {

        let a = Math.round(Math.sin(temp[i % temp.length]));
        let point = {
            x: bot.x,
            y: bot.y
        };

        if (i % 5 === 0) point.x += a;

        if (i % 5 === 1) point.y += a;

        if (i % 5 === 2) {
            point.x += a;
            point.y -= a;
        }

        if (i % 5 === 3) {
            point.x -= a;
            point.y += a;
        }

        ACTION.move(bot, point, 2);

    });

};

module.exports = AI;