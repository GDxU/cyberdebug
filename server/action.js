let CONTRACT = require('./contract');
let TARGET = require('./target');
let TOOL = require('./tool');

let ACTION = {};

ACTION.pause = false;
ACTION.tr = 40;
ACTION.ms = 1000 / ACTION.tr;
ACTION.store = [];
ACTION.range = {
    kill: 43,
    stun: 54,
    miss: 54,
};

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

ACTION.move = (a, b, s) => {

    if (['stand', 'walk', 'run'].includes(a.action)) {

        let x = a.x;
        let y = a.y;

        TOOL.move(a, b, s);

        if (x === a.x || y === a.y) a.action = 'stand';
        else a.action = s === 2 ? 'walk' : 'run';

        if (x === a.x && y > a.y) a.side = 'n';
        if (x === a.x && y < a.y) a.side = 's';

        if (x > a.x && y === a.y) a.side = 'w';
        if (x < a.x && y === a.y) a.side = 'e';

        if (x < a.x && y > a.y) a.side = 'ne';
        if (x < a.x && y < a.y) a.side = 'se';

        if (x > a.x && y > a.y) a.side = 'nw';
        if (x > a.x && y < a.y) a.side = 'sw';

    }

};

ACTION.removeByUser = user => {

    let actions = ACTION.store.filter(action => action.user === user);

    if (actions.length === 1) ACTION.remove(actions[0]);

    if (actions.length > 1) console.log('ACTION error');

};

ACTION.remove = action => {

    let i = ACTION.store.indexOf(action);

    if (i > -1) ACTION.store.splice(i, 1);

};

setInterval(() => {

    if (!ACTION.pause) ACTION.store.forEach(action => {

        if (action.target) {

            // проверка на игрока или бота
            if (typeof action.target.name === 'string') {

                // проверка на наличие цели, и правильность выбранной цели для убийства
                if (action.user.contract && action.user.contract.id === action.target.id) {

                    // проверка на необходимость подойти для убийства
                    if (TOOL.getDistance(action.user, action.target) <= ACTION.range.kill) {

                        CONTRACT.kill(action.user);
                        ACTION.remove(action);

                    } else ACTION.move(action.user, action.target, action.user.speed);

                }

                // проверка на охотника, и правильность выбранного охотника для оглушения
                if (action.target.contract && action.target.contract.id === action.user.id) {

                    // проверка на необходимость подойти для оглушения
                    if (TOOL.getDistance(action.user, action.target) < ACTION.range.stun) {

                        CONTRACT.stun(action.user, action.target);
                        ACTION.remove(action);

                    } else ACTION.move(action.user, action.target, action.user.speed);

                }

            } else {

                // проверка на наличие охотника или контракта
                if (action.user.hunter || action.user.contract) {

                    // проверка на необходимость подойти для промаха
                    if (TOOL.getDistance(action.user, action.target) < ACTION.range.miss) {

                        CONTRACT.miss(action.user, action.target);
                        ACTION.remove(action);

                    } else ACTION.move(action.user, action.target, action.user.speed);

                }

            }

        } else {

            ACTION.move(action.user, action, action.user.speed);

            if (
                action.user.x === action.x &&
                action.user.y === action.y
            ) ACTION.remove(action);

        }

    });

}, ACTION.ms);

module.exports = ACTION;