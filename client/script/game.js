window.GAME = {

    application: undefined,

    world: undefined,

    background: undefined,
    target: undefined,
    marker: undefined,

    init: () => {

        GAME.initApplication();

        GAME.initWorld();

        GAME.initBackground();
        GAME.initTarget();
        GAME.initMarker();

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

    initBackground: () => {

        GAME.background = new PIXI.extras.TilingSprite(
            LOADER.loader.resources.tile.texture,
            20000,
            20000
        );

        GAME.world.addChild(GAME.background);

    },

    initTarget: () => {

        GAME.target = new PIXI.Container();
        GAME.world.addChild(GAME.target);

    },

    initMarker: () => {

        GAME.marker = new PIXI.Container();
        GAME.world.addChild(GAME.marker);

    }

};