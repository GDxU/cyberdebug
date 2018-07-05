window.LAYER = {

    init: callback => {

        LAYER.world = new PIXI.Container();
        LAYER.background             = LAYER.world.addChild(new PIXI.Container());
        LAYER.road                   = LAYER.world.addChild(new PIXI.Container());
        LAYER.target                 = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker                 = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(- 10000);
        LAYER.world.y = CAMERA.getY(- 10000 + 22);

        BACKGROUND.init(() => {
            ROAD.init(() => {
                BUILDING.init(() => {

                    // сортировка целей по Y
                    GAME.application.ticker.add(() => {

                        LAYER.target.children.sort((a, b) => {return a.y > b.y ? 1 : (b.y > a.y ? -1 : 0)});

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