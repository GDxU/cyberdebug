window.LAYER = {

    init: callback => {

        LAYER.world = new PIXI.Container();
        if (CONFIG.debug) LAYER.bottom = LAYER.world.addChild(new PIXI.Container());
        LAYER.road              = LAYER.world.addChild(new PIXI.Container());
        LAYER.object            = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker            = LAYER.world.addChild(new PIXI.Container());
        if (CONFIG.debug) LAYER.top    = LAYER.world.addChild(new PIXI.Container());
        if (CONFIG.debug) LAYER.info   = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.initWorld(() => {
            LAYER.initBackground(() => {
                LAYER.initRoad(() => {
                    LAYER.initBuilding(() => {

                        // сортировка целей по Y
                        GAME.application.ticker.add(() => {

                            LAYER.object.children.sort((a, b) => a.y > b.y ? 1 : (b.y > a.y ? -1 : 0));

                        });

                        // добавление слоёв в отрисовщик
                        GAME.application.stage.addChild(LAYER.world);
                        GAME.application.stage.addChild(LAYER.hud);

                        callback();

                    });
                });
            });
        });

    },

    initWorld: callback => {

        LAYER.world.x = CAMERA.getX(- 10000);
        LAYER.world.y = CAMERA.getY(- 10000);

        callback();

    },

    initBackground: callback => {

        if (CONFIG.debug) {

            let width = 480;
            let height = 241;
            let style = {
                fontFamily: 'EuropeExt Normal',
                fontSize: 12,
                fill: '#ffffff'
            };

            LAYER.top.alpha = 0.1;

            for (let y = 0; y < 20000 / (height - 1); y++) {

                for (let x = 0; x < 20000 / width * 2; x++) {

                    let X = x * (height - 1);
                    let Y = y * (height - 1) + (x % 2 ? Math.floor((height - 1) / 2) : 0);

                    // bottom

                    let bottom = new PIXI.Sprite(TEXTURE['background_bottom']);

                    bottom.anchor.set(0, 1);
                    bottom.position.set(X, Y);

                    LAYER.bottom.addChild(bottom);

                    // up

                    let top = new PIXI.Sprite(TEXTURE['background_top']);

                    top.anchor.set(0, 1);
                    top.position.set(X, Y);

                    LAYER.top.addChild(top);

                    // info

                    let info = new PIXI.Text(X + ', ' + Y, style);

                    info.anchor.set(0.5, 0);
                    info.position.set(X + 240, Y - 120);

                    LAYER.info.addChild(info);

                }

            }

        }

        callback();

    },

    initRoad: callback => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/data/road.json', true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                let style = {
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#aaaaaa'
                };

                let groups = JSON.parse(xhr.responseText);

                Object.keys(groups).forEach(group => {

                    groups[group].forEach(tile => {

                        let sprite = new PIXI.Sprite(TEXTURE[tile.t]);

                        sprite.anchor.set(0, 1);
                        sprite.position.set(tile.x, tile.y);

                        LAYER.road.addChild(sprite);

                        if (CONFIG.debug) {

                            let info = new PIXI.Text(tile.t, style);

                            info.anchor.set(0.5, 0);
                            info.position.set(tile.x + 240, tile.y - 140);

                            LAYER.info.addChild(info);

                        }

                    });

                });

                callback();

            }

        };

        xhr.send();

    },

    initBuilding: callback => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/data/building.json', true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                let style = {
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#aaaaaa'
                };

                let groups = JSON.parse(xhr.responseText);

                Object.keys(groups).forEach(group => {

                    groups[group].forEach(tile => {

                        let sprite = new PIXI.Sprite(TEXTURE[tile.t]);

                        sprite.anchor.set(0, 1);
                        sprite.position.set(tile.x, tile.y);

                        LAYER.object.addChild(sprite);

                        if (CONFIG.debug) {

                            let info = new PIXI.Text(tile.t, style);

                            info.anchor.set(0.5, 0);
                            info.position.set(tile.x + 240, tile.y - 140);

                            LAYER.info.addChild(info);

                        }

                    });

                });

                callback();

            }

        };

        xhr.send();

    }

};