let TARGET = require('./target');

let CONTRACT = {};

CONTRACT.pause = false;
CONTRACT.tr = 0.2;
CONTRACT.ms = 1000 / CONTRACT.tr;
CONTRACT.store = [];

CONTRACT.score = {
    kill: 200,
    stun: 100
};

CONTRACT.disconnect = user => {

    CONTRACT.pause = true;

    // уменьшение количества охотников за целью (если цель была)
    if (user.contract) user.contract.hunter--;

    // удаление всех контрактов на игрока (если контракт есть, причём на этого игрока)
    TARGET.users.forEach(hunter => {

        if (hunter.contract && hunter.contract.id === user.id) hunter.contract = undefined;

    });

    CONTRACT.pause = false;

};

CONTRACT.kill = user => {

    CONTRACT.pause = true;

    // обнуление количества охотников за целью
    user.contract.hunter = 0;

    // уменьшение количества охотников у цели цели, если у цели был контракт
    // удаление контракта у цели, если у цели был контракт
    if (user.contract.contract) {

        user.contract.contract.hunter--;
        user.contract.contract = undefined;

    }

    // обновление показателей цели
    user.contract.die++;

    // респаун цели
    user.contract.x = TARGET.generateX();
    user.contract.y = TARGET.generateY();

    // удаление всех контрактов на цель
    // id вынесен в переменную на случай преждевременного удаления цели у игрока
    let id = user.contract.id;
    TARGET.users.forEach(hunter => {

        if (hunter.contract && hunter.contract.id === id) hunter.contract = undefined;

    });

    // обновление показателей игрока
    user.kill++;
    user.score += CONTRACT.score.kill;

    CONTRACT.pause = false;

};

CONTRACT.miss = (user, bot) => {

    CONTRACT.pause = true;

    // проверка на наличие контракта
    if (user.contract) {

        // уменьшение количества охотников за целью
        user.contract.hunter--;

        // удаление контракта на цель
        user.contract = undefined;

    }

    // респаун бота
    bot.x = TARGET.generateX();
    bot.y = TARGET.generateY();

    CONTRACT.pause = false;

};

CONTRACT.stun = (user, hunter) => {

    CONTRACT.pause = true;

    // уменьшение количества охотников за игроком
    user.hunter--;

    // удаление контракта на игрока
    hunter.contract = undefined;

    // обновление показателей игрока
    user.stun++;
    user.score += CONTRACT.score.stun;

    CONTRACT.pause = false;

};

setInterval(() => {

    if (!CONTRACT.pause && TARGET.users.length > 1) {

        TARGET.users = TARGET.users.sort((a, b) => b.score - a.score);

        TARGET.users.forEach(user => {

            if (user.hunter < 0) user.hunter = 0;

            if (!user.contract) {

                for (let hunter = 0; hunter < 4; hunter++) {

                    /*
                    user.contract = TARGET.users.filter(target =>
                        target.id !== user.id &&
                        target.hunter === hunter + 1 && (
                            !target.contract || target.contract.id !== user.id
                        )
                    )[0];
                    */

                    if (!user.contract) user.contract = user.contract = TARGET.users.filter(target =>
                        target.id !== user.id &&
                        target.hunter === hunter && (
                            !target.contract || target.contract.id !== user.id
                        )
                    )[0];

                    if (user.contract) {

                        user.contract.hunter++;
                        break;

                    }

                }

            }

        });

    }

}, CONTRACT.ms);

module.exports = CONTRACT;