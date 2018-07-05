window.ROAD = {

    init: callback => {

        TOOL.getJSON('/data/road.json', data => {

            ROAD.data = data;

            data.forEach(item => {

                let sprite = new PIXI.Sprite(TEXTURE[item[0]]);

                sprite.anchor.set(0, 0);
                sprite.position.set(item[1], item[2]);

                LAYER.road.addChild(sprite);

            });

            callback();

        });

    }

};