window.ROAD = {

    store: [],

    info: [],

    init: callback => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/data/road.json', true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                let style = {
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#aaaaaa'
                };

                let groups = JSON.parse(xhr.responseText);

                Object.keys(groups).forEach(group => {

                    groups[group].forEach(data => {

                        let sprite = new PIXI.Sprite(TEXTURE[data.t]);

                        sprite.class = 'ROAD';
                        sprite.anchor.set(0, 1);
                        sprite.position.set(data.x, data.y);

                        ROAD.store.push(sprite);
                        LAYER.road.addChild(sprite);

                        if (CONFIG.debug) {

                            let info = new PIXI.Text(data.t, style);

                            info.anchor.set(0.5, 0);
                            info.position.set(data.x + 240, data.y - 140);

                            ROAD.info.push(info);
                            LAYER.info.addChild(info);

                        }

                    });

                });

                callback();

            }

        };

        xhr.send();

    }

};