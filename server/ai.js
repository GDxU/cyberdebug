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

        if (i % 5 === 0) bot.x += a;

        if (i % 5 === 1) bot.y += a;

        if (i % 5 === 2) {
            bot.x += a;
            bot.y -= a;
        }

        if (i % 5 === 3) {
            bot.x -= a;
            bot.y += a;
        }

        bot.action = a === 0 ? 'stand' : 'walk';

    });

};

module.exports = AI;