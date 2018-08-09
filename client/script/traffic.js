window.TRAFFIC = {

    X: [4125, 5625, 6875, 8250, 9625, 10875, 12375],
    Y: [4375, 5625, 6625, 7625, 8750, 9875, 10875, 11875, 13125],

    init: () => {

        for (let i = 0; i < TRAFFIC.X.length; i++) for (let j = 0; j < TRAFFIC.Y.length; j++) {

            let sprite = new PIXI.Sprite(TEXTURE.traffic.get('yellow'));

            sprite.anchor.set(0.5);
            sprite.position.set(TRAFFIC.X[i], TRAFFIC.Y[j]);

            LAYER.traffic.addChild(sprite);

        }

        GAME.application.ticker.add(() => {

            let boundary = CAMERA.getBoundary();

            boundary.x1 -= 13;
            boundary.y1 -= 13;
            boundary.x2 += 13;
            boundary.y2 += 13;

            LAYER.traffic.children.forEach(item => item.visible = (
                boundary.x1 <= item.x && item.x <= boundary.x2 &&
                boundary.y1 <= item.y && item.y <= boundary.y2
            ));

        });

    },

    sync: () => {

        if (WS.data.traffic) {

            LAYER.traffic.children.forEach(traffic => {

                traffic.texture = TEXTURE.traffic.get(WS.data.traffic);

            });

        }

    }

};