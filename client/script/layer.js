window.LAYER = {

    init: callback => {

        LAYER.building = {};

        LAYER.world = new PIXI.Container();
        LAYER.road          = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.down = LAYER.world.addChild(new PIXI.Container());
        LAYER.target        = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.up   = LAYER.world.addChild(new PIXI.Container());
        LAYER.collision     = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker        = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(-12375);
        LAYER.world.y = CAMERA.getY(-13125);

        ROAD.init(() => {
            BUILDING.init(() => {

                TARGET.init();
                COLLISION.init();

                // добавление слоёв в отрисовщик
                GAME.application.stage.addChild(LAYER.world);
                GAME.application.stage.addChild(LAYER.hud);

                callback();

            });
        });

    }

};