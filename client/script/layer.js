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

        LAYER.background = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.tile.texture,
            20000,
            20000
        );

        LAYER.world.addChild(LAYER.background);

    }

};