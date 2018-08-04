let AI = require('./ai');
let CONFIG = require('./config');
let TOOL = require('./tool');

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
        // speed: TOOL.getRandomInt(5, 8)
        speed: TOOL.getRandomInt(500, 800) / 100
    };

    CAR.store.push(car);

    return car;

};

CAR.init = () => {

    let N = AI.car.way.N;
    let S = AI.car.way.S;
    let W = AI.car.way.W;
    let E = AI.car.way.E;

    let w = CONFIG.world.width;
    let h = CONFIG.world.height;

    for (let i = 0; i < 1000; i++) {

        switch (TOOL.getRandomInt(3)) {

            case 0: CAR.append({
                x: N[i % N.length],
                y: TOOL.getRandomInt(0, h),
                side: 'n'
            }); break;

            case 1: CAR.append({
                x: S[i % S.length],
                y: TOOL.getRandomInt(0, h),
                side: 's'
            }); break;

            case 2: CAR.append({
                x: TOOL.getRandomInt(0, w),
                y: W[i % W.length],
                side: 'w'
            }); break;

            case 3: CAR.append({
                x: TOOL.getRandomInt(0, w),
                y: E[i % E.length],
                side: 'e'
            }); break;

        }

    }

    /*

    for (let i = 0; i < N.length; i++) CAR.append({
        x: N[i],
        y: TOOL.getRandomInt(0, h),
        side: 'n'
    });

    for (let i = 0; i < S.length; i++) CAR.append({
        x: S[i],
        y: TOOL.getRandomInt(0, h),
        side: 's'
    });

    for (let i = 0; i < W.length; i++) CAR.append({
        x: TOOL.getRandomInt(0, w),
        y: W[i],
        side: 'w'
    });

    for (let i = 0; i < E.length; i++) CAR.append({
        x: TOOL.getRandomInt(0, w),
        y: E[i],
        side: 'e'
    });

    */

};

CAR.init();

CAR.export = ws => {

    let x = Math.floor(ws.camera.w / 2) + 100;
    let y = Math.floor(ws.camera.h / 2) + 100;

    let x1 = ws.user.x - x;
    let x2 = ws.user.x + x;
    let y1 = ws.user.y - y;
    let y2 = ws.user.y + y;

    let cars = [];
    let filter = c => x1 < c.x && c.x < x2 && y1 < c.y && c.y < y2;

    CAR.store.filter(filter).forEach(car => {

        cars.push({
            id: car.id,
            model: car.model,
            side: car.side,
            x: car.x,
            y: car.y
        });

    });

    return cars;

};

module.exports = CAR;