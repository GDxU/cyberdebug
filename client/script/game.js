window.GAME = {

    application: undefined,
    world: undefined,

    init: () => {

        GAME.initApplication();
        GAME.initWorld();

    },

    initApplication: () => {

        PIXI.utils.skipHello();
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

        GAME.application = new PIXI.Application(window.innerWidth, window.innerHeight, {
            transparent: true
        });

        GAME.application.renderer.roundPixels = true;
        GAME.application.renderer.autoResize = true;

        document.body.appendChild(GAME.application.view);
        window.addEventListener('resize', function () {
            GAME.application.renderer.resize(window.innerWidth, window.innerHeight);
        });

    },

    initWorld: () => {

        GAME.world = new PIXI.Container();

        GAME.world.interactive = true;

        GAME.world.on('pointerdown', e => {

            let x = Math.floor(e.data.global.x - GAME.world.x);
            let y = Math.floor(e.data.global.y - GAME.world.y);

            let message = JSON.stringify({
                action: {
                    x: x,
                    y: y
                }
            });

            console.log('WS send ' + message);

            WS.client.send(message);

            ACTION.pin.x = x;
            ACTION.pin.y = y;

        });

        GAME.application.stage.addChild(GAME.world);

    }

};