let RAIN = {};

RAIN.i = 0;

RAIN.start = () => {

    setInterval(() => {

        RAIN.i++;

    }, 1000);

};

RAIN.export = () => {

    return {

        power: Math.abs(Math.sin(RAIN.i / 100)),

        wind: [0, 1, 2, 3, 4, 3, 2, 1][RAIN.i % 8]

    };

};

module.exports = RAIN;