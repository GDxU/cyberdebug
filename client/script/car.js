window.CAR = {

    store: [],

    // init: () => {},

    get: id => CAR.store.filter(car => car.id === id)[0],

    append: c => {

        let car = {
            id: c.id,
            model: c.model,
            side: c.side,
            sprite: new PIXI.Sprite(TEXTURE.car.get(c.model, c.side))
        };

        // car.sprite.class = 'CAR';
        // car.sprite.data = car;
        car.sprite.anchor.set(0, 1);
        car.sprite.x = c.x;
        car.sprite.y = c.y;

        CAR.store.push(car);
        LAYER.car.addChild(car.sprite);

    },

    update: c => {

        let car = CAR.get(c.id);

        if (car) {

            car.sprite.x = c.x;
            car.sprite.y = c.y;

        }

    },

    remove: id => {

        let car = CAR.get(id);

        if (car) {

            LAYER.car.removeChild(car.sprite);
            car.sprite.destroy();

            CAR.store.splice(CAR.store.indexOf(car), 1);

        }

    },

    sync: () => {

        if (WS.data.cars) {

            let ids = [];

            CAR.store.forEach(car => {

                if (!WS.data.cars.filter(c => c.id === car.id)[0]) ids.push(car.id);

            });

            ids.forEach(id => CAR.remove(id));

            WS.data.cars.forEach(c => CAR.get(c.id) ? CAR.update(c) : CAR.append(c));

        }

    }

};