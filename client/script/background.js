window.BACKGROUND = {

    init: () => {

        BACKGROUND.initBackground();
        BACKGROUND.initBoxSpawn();
        BACKGROUND.initBoxCamera();

    },

    initBackground: () => {

        BACKGROUND.background = new PIXI.extras.TilingSprite(
            LOADER.loader.resources.tile.texture,
            20000,
            20000
        );

        GAME.world.addChild(BACKGROUND.background);

    },

    initBoxSpawn: () => {

        BACKGROUND.spawn = new PIXI.Sprite(LOADER.loader.resources.spawn.texture);

        BACKGROUND.spawn.x = 10000 - 400;
        BACKGROUND.spawn.y = 10000 - 400;

        GAME.world.addChild(BACKGROUND.spawn);

    },

    initBoxCamera: () => {

        BACKGROUND.camera = new PIXI.Sprite(LOADER.loader.resources.camera.texture);

        BACKGROUND.camera.x = Math.floor(window.innerWidth / 2) - 100;
        BACKGROUND.camera.y = Math.floor(window.innerHeight / 2) - 100;

        GAME.application.stage.addChild(BACKGROUND.camera);

    }

};