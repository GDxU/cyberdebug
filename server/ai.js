let TARGET = require('./target');

let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

let temp = [];

for (let i = 0; i < 10; i++) temp.push(0);

AI.move = () => {

    for (let i = 0; i < temp.length; i++) temp[i] += (i + 1) / 100;

    TARGET.bots.forEach((bot, i) => {

        bot[i % 2 ? 'x' : 'y'] += Math.round(Math.sin(temp[i % temp.length]));

    });

};

module.exports = AI;