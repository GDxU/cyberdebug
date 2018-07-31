let CONFIG = require('./config');

let AI = {};

AI.tr = 40;
AI.ms = 1000 / AI.tr;

AI.bot = {

    way: require('../data/bot'),

    start: bots => {

        let w = CONFIG.world.width;
        let h = CONFIG.world.height;

        setInterval(() => {

            bots.forEach(bot => {

                if (bot.side === 'n') {

                    bot.y -= bot.speed;

                    if (bot.y < 0) bot.y = h;

                }

                if (bot.side === 's') {

                    bot.y += bot.speed;

                    if (bot.y > h) bot.y = 0;

                }

                if (bot.side === 'w') {

                    bot.x -= bot.speed;

                    if (bot.x < 0) bot.x = w;

                }

                if (bot.side === 'e') {

                    bot.x += bot.speed;

                    if (bot.x > w) bot.x = 0;

                }

            });

        }, AI.ms);

    }

};

AI.car = {

    way: require('../data/car'),

    start: cars => {

        let w = CONFIG.world.width;
        let h = CONFIG.world.height;

        setInterval(() => {

            cars.forEach(car => {

                if (car.side === 'n') {

                    car.y -= car.speed;

                    if (car.y < 0) car.y = h;

                }

                if (car.side === 's') {

                    car.y += car.speed;

                    if (car.y > h) car.y = 0;

                }

                if (car.side === 'w') {

                    car.x -= car.speed;

                    if (car.x < 0) car.x = w;

                }

                if (car.side === 'e') {

                    car.x += car.speed;

                    if (car.x > w) car.x = 0;

                }

            });

        }, AI.ms);

    }

};

module.exports = AI;