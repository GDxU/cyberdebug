let CONFIG = require('./config');
let TRAFFIC = require('./traffic');

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

                    if (
                        TRAFFIC.isCross(bot) ||
                        !(TRAFFIC.isCross({x: bot.x, y: bot.y - bot.speed}) && TRAFFIC.status() !== 'vertical')
                    ) {
                        bot.y -= bot.speed;
                        if (bot.y < 0) bot.y = h;
                        bot.action = 'walk';
                    } else bot.action = 'stand';

                }

                if (bot.side === 's') {

                    if (
                        TRAFFIC.isCross(bot) ||
                        !(TRAFFIC.isCross({x: bot.x, y: bot.y + bot.speed}) && TRAFFIC.status() !== 'vertical')
                    ) {
                        bot.y += bot.speed;
                        if (bot.y > h) bot.y = 0;
                        bot.action = 'walk';
                    } else bot.action = 'stand';

                }

                if (bot.side === 'w') {

                    if (
                        TRAFFIC.isCross(bot) ||
                        !(TRAFFIC.isCross({x: bot.x - bot.speed, y: bot.y}) && TRAFFIC.status() !== 'horizontal')
                    ) {
                        bot.x -= bot.speed;
                        if (bot.x < 0) bot.x = w;
                        bot.action = 'walk';
                    } else bot.action = 'stand';

                }

                if (bot.side === 'e') {

                    if (
                        TRAFFIC.isCross(bot) ||
                        !(TRAFFIC.isCross({x: bot.x + bot.speed, y: bot.y}) && TRAFFIC.status() !== 'horizontal')
                    ) {
                        bot.x += bot.speed;
                        if (bot.x > w) bot.x = 0;
                        bot.action = 'walk';
                    } else bot.action = 'stand';

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

                    let success = true;

                    for (let i = 0; i < cars.length && success; i++) success = !(
                        cars[i].x === car.x &&
                        cars[i].y > car.y - 110 &&
                        cars[i].y < car.y
                    );

                    if (
                        success && (
                            TRAFFIC.isCross({x: car.x, y: car.y - 100}) ||
                            !(TRAFFIC.isCross({x: car.x, y: car.y - car.speed - 100}) && TRAFFIC.status() !== 'vertical')
                        )
                    ) {
                        car.y -= car.speed;
                        if (car.y < 0) car.y = h;
                    }

                }

                if (car.side === 's') {

                    let success = true;

                    for (let i = 0; i < cars.length && success; i++) success = !(
                        cars[i].x === car.x &&
                        cars[i].y < car.y + 110 &&
                        cars[i].y > car.y
                    );

                    if (
                        success && (
                            TRAFFIC.isCross(car) ||
                            !(TRAFFIC.isCross({x: car.x, y: car.y + car.speed}) && TRAFFIC.status() !== 'vertical')
                        )
                    ) {
                        car.y += car.speed;
                        if (car.y > h) car.y = 0;
                    }

                }

                if (car.side === 'w') {

                    let success = true;

                    for (let i = 0; i < cars.length && success; i++) success = !(
                        cars[i].y === car.y &&
                        cars[i].x > car.x - 160 &&
                        cars[i].x < car.x
                    );

                    if (
                        success && (
                            TRAFFIC.isCross(car) ||
                            !(TRAFFIC.isCross({x: car.x - car.speed, y: car.y}) && TRAFFIC.status() !== 'horizontal')
                        )
                    ) {
                        car.x -= car.speed;
                        if (car.x < 0) car.x = w;
                    }

                }

                if (car.side === 'e') {

                    let success = true;

                    for (let i = 0; i < cars.length && success; i++) success = !(
                        cars[i].y === car.y &&
                        cars[i].x < car.x + 160 &&
                        cars[i].x > car.x
                    );

                    if (
                        success && (
                            TRAFFIC.isCross({x: car.x + 100, y: car.y}) ||
                            !(TRAFFIC.isCross({x: car.x + car.speed + 150, y: car.y}) && TRAFFIC.status() !== 'horizontal')
                        )
                    ) {
                        car.x += car.speed;
                        if (car.x > w) car.x = 0;
                    }

                }

            });

        }, AI.ms);

    }

};

module.exports = AI;