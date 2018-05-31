window.LAYER = {

    // main
    // ├ hud
    // └ world
    //   ├ marker
    //   ├ target
    //   └ background

    hud: undefined,
    world: undefined,
    marker: undefined,
    target: undefined,
    background: undefined,

    init: () => {

        LAYER.initWorld();
        LAYER.initBackground();
        LAYER.initTarget();
        LAYER.initMarker();
        LAYER.initHUD();

    },

    initHUD: () => {

        LAYER.hud = new PIXI.Container();

        GAME.application.stage.addChild(LAYER.hud);

    },

    initWorld: () => {

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

        GAME.application.stage.addChild(LAYER.world);

    },

    initMarker: () => {

        LAYER.marker = new PIXI.Container();

        LAYER.world.addChild(LAYER.marker);

    },

    initTarget: () => {

        LAYER.target = new PIXI.Container();

        LAYER.world.addChild(LAYER.target);

        // сортировка целей по Y
        GAME.application.ticker.add(() => {

            LAYER.target.children.sort((a, b) => a.y > b.y ? 1 : (b.y > a.y ? -1 : 0));

        });

    },

    initBackground: () => {

        /*

        LAYER.background = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.tile.texture,
            20000,
            20000
        );

        LAYER.world.addChild(LAYER.background);

        */

        LAYER.background = new PIXI.Container();

        // отрисовка по рядам для правильного порядка наложения

        for (let y = 0; y < 20000 / 250; y++) {

            for (let x = 0; x < 20000 / 500 * 2 - 1; x++) {

                if (y * 250 + (x % 2 ? 125 : 0) < 20000 - 125) {

                    let sprite = new PIXI.Sprite(PIXI.loader.resources.background.texture);

                    sprite.x = x * 250;
                    sprite.y = y * 250 + (x % 2 ? 125 : 0);

                    LAYER.background.addChild(sprite);

                }

            }

        }

        LAYER.world.addChild(LAYER.background);

    }

};