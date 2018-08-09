window.ROAD = {

    init: callback => {

        TOOL.getJSON('/data/road.json', data => {

            ROAD.data = data;

            for (let worldX = 0; worldX < CONFIG.world.x; worldX++) {

                for (let worldY = 0; worldY < CONFIG.world.y; worldY++) {

                    data.forEach(item => {

                        let sprite = new PIXI.Sprite(TEXTURE[item[0]]);

                        sprite.anchor.set(0, 0);
                        sprite.position.set(item[1] + worldX * CONFIG.district.width, item[2] + worldY * CONFIG.district.height);

                        LAYER.road.addChild(sprite);

                    });

                }

            }

            GAME.application.ticker.add(() => {

                let boundary = CAMERA.getBoundary();

                boundary.x1 -= 250;
                boundary.y1 -= 250;

                LAYER.road.children.forEach(item => item.visible = (
                    boundary.x1 <= item.x && item.x <= boundary.x2 &&
                    boundary.y1 <= item.y && item.y <= boundary.y2
                ));

            });

            callback();

        });

    }

};