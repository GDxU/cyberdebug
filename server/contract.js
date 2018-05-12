let ACTION = undefined;
let ALERT = require('./alert');
let TARGET = require('./target');

let CONTRACT = {};

CONTRACT.pause = false;
CONTRACT.tr = 0.2;
CONTRACT.ms = 1000 / CONTRACT.tr;
CONTRACT.store = [];

CONTRACT.score = {
    kill: 200,
    stun: 100,
    stunned: 50
};

CONTRACT.disconnect = user => {

    CONTRACT.pause = true;

    /** target */

    // уменьшение количества охотников за целью (если цель была)
    if (user.contract) user.contract.hunter--;

    /** hunter */

    TARGET.users.forEach(hunter => {

        if (hunter.contract && hunter.contract.id === user.id) {

            // удаление всех контрактов на игрока (если контракт есть, причём на этого игрока)
            hunter.contract = undefined;

            // оповещение о выходе цели из игры
            ALERT.send(hunter.ws, 'disconnect');

        }

    });

    CONTRACT.pause = false;

};

CONTRACT.kill = user => {

    CONTRACT.pause = true;

    if (!ACTION) ACTION = require('./action');

    /** target */

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

    // сброс идентификатора последнего контракта
    user.contract.last = undefined;

    // оповещение цели о смерти
    ALERT.send(user.contract.ws, 'killed');

    // удаление у цели действия
    ACTION.removeByUser(user.contract);

    // респаун цели
    user.contract.x = TARGET.generateX();
    user.contract.y = TARGET.generateY();

    /** user */

    // обновление показателей игрока
    user.kill++;
    user.score += CONTRACT.score.kill;

    // оповещение игрока о выполненном контракте
    ALERT.send(user.ws, 'kill');

    /** hunter */

    // id вынесен в переменную на случай преждевременного удаления цели у игрока
    let id = user.contract.id;

    TARGET.users.forEach(hunter => {

        if (hunter.contract && hunter.contract.id === id) {

            // удаление всех контрактов на цель
            hunter.contract = undefined;

            // оповещение охотника о проваленном контракте
            if (hunter.id !== user.id) ALERT.send(hunter.ws, 'fail');

        }

    });

    CONTRACT.pause = false;

};

CONTRACT.miss = (user, bot) => {

    CONTRACT.pause = true;

    /** target */

    // проверка на наличие контракта
    if (user.contract) {

        // уменьшение количества охотников за целью
        user.contract.hunter--;

        // сброс идентификатора последнего контракта
        user.contract.last = undefined;

        // удаление контракта на цель
        user.contract = undefined;

    }

    /** user */

    // оповещение игрока о промахе по цели или охотнику
    ALERT.send(user.ws, 'miss');

    /** bot */

    // респаун бота
    bot.x = TARGET.generateX();
    bot.y = TARGET.generateY();

    CONTRACT.pause = false;

};

CONTRACT.stun = (user, hunter) => {

    CONTRACT.pause = true;

    if (!ACTION) ACTION = require('./action');

    /** user */

    // уменьшение количества охотников за игроком
    user.hunter--;

    // обнуление последней цели
    user.last = undefined;

    // обновление показателей игрока
    user.stun++;
    user.score += CONTRACT.score.stun;

    // оповещение об оглушении охотника
    ALERT.send(user.ws, 'stun');

    /** hunter */

    // удаление контракта на игрока
    hunter.contract = undefined;

    // удаление у охотника действия
    ACTION.removeByUser(hunter);

    // штраф за обнаружение
    if (hunter.score >= CONTRACT.score.stunned) hunter.score -= CONTRACT.score.stunned;

    // оповещение об оглушенности целью
    ALERT.send(hunter.ws, 'stunned');

    CONTRACT.pause = false;

};

setInterval(() => {

    if (!CONTRACT.pause && TARGET.users.length > 1) {

        TARGET.users = TARGET.users.sort((a, b) => b.score - a.score);

        TARGET.users.forEach(user => {

            // фикс бага с отрицательным значением охотников
            if (user.hunter < 0) user.hunter = 0;

            // проверка на необходимость поиска контракта
            if (!user.contract && ['stand', 'walk', 'run', 'kill', 'stun'].includes(user.action)) {

                for (let hunter = 0; hunter < 4; hunter++) {

                    // выдача контракта при отсутствии

                    if (!user.contract) {

                        let targets = TARGET.users;

                        // исключение самого себя
                        targets = targets.filter(target => target.id !== user.id);

                        // исключение последней цели
                        targets = targets.filter(target => target.id !== user.last);

                        // минимальное количество охотников за целью
                        targets = targets.filter(target => target.hunter === hunter);

                        // исключение охотников за игроком
                        targets = targets.filter(target => !target.contract || target.contract.id !== user.id);

                        user.contract = targets[0];

                    }

                    // если контракт был найден

                    if (user.contract) {

                        // устанавливаем данную цель последней
                        user.last = user.contract.id;

                        // у цели увеличиваем количество охотников
                        user.contract.hunter++;

                        break;

                    }

                }

            }

        });

    }

}, CONTRACT.ms);

module.exports = CONTRACT;