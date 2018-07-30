window.BUILDING = {

    init: callback => {

        TOOL.getJSON('/data/building.json', data => {

            for (let worldX = 0; worldX < CONFIG.world.x; worldX++) {

                for (let worldY = 0; worldY < CONFIG.world.y; worldY++) {

                    for (let buildingX = 0; buildingX < data[0].length; buildingX++) {

                        for (let buildingY = 0; buildingY < data[1].length; buildingY++) {

                            for (let quarterX = 0; quarterX < CONFIG.quarter.x; quarterX++) {

                                for (let quarterY = 0; quarterY < CONFIG.quarter.y; quarterY++) {

                                    let x = CONFIG.district.width * worldX + CONFIG.tile.width * data[0][buildingX] + CONFIG.tile.width * quarterX;
                                    let y = CONFIG.district.height * worldY + CONFIG.tile.height * data[1][buildingY] + CONFIG.tile.height * quarterY;

                                    let isRoadOver = false;

                                    LAYER.road.children.forEach(road => {if (road.x === x && road.y === y - 250) isRoadOver = true;});

                                    let building = 'building_' + TEXTURE.building.store[TOOL.getRandomInt(TEXTURE.building.store.length - 1)];

                                    if (isRoadOver) {

                                        let down = new PIXI.Sprite(TEXTURE[building + '_down']);

                                        down.anchor.set(0, 1);
                                        down.position.set(x, y + 250);

                                        LAYER.building.down.addChild(down);

                                        let up = new PIXI.Sprite(TEXTURE[building + '_up']);

                                        up.anchor.set(0, 1);
                                        up.position.set(x, y);

                                        LAYER.building.up.addChild(up);

                                    } else {

                                        let sprite = new PIXI.Sprite(TEXTURE[building]);

                                        sprite.anchor.set(0, 1);
                                        sprite.position.set(x, y + 250);

                                        LAYER.building.down.addChild(sprite);

                                    }

                                }

                            }

                        }

                    }

                }

            }

            // прозрачность крыш
            GAME.application.ticker.add(() => {

                if (USER.target) LAYER.building.up.children.forEach(roof => {

                    roof.alpha = USER.target.sprite.y < roof.y && TOOL.getDistance({
                        x: roof.x + 125,
                        y: roof.y
                    }, USER.target.sprite) < 750 ? 0.4 : 1;

                });

            });

            callback();

        });

    }

};