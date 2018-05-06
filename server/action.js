let ACTION = {};

ACTION.speed = 5;
ACTION.tr = 40;
ACTION.ms = 1000 / ACTION.tr;
ACTION.store = [];

ACTION.sync = (ws, data) => {

    if (data.action) {

        let x = parseInt(data.action.x);
        let y = parseInt(data.action.y);

        if (!isNaN(x) && !isNaN(y)) {

            let action = ACTION.store.filter(action => action.user.id === ws.user.id)[0];

            if (action) {

                action.x = x;
                action.y = y;

            } else {

                ACTION.store.push({
                    user: ws.user,
                    x: x,
                    y: y
                });

            }

        }

    }

};

setInterval(() => {

    ACTION.store.forEach(action => {

        if (typeof action.x === 'number' && typeof action.y === 'number') {

            if (action.user.x < action.x) action.user.x += ACTION.speed;
            if (action.user.x > action.x) action.user.x -= ACTION.speed;
            if (action.user.y < action.y) action.user.y += ACTION.speed;
            if (action.user.y > action.y) action.user.y -= ACTION.speed;

            if (Math.abs(action.user.x - action.x) < ACTION.speed) action.user.x = action.x;
            if (Math.abs(action.user.y - action.y) < ACTION.speed) action.user.y = action.y;

            if (
                action.user.x === action.x &&
                action.user.y === action.y
            ) ACTION.store.splice(ACTION.store.indexOf(action), 1);

        }

    });

}, ACTION.ms);

module.exports = ACTION;