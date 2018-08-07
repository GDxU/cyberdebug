window.RAIN = {

    sync: () => {

        let power = WS.data.rain ? WS.data.rain.power : 0.1;
        let wind = WS.data.rain ? WS.data.rain.wind : 0;
        let count = Math.floor(window.innerWidth * window.innerHeight / 1000 * power);

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

        let dx = Math.floor(window.innerWidth / 2) + 100;
        let dy = Math.floor(window.innerHeight / 2) + 100;

        let cx = USER.target ? USER.target.sprite.x : Math.floor(CONFIG.world.width / 2);
        let cy = USER.target ? USER.target.sprite.y : Math.floor(CONFIG.world.height / 2);

        let x1 = cx - dx;
        let x2 = cx + dx;

        let y1 = cy - dy;
        let y2 = cy + dy;

        LAYER.rain.children.forEach(drop => {

            let x = TOOL.getRandomInt(x1, x2);
            let y = TOOL.getRandomInt(y1, y2);

            drop.texture = TEXTURE.rain.get(wind);
            drop.position.set(x, y);
            drop.alpha = TOOL.getRandomInt(2, 6) / 10;

        });

    }

};