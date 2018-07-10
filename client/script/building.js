window.BUILDING = {

    init: callback => {

        TOOL.getJSON('/data/building.json', data => {

            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    for (let col = 0; col < data[0].length; col++)
                        for (let row = 0; row < data[1].length; row++) {

                let x = 250 * data[0][col] + i * 8250;
                let y = 250 * data[1][row] + j * 8750;
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

            if (CONFIG.debug) TOOL.getJSON('/data/collision.json', data => {

                let f = (x, y, w, h) => {

                    let graphics = new PIXI.Graphics();

                    graphics.beginFill(0xff0000, 0.4);
                    graphics.drawRect(x, y, w, h);

                    LAYER.building.up.addChild(graphics);

                };

                for (let i = 0; i < 2; i++)
                    for (let j = 0; j < 2; j++)
                        for (let col = 0; col < data[0].length; col++)
                            for (let row = 0; row < data[1].length; row++) {

                    let x = data[0][col] + i * 8250;
                    let y = data[1][row] + j * 8750;

                    f(x, y, 1000, 750);

                }

                f(0, 0, 24750, 4000);
                f(0, 22250, 24750, 4000);
                f(0, 0, 3750, 26250);
                f(21000, 0, 3750, 26250);

            });

            callback();

        });

        /*
        TOOL.getJSON('/data/building.json', data => {

            BUILDING.data = data;

            data.forEach(item => {

                let isRoadOver = false;

                ROAD.data.forEach(road => {if (road[1] === item[1] && road[2] === item[2] - 250) isRoadOver = true;});

                if (isRoadOver) {

                    let down = new PIXI.Sprite(TEXTURE[item[0] + '_down']);

                    down.anchor.set(0, 1);
                    down.position.set(item[1], item[2] + 250);

                    LAYER.building.down.addChild(down);

                    let up = new PIXI.Sprite(TEXTURE[item[0] + '_up']);

                    up.anchor.set(0, 1);
                    up.position.set(item[1], item[2]);

                    LAYER.building.up.addChild(up);

                } else {

                    let sprite = new PIXI.Sprite(TEXTURE[item[0]]);

                    sprite.anchor.set(0, 1);
                    sprite.position.set(item[1], item[2] + 250);

                    LAYER.building.down.addChild(sprite);

                }

            });

            callback();

        });
        */

    }

};