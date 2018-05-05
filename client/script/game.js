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

        // spawn

        let spawn = new PIXI.Sprite(LOADER.loader.resources.spawn.texture);
        spawn.x = 10000 - 400;
        spawn.y = 10000 - 400;
        GAME.marker.addChild(spawn);

        // camera

        let camera = new PIXI.Sprite(LOADER.loader.resources.camera.texture);
        camera.x = Math.floor(window.innerWidth / 2) - 100;
        camera.y = Math.floor(window.innerHeight / 2) - 100;
        GAME.application.stage.addChild(camera);

    }

};