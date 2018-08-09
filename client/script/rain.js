window.RAIN = {

    sync: () => {

        let power = WS.data.rain ? WS.data.rain.power : 0.1;
        let wind = WS.data.rain ? WS.data.rain.wind : 0;
        let count = Math.floor(
            (window.innerWidth / CAMERA.scale) *
            (window.innerHeight / CAMERA.scale) / 1000 * power
        );

        while (LAYER.rain.children.length !== count) {

            if (LAYER.rain.children.length < count) {

                let rain = new PIXI.Sprite(TEXTURE.rain.get(wind));

                LAYER.rain.addChild(rain);

            }

            if (LAYER.rain.children.length > count) {

                let rain = LAYER.rain.children[0];

                if (rain) {

                    LAYER.rain.removeChild(rain);
                    rain.destroy();

                }

            }

        }

        let boundary = CAMERA.getBoundary();

        boundary.x1 -= 16;
        boundary.y1 -= 16;
        boundary.x2 += 16;
        boundary.y2 += 16;

        LAYER.rain.children.forEach(drop => {

            let x = TOOL.getRandomInt(boundary.x1, boundary.x2);
            let y = TOOL.getRandomInt(boundary.y1, boundary.y2);

            drop.texture = TEXTURE.rain.get(wind);
            drop.position.set(x, y);
            drop.alpha = TOOL.getRandomInt(2, 6) / 10;

        });

    }

};