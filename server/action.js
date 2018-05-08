let CONTRACT = require('./contract');
let TARGET = require('./target');
let TOOL = require('./tool');

let ACTION = {};

ACTION.pause = false;
ACTION.tr = 40;
ACTION.ms = 1000 / ACTION.tr;
ACTION.store = [];

ACTION.sync = (ws, data) => {

    // проверка на наличие действия
    if (data.action) {

        ACTION.pause = true;

        if (data.action.id) {

            // валидация действия убийства/оглушения
            data.action.target = TARGET.get(data.action.id);

        } else {

            // валидация действия передвижения
            data.action.x = parseInt(data.action.x);
            data.action.y = parseInt(data.action.y);

        }

        // проверка на необходимость синхронизации действия
        if (data.action.target || (!isNaN(data.action.x) && !isNaN(data.action.y))) {

            // поиск уже существующего действия
            let action = ACTION.store.filter(action => action.user.id === ws.user.id)[0];

            // при отсутствии действия инициализируем новое
            if (!action) {

                action = {
                    user: ws.user
                };

                ACTION.store.push(action);

            }

            // установка действия убийства/оглушения или передвижения
            if (data.action.target) {

                action.target = data.action.target;

                delete action.x;
                delete action.y;

            } else {

                delete action.target;

                action.x = data.action.x;
                action.y = data.action.y;

            }

        } else console.log('ACTION not correct');

        ACTION.pause = false;

    }

};

setInterval(() => {

    if (!ACTION.pause) ACTION.store.forEach(action => {

        if (action.target) {

            // проверка на игрока или бота
            if (typeof action.target.name === 'string') {

                // проверка на наличие цели, и правильность выбранной цели для убийства
                if (action.user.contract && action.user.contract.id === action.target.id) {

                    // проверка на необходимость подойти для убийства
                    if (TOOL.getDistance(action.user, action.target) < 100) {

                        CONTRACT.kill(action.user);
                        ACTION.store.splice(ACTION.store.indexOf(action), 1);

                    } else TOOL.move(action.user, action.target, action.user.speed);

                }

                // проверка на охотника, и правильность выбранного охотника для оглушения
                if (action.target.contract && action.target.contract.id === action.user.id) {

                    // проверка на необходимость подойти для оглушения
                    if (TOOL.getDistance(action.user, action.target) < 150) {

                        CONTRACT.stun(action.user, action.target);
                        ACTION.store.splice(ACTION.store.indexOf(action), 1);

                    } else TOOL.move(action.user, action.target, action.user.speed);

                }

            } else {

                // проверка на наличие охотника или контракта
                if (action.user.hunter || action.user.contract) {

                    // проверка на необходимость подойти для промаха
                    if (TOOL.getDistance(action.user, action.target) < 150) {

                        CONTRACT.miss(action.user, action.target);
                        ACTION.store.splice(ACTION.store.indexOf(action), 1);

                    } else TOOL.move(action.user, action.target, action.user.speed);

                }

            }

        } else {

            TOOL.move(action.user, action, action.user.speed);

            if (
                action.user.x === action.x &&
                action.user.y === action.y
            ) ACTION.store.splice(ACTION.store.indexOf(action), 1);

        }

    });

}, ACTION.ms);

module.exports = ACTION;