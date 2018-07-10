window.BUILDING = {

    init: callback => {

        TOOL.getJSON('/data/grid.json', data => {


            for (let i = 0; i < data[0].length; i++) for (let j = 0; j < data[1].length; j++) {

                let x = 250 * data[0][i];
                let y = 250 * data[1][j];
                let isRoadOver = false;

                ROAD.data.forEach(road => {if (road[1] === x && road[2] === y - 250) isRoadOver = true;});

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