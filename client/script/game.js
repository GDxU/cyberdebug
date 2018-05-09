window.GAME = {

    // application
    // ├ hud
    // └ world
    //   ├ marker
    //   ├ target
    //   └ background

    application: undefined,

    hud: undefined,
    world: undefined,

    marker: undefined,
    target: undefined,
    background: undefined,

    init: () => {

        GAME.initApplication();

        GAME.initWorld();

        GAME.initBackground();
        GAME.initTarget();
        GAME.initMarker();
        GAME.initHUD();

    },

    initApplication: () => {

        PIXI.utils.skipHello();
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

        GAME.application = new PIXI.Application(window.innerWidth, window.innerHeight, {
            transparent: true
        });

        GAME.application.renderer.roundPixels = true;
        GAME.application.renderer.autoResize = true;
        GAME.application.renderer.plugins.interaction.cursorStyles.default = "url('/client/image/cursor/default.png') 11 11, auto";
        GAME.application.renderer.plugins.interaction.cursorStyles.hover = "url('/client/image/cursor/pointer.png') 11 11, auto";

        document.body.appendChild(GAME.application.view);
        window.addEventListener('resize', function () {
            GAME.application.renderer.resize(window.innerWidth, window.innerHeight);
        });

    },

    initHUD: () => {

        GAME.hud = new PIXI.Container();
        GAME.application.stage.addChild(GAME.hud);

    },

    initWorld: () => {

        GAME.world = new PIXI.Container();

        GAME.world.interactive = true;

        GAME.world.on('pointerdown', e => {

            let message = undefined;

            if (e.target.target) {

                message = JSON.stringify({
                    action: {
                        id: e.target.target.id
                    }
                });

            } else {

                let x = Math.floor(e.data.global.x - GAME.world.x);
                let y = Math.floor(e.data.global.y - GAME.world.y);

                message = JSON.stringify({
                    action: {
                        x: x,
                        y: y
                    }
                });

                ACTION.pin.x = x;
                ACTION.pin.y = y;

            }

            WS.client.send(message);

            console.log('WS send ' + message);

        });

        GAME.application.stage.addChild(GAME.world);

    },

    initMarker: () => {

        GAME.marker = new PIXI.Container();
        GAME.world.addChild(GAME.marker);

    },

    initTarget: () => {

        GAME.target = new PIXI.Container();
        GAME.world.addChild(GAME.target);

    },

    initBackground: () => {

        GAME.background = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.tile.texture,
            20000,
            20000
        );

        GAME.world.addChild(GAME.background);

    }

};