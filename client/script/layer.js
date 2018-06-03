window.LAYER = {

    init: callback => {

        LAYER.world = new PIXI.Container();
        LAYER.background             = LAYER.world.addChild(new PIXI.Container());
        LAYER.road                   = LAYER.world.addChild(new PIXI.Container());
        LAYER.object                 = LAYER.world.addChild(new PIXI.Container());
        LAYER.marker                 = LAYER.world.addChild(new PIXI.Container());
        if (CONFIG.debug) LAYER.top  = LAYER.world.addChild(new PIXI.Container());
        if (CONFIG.debug) LAYER.info = LAYER.world.addChild(new PIXI.Container());
        LAYER.hud = new PIXI.Container();

        LAYER.world.x = CAMERA.getX(- 10000);
        LAYER.world.y = CAMERA.getY(- 10022);

        BACKGROUND.init(() => {
            ROAD.init(() => {
                BUILDING.init(() => {

                    // сортировка целей по Y
                    GAME.application.ticker.add(() => {
                        LAYER.sortObjectLayer();
                        LAYER.updateBuildingAlpha();
                    });

                    // добавление слоёв в отрисовщик
                    GAME.application.stage.addChild(LAYER.world);
                    GAME.application.stage.addChild(LAYER.hud);

                    callback();

                });
            });
        });

    },

    isTargetOverBuilding: (target, building) => {

        return target.y > building.y ||

            TOOL.isPointInPoligon(target, [
                {x: building.x -   8, y: building.y      },
                {x: building.x -   8, y: building.y - 120},
                {x: building.x      , y: building.y - 120},
                {x: building.x + 239, y: building.y      }
            ]) ||

            TOOL.isPointInPoligon(target, [
                {x: building.x + 240, y: building.y      },
                {x: building.x + 479, y: building.y - 120},
                {x: building.x + 487, y: building.y - 120},
                {x: building.x + 487, y: building.y      }
            ]);

    },

    sortObjectLayer: () => {

        LAYER.object.children.sort((a, b) => {
            if (a.class === b.class) return a.y > b.y ? 1 : (b.y > a.y ? -1 : 0);
            else {

                if (a.class === 'TARGET') {

                    return LAYER.isTargetOverBuilding(a, b) ? 1 : -1;

                } else {

                    return LAYER.isTargetOverBuilding(b, a) ? -1 : 1;

                }

            }
        });

    },

    updateBuildingAlpha: () => {

        if (USER.target) {

            BUILDING.store.forEach(building => {

                /*

                let distance = TOOL.getDistance(
                    USER.target.sprite,
                    TOOL.getClosestPointToLine(
                        USER.target.sprite,
                        [{
                            x: building.x + 240,
                            y: building.y - 120
                        }, {
                            x: building.x + 240,
                            y: building.y  + 120 - building.height
                        }]
                    )
                );

                let alpha = distance * 2 / 1000;

                if (alpha < 0.1) alpha = 0.1;
                if (1 < alpha) alpha = 1;

                building.alpha = alpha;

                */

                if (!LAYER.isTargetOverBuilding(USER.target.sprite, building)) {

                    let distance = TOOL.getDistance(
                        USER.target.sprite,
                        TOOL.getClosestPointToLine(
                            USER.target.sprite,
                            [{
                                x: building.x + 240,
                                y: building.y - 120
                            }, {
                                x: building.x + 240,
                                y: building.y  + 120 - building.height
                            }]
                        )
                    );

                    let alpha = distance * 2 / 1000;

                    if (alpha < 0.1) alpha = 0.1;
                    if (1 < alpha) alpha = 1;

                    building.alpha = alpha;

                } else building.alpha = 1;



            });

        }

    }

};