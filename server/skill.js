let TARGET = require('./target');
let TOOL = require('./tool');

let SKILL = {};

// тикрейт

SKILL.tr = 40;
SKILL.ms = 1000 / SKILL.tr;

// время отката

SKILL.cooldown = {

    morph: 1000 * 20,
    teleport: 1000 * 40

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

                if (TOOL.getDistance(ws.user, bot) < distance) bot.model = ws.user.model;

            });

            ws.user.morph = SKILL.cooldown.morph;

        }

    },

    // телепорт

    teleport: ws => {

        if (!ws.user.teleport) {

            ws.user.x = TARGET.generateX();
            ws.user.y = TARGET.generateY();

            ws.user.teleport = SKILL.cooldown.teleport;

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