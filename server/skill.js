let TARGET = require('./target');
let TOOL = require('./tool');

let SKILL = {};

// тикрейт

SKILL.tr = 40;
SKILL.ms = 1000 / SKILL.tr;

// время отката

SKILL.cooldown = {

    morph: 1000 * 20,
    teleport: 1000 * 40,
    glitch: 1000 * 60

};

// синхронизация

SKILL.sync = (ws, data) => {

    if (data.skill && SKILL.store[data.skill]) {

        SKILL.store[data.skill](ws);

    }

};

// способности

SKILL.store = {

    // превращение

    morph: ws => {

        if (!ws.user.morph) {

            let distance = 250;

            TARGET.bots.forEach(bot => {

                if (TOOL.getDistance(ws.user, bot) < distance) {

                    bot.model = ws.user.model;
                    bot.action = 'missed';

                    setTimeout(() => {

                        bot.action = 'stand';

                    }, 1000);

                }

            });

            ws.user.morph = SKILL.cooldown.morph;

        }

    },

    // телепорт

    teleport: ws => {

        if (!ws.user.teleport) {

            ws.user.action = 'missed';

            setTimeout(() => {

                ws.user.x = TARGET.generateX();
                ws.user.y = TARGET.generateY();

            }, 1000);

            setTimeout(() => {

                ws.user.action = 'stand';

            }, 2000);

            ws.user.teleport = SKILL.cooldown.teleport;

        }

    },

    // помехи

    glitch: ws => {

        if (!ws.user.glitch) {

            let distance = 250;

            TARGET.users.forEach(user => {

                if (TOOL.getDistance(ws.user, user) < distance && ws.user.id !== user.id) {

                    user.sfx.push('glitch');

                    setTimeout(() => {

                        user.sfx = user.sfx.filter(sfx => sfx !== 'glitch');

                    }, 3000);

                }

            });

            ws.user.glitch = SKILL.cooldown.glitch;

        }

    }

};

// откат способностей

setInterval(() => {

    TARGET.users.forEach(user => {

        Object.keys(SKILL.store).forEach(skill => user[skill] = user[skill] >= SKILL.ms ? user[skill] - SKILL.ms : 0);

    });

}, SKILL.ms);

module.exports = SKILL;