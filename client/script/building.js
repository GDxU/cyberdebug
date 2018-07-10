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