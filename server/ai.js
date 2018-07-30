let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

AI.way = {
    bot: require('../data/bot')
};

AI.start = () => {

    let CONFIG = require('./config');
    let TARGET = require('./target');

    setInterval(() => {

        if (TARGET.bots) TARGET.bots.forEach(bot => {

            if (bot.side === 'n') {

                bot.y -= bot.speed;

                if (bot.y < 0) bot.y = CONFIG.world.height;

            }

            if (bot.side === 's') {

                bot.y += bot.speed;

                if (bot.y > CONFIG.world.height) bot.y = 0;

            }

            if (bot.side === 'w') {

                bot.x -= bot.speed;

                if (bot.x < 0) bot.x = CONFIG.world.width;

            }

            if (bot.side === 'e') {

                bot.x += bot.speed;

                if (bot.x > CONFIG.world.width) bot.x = 0;

            }

        });

    }, AI.ms);

};

module.exports = AI;