window.LAYER = {

    init: callback => {

        LAYER.building = {};

        LAYER.world = new PIXI.Container();
        LAYER.road          = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.down = LAYER.world.addChild(new PIXI.Container());
        LAYER.car           = LAYER.world.addChild(new PIXI.Container());
        LAYER.target        = LAYER.world.addChild(new PIXI.Container());
        LAYER.traffic       = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.up   = LAYER.world.addChild(new PIXI.Container());
        LAYER.collision     = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker        = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(- Math.floor(CONFIG.world.width / 2));
        LAYER.world.y = CAMERA.getY(- Math.floor(CONFIG.world.height / 2));

        ROAD.init(() => {
            BUILDING.init(() => {

                // CAR.init();
                TARGET.init();
                COLLISION.init();
                TRAFFIC.init();

                // добавление слоёв в отрисовщик
                GAME.application.stage.addChild(LAYER.world);
                GAME.application.stage.addChild(LAYER.hud);

                callback();

            });
        });

    }

};