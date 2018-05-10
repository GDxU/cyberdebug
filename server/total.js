let TARGET = require('./target');

let TOTAL = {};

TOTAL.export = () => {

    let totals = [];

    TARGET.users.forEach(user => {

        totals.push({
            name: user.name,
            kill: user.kill,
            stun: user.stun,
            die: user.die,
            score: user.score
        });

    });

    return totals.sort((a, b) => b.score - a.score).splice(0, 10);

};

module.exports = TOTAL;