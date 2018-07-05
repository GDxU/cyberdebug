window.ROAD = {

    store: [],

    info: [],

    init: callback => {

        TOOL.getJSON('/data/road.json', data => {

            data.forEach(r => {

                let sprite = new PIXI.Sprite(TEXTURE[r[0]]);

                sprite.anchor.set(0, 0);
                sprite.position.set(r[1], r[2]);

                ROAD.store.push(sprite);
                LAYER.road.addChild(sprite);

            });

            callback();

        });

    }

};