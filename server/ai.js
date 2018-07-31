let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

AI.bot = {

    way: require('../data/bot'),

    start: bots => {

        let CONFIG = require('./config');

        let W = CONFIG.world.width;
        let H = CONFIG.world.height;

        setInterval(() => {

            bots.forEach(bot => {

                if (bot.side === 'n') {

                    bot.y -= bot.speed;

                    if (bot.y < 0) bot.y = H;

                }

                if (bot.side === 's') {

                    bot.y += bot.speed;

                    if (bot.y > H) bot.y = 0;

                }

                if (bot.side === 'w') {

                    bot.x -= bot.speed;

                    if (bot.x < 0) bot.x = W;

                }

                if (bot.side === 'e') {

                    bot.x += bot.speed;

                    if (bot.x > W) bot.x = 0;

                }

            });

        }, AI.ms);

    }

};

module.exports = AI;