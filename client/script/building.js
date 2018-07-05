window.BUILDING = {

    init: callback => {

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

    }

};