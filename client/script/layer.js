window.LAYER = {

    // main
    // ├ hud
    // └ world
    //   ├ marker
    //   ├ target
    //   ├ road
    //   └ background

    hud: undefined,
    world: undefined,
    marker: undefined,
    target: undefined,
    background: undefined,

    init: (callback) => {

        // 1.
        LAYER.initWorld(() => {

            // 1.1.
            LAYER.initBackground(() => {

                // 1.2.
                LAYER.initRoad(() => {

                    // 1.3.
                    LAYER.initTarget(() => {

                        // 1.4.
                        LAYER.initMarker(() => {

                            // 2.
                            LAYER.initHUD(() => {

                                GAME.application.stage.addChild(LAYER.world);
                                GAME.application.stage.addChild(LAYER.hud);

                                callback();

                            });

                        });

                    });

                });

            });

        });

    },

    initWorld: (callback) => {

        LAYER.world = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(- 10000);
        LAYER.world.y = CAMERA.getY(- 10000);

        LAYER.world.interactive = true;

        LAYER.world.on('pointerdown', e => {

            let message = undefined;

            if (e.target.target && (USER.hunter || USER.contract)) {

                let id = e.target.target.id;

                ACTION.follow(id);
                message = JSON.stringify({action: {id: id}});

            } else {

                let point = {
                    x: Math.floor(e.data.global.x - LAYER.world.x),
                    y: Math.floor(e.data.global.y - LAYER.world.y)
                };

                ACTION.goto(point);
                message = JSON.stringify({action: point});

            }

            if (WS.client.readyState === WebSocket.OPEN) {

                WS.client.send(message);
                console.log('WS send ' + message);

            }

        });

        LAYER.world.on('mousemove', e => {

            LAYER.world.mouse = {
                x: e.data.global.x - LAYER.world.x,
                y: e.data.global.y - LAYER.world.y
            };

        });

        callback();

    },

    initBackground: (callback) => {

        // 480
        let width = PIXI.loader.resources.background.texture.width;

        // 241
        let height = PIXI.loader.resources.background.texture.height;

        let style = {
            fontFamily: 'EuropeExt Normal',
            fontSize: 12,
            fill: '#ffffff'
        };

        LAYER.background = new PIXI.Container();

        for (let y = 0; y < 20000 / (height - 1); y++) {

            for (let x = 0; x < 20000 / width * 2; x++) {

                let tile = new PIXI.Sprite(PIXI.loader.resources.background.texture);

                tile.anchor.set(0, 1);
                tile.position.set(x * (height - 1), y * (height - 1) + (x % 2 ? Math.floor((height - 1) / 2) : 0));

                LAYER.background.addChild(tile);

                let info = new PIXI.Text(tile.x + ', ' + tile.y, style);

                info.anchor.set(0, 1);
                info.position.set(tile.x + 125, tile.y - 65);

                LAYER.background.addChild(info);

            }

        }

        LAYER.world.addChild(LAYER.background);

        callback();

    },

    initRoad: (callback) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/server/road.json', true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                LAYER.road = new PIXI.Container();

                JSON.parse(xhr.responseText).forEach(road => {

                    let sprite = new PIXI.Sprite(TEXTURE[road.t]);

                    sprite.anchor.set(0, 1);
                    sprite.position.set(road.x, road.y);

                    LAYER.road.addChild(sprite);

                });

                LAYER.world.addChild(LAYER.road);

                callback();

            }

        };

        xhr.send();

    },

    initTarget: (callback) => {

        LAYER.target = new PIXI.Container();

        LAYER.world.addChild(LAYER.target);

        // сортировка целей по Y
        GAME.application.ticker.add(() => {

            LAYER.target.children.sort((a, b) => a.y > b.y ? 1 : (b.y > a.y ? -1 : 0));

        });

        callback();

    },

    initMarker: (callback) => {

        LAYER.marker = new PIXI.Container();

        LAYER.world.addChild(LAYER.marker);

        callback();

    },

    initHUD: (callback) => {

        LAYER.hud = new PIXI.Container();

        callback();

    }

};