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

                                    // base

                                    let building = 'building_base_' + TEXTURE.building.base[TOOL.getRandomInt(TEXTURE.building.base.length - 1)];

                                    if (quarterY === 0) {

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

                                    // trash

                                    let trash = new PIXI.Sprite(TEXTURE['building_trash_' + TEXTURE.building.trash[TOOL.getRandomInt(TEXTURE.building.trash.length - 1)]]);

                                    trash.anchor.set(0, 1);
                                    trash.position.set(x, y + 250);

                                    LAYER.building.down.addChild(trash);

                                    // light

                                    let colors = ['cyan', 'magenta', 'yellow'];
                                    let color = colors[TOOL.getRandomInt(colors.length - 1)];
                                    let speed = TOOL.getRandomInt(5, 50) / 1000;

                                    if (quarterY === 0) {

                                        let d = [];

                                        TEXTURE.building[color].forEach(item => d.push(TEXTURE['building_' + color + '_' + item + '_down']));

                                        let down = new PIXI.extras.AnimatedSprite(d);

                                        down.anchor.set(0, 1);
                                        down.position.set(x, y + 250);
                                        down.animationSpeed = speed;
                                        down.play();

                                        LAYER.building.down.addChild(down);

                                        let u = [];

                                        TEXTURE.building[color].forEach(item => u.push(TEXTURE['building_' + color + '_' + item + '_up']));

                                        let up = new PIXI.extras.AnimatedSprite(u);

                                        up.anchor.set(0, 1);
                                        up.position.set(x, y);
                                        up.animationSpeed = speed;
                                        up.play();

                                        LAYER.building.up.addChild(up);

                                    } else {

                                        let t = [];

                                        TEXTURE.building[color].forEach(item => t.push(TEXTURE['building_' + color + '_' + item]));

                                        let sprite = new PIXI.extras.AnimatedSprite(t);

                                        sprite.anchor.set(0, 1);
                                        sprite.position.set(x, y + 250);
                                        sprite.animationSpeed = speed;
                                        sprite.play();

                                        LAYER.building.down.addChild(sprite);

                                    }

                                    // cat

                                    if (quarterY === CONFIG.quarter.y - 1) {

                                        let textures = [];

                                        TEXTURE.building.cat.forEach(item => textures.push(TEXTURE['building_cat_' + item]));

                                        let sprite = new PIXI.extras.AnimatedSprite(textures);

                                        sprite.anchor.set(0.5, 1);
                                        sprite.position.set(
                                            x + TOOL.getRandomInt(1, 4) * 50 + TOOL.getRandomInt(-10, 10),
                                            y + 250 - (TOOL.getRandomInt(1) ? 103 : 178)
                                        );
                                        sprite.animationSpeed = TOOL.getRandomInt(1, 5) / 100;
                                        sprite.play();

                                        LAYER.building.down.addChild(sprite);

                                    }

                                    // banner

                                    if (quarterY === CONFIG.quarter.y - 1) {

                                        let banner = TEXTURE.building.banner[TOOL.getRandomInt(TEXTURE.building.banner.length - 1)];

                                        let sprite = new PIXI.extras.AnimatedSprite([
                                            TEXTURE['building_banner_' + banner + '_0'],
                                            TEXTURE['building_banner_' + banner + '_1']
                                        ]);

                                        sprite.anchor.set(0, 1);
                                        sprite.position.set(x + 71, y + 250 - 71);
                                        sprite.animationSpeed = TOOL.getRandomInt(1, 5) / 100;
                                        sprite.play();

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