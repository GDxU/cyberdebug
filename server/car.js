let CAR = {};

CAR.id = 1;
CAR.model = 0;
CAR.store = [];

CAR.append = data => {

    data = data || {};

    let car = {
        id: 'c' + (CAR.id++).toString(36),
        model: CAR.model++,
        side: data.side,
        x: data.x,
        y: data.y,
        speed: TOOL.getRandomInt(1, 4)
    };

    CAR.store.push(car);

    return car;

};

CAR.init = () => {



};

module.exports = CAR;