window.LAYER = {

    init: (callback) => {

        LAYER.world = new PIXI.Container();
        if (DEBUG) LAYER.bgdown = LAYER.world.addChild(new PIXI.Container());
        LAYER.road              = LAYER.world.addChild(new PIXI.Container());
        LAYER.target            = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker            = LAYER.world.addChild(new PIXI.Container());
        if (DEBUG) LAYER.bgup   = LAYER.world.addChild(new PIXI.Container());
        if (DEBUG) LAYER.bginfo = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.initWorld(() => {
            LAYER.initBackground(() => {
                LAYER.initRoad(() => {

                    // сортировка целей по Y
                    GAME.application.ticker.add(() => {

                        LAYER.target.children.sort((a, b) => a.y > b.y ? 1 : (b.y > a.y ? -1 : 0));

                    });

                    // добавление слоёв в отрисовщик
                    GAME.application.stage.addChild(LAYER.world);
                    GAME.application.stage.addChild(LAYER.hud);

                    callback();

                });
            });
        });

    },

    initWorld: (callback) => {

        LAYER.world.x = CAMERA.getX(- 10000);
        LAYER.world.y = CAMERA.getY(- 10000);

        callback();

    },

    initBackground: (callback) => {

        if (DEBUG) {

            let width = 480;
            let height = 241;
            let style = {
                fontFamily: 'EuropeExt Normal',
                fontSize: 12,
                fill: '#ffffff'
            };

            LAYER.bgup.alpha = 0.1;

            for (let y = 0; y < 20000 / (height - 1); y++) {

                for (let x = 0; x < 20000 / width * 2; x++) {

                    let X = x * (height - 1);
                    let Y = y * (height - 1) + (x % 2 ? Math.floor((height - 1) / 2) : 0);

                    // down

                    let down = new PIXI.Sprite(PIXI.loader.resources.bgdown.texture);

                    down.anchor.set(0, 1);
                    down.position.set(X, Y);

                    LAYER.bgdown.addChild(down);

                    // up

                    let up = new PIXI.Sprite(PIXI.loader.resources.bgup.texture);

                    up.anchor.set(0, 1);
                    up.position.set(X, Y);

                    LAYER.bgup.addChild(up);

                    // info

                    let info = new PIXI.Text(X + ', ' + Y, style);

                    info.anchor.set(0.5, 0);
                    info.position.set(X + 240, Y - 120);

                    LAYER.bginfo.addChild(info);

                }

            }

        }

        callback();

    },

    initRoad: (callback) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/server/road.json', true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                let style = {
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#aaaaaa'
                };

                let streets = JSON.parse(xhr.responseText);

                Object.keys(streets).forEach(street => {

                    streets[street].forEach(tile => {

                        let sprite = new PIXI.Sprite(TEXTURE[tile.t]);

                        sprite.anchor.set(0, 1);
                        sprite.position.set(tile.x, tile.y);

                        LAYER.road.addChild(sprite);

                        if (DEBUG) {

                            let info = new PIXI.Text(tile.t, style);

                            info.anchor.set(0.5, 0);
                            info.position.set(tile.x + 240, tile.y - 140);

                            LAYER.bginfo.addChild(info);

                        }

                    });

                });

                callback();

            }

        };

        xhr.send();

    }

};