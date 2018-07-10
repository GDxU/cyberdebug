window.ROAD = {

    init: callback => {

        TOOL.getJSON('/data/road.json', data => {

            ROAD.data = data;

            for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) data.forEach(item => {

                let sprite = new PIXI.Sprite(TEXTURE[item[0]]);

                sprite.anchor.set(0, 0);
                sprite.position.set(item[1] + i * 8250, item[2] + j * 8750);

                LAYER.road.addChild(sprite);

            });

            callback();

        });

    }

};