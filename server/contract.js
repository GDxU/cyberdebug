let TARGET = require('./target');

let CONTRACT = {};

CONTRACT.pause = false;
CONTRACT.tr = 1;
CONTRACT.ms = 1000 / CONTRACT.tr;
CONTRACT.store = [];

CONTRACT.remove = (ws) => {

    CONTRACT.pause = true;

    // поиск жертвы у вышедшего пользователя

    if (ws.user.contract) ws.user.contract.hunter--;

    TARGET.users.forEach(user => {

        // поиск контрактов на вышедшего пользователя

        if (
            user.contract &&
            user.contract.id === ws.user.id
        ) user.contract = undefined;

    });

    CONTRACT.pause = false;

};

setInterval(() => {

    if (!CONTRACT.pause && TARGET.users.length > 1) {

        TARGET.users = TARGET.users.sort((a, b) => b.score - a.score);

        TARGET.users.forEach(user => {

            if (!user.contract) {

                for (let hunter = 0; hunter < 4; hunter++) {

                    user.contract = TARGET.users.filter(target =>
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