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

    // уменьшение количества охотников за целью (если цель была)
    if (user.contract) user.contract.hunter--;

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

    // респаун цели
    user.contract.x = TARGET.generateX();
    user.contract.y = TARGET.generateY();

    // id вынесен в переменную на случай преждевременного удаления цели у игрока
    let id = user.contract.id;

    TARGET.users.forEach(hunter => {

        if (hunter.contract && hunter.contract.id === id) {

            // удаление всех контрактов на цель
            hunter.contract = undefined;

            // оповещение охотника о проваленном контракте
            ALERT.send(hunter.ws, 'fail');

        }

    });

    // обновление показателей игрока
    user.kill++;
    user.score += CONTRACT.score.kill;

    // оповещение игрока о выполненном контракте
    ALERT.send(user.ws, 'kill');

    CONTRACT.pause = false;

};

CONTRACT.miss = (user, bot) => {

    CONTRACT.pause = true;

    // проверка на наличие контракта
    if (user.contract) {

        // уменьшение количества охотников за целью
        user.contract.hunter--;

        // сброс идентификатора последнего контракта
        user.contract.last = undefined;

        // удаление контракта на цель
        user.contract = undefined;

    }

    // оповещение игрока о промахе по цели или охотнику
    ALERT.send(user.ws, 'miss');

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

    // штраф за обнаружение
    if (hunter.score >= CONTRACT.score.stunned) hunter.score -= CONTRACT.score.stunned;

    // оповещение об оглушенности целью
    ALERT.send(hunter.ws, 'stunned');

    // обновление показателей игрока
    user.stun++;
    user.score += CONTRACT.score.stun;

    // оповещение об оглушении охотника
    ALERT.send(user.ws, 'stun');

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