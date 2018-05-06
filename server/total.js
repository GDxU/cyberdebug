let TARGET = require('./target');

let TOTAL = {};

TOTAL.get = () => {

    let totals = [];

    TARGET.users.forEach(user => {

        totals.push({
            id: user.id,
            name: user.name,
            kill: user.kill,
            stun: user.stun,
            die: user.die,
            score: user.score,
            contract: user.contract ? {
                id: user.contract.id,
                name: user.contract.name,
                model: user.contract.model,
                hunter: user.contract.hunter
            } : undefined,
            hunter: user.hunter
        });

    });

    return totals.sort((a, b) => b.score - a.score).splice(0, 10);

};

module.exports = TOTAL;