let TARGET = require('./target');
let TOOL = require('./tool');

let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

let temp = [];

for (let i = 0; i < 16; i++) temp.push(0);

AI.move = () => {

    for (let i = 0; i < temp.length; i++) temp[i] += (i + 1) / 200;

    TARGET.bots.forEach((bot, i) => {

        if (bot.action !== 'missed') {

            let delta = Math.round(Math.sin(temp[i % temp.length]));

            let b = {
                x: bot.x,
                y: bot.y
            };

            if (i % 5 === 0) b.x += delta;

            if (i % 5 === 1) b.y += delta;

            if (i % 5 === 2) {
                b.x += delta;
                b.y -= delta;
            }

            if (i % 5 === 3) {
                b.x -= delta;
                b.y += delta;
            }

            TOOL.setSide(bot, b);
            TOOL.setAction(bot, b);
            TOOL.move(bot, b);

        }

    });

};

module.exports = AI;