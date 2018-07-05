window.LAYER = {

    init: callback => {

        LAYER.building = {};

        LAYER.world = new PIXI.Container();
        LAYER.background    = LAYER.world.addChild(new PIXI.Container());
        LAYER.road          = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.down = LAYER.world.addChild(new PIXI.Container());
        LAYER.target        = LAYER.world.addChild(new PIXI.Container());
        LAYER.building.up   = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker        = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(-10000 - 125);
        LAYER.world.y = CAMERA.getY(-10000 - 625 + 22);

        BACKGROUND.init(() => {
            ROAD.init(() => {
                BUILDING.init(() => {

                    // сортировка целей по Y
                    GAME.application.ticker.add(() => {

                        LAYER.target.children.sort((a, b) => {return a.y > b.y ? 1 : (b.y > a.y ? -1 : 0)});

                    });

                    // прозрачность крыш
                    GAME.application.ticker.add(() => {

                        if (USER.target) LAYER.building.up.children.forEach(roof => {

                            roof.alpha = USER.target.sprite.y < roof.y && TOOL.getDistance({
                                x: roof.x + 125,
                                y: roof.y
                            }, USER.target.sprite) < 750 ? 0.4 : 1;

                        });

                    });

                    // добавление слоёв в отрисовщик
                    GAME.application.stage.addChild(LAYER.world);
                    GAME.application.stage.addChild(LAYER.hud);

                    callback();

                });
            });
        });

    }

};