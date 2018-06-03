window.BACKGROUND = {

    store: [],

    info: [],
    top: [],

    init: callback => {

        let width = 480;
        let height = 241;
        let style = {
            fontFamily: 'EuropeExt Normal',
            fontSize: 12,
            fill: '#ffffff'
        };

        if (CONFIG.debug) LAYER.top.alpha = 0.1;

        for (let y = 0; y < 20000 / (height - 1); y++) {

            for (let x = 0; x < 20000 / width * 2; x++) {

                let X = x * (height - 1);
                let Y = y * (height - 1) + (x % 2 ? Math.floor((height - 1) / 2) : 0);

                // background

                let bottom = new PIXI.Sprite(TEXTURE['background_bottom']);

                bottom.anchor.set(0, 1);
                bottom.position.set(X, Y);

                BACKGROUND.store.push(bottom);
                LAYER.background.addChild(bottom);

                if (CONFIG.debug) {

                    // up

                    let top = new PIXI.Sprite(TEXTURE['background_top']);

                    top.anchor.set(0, 1);
                    top.position.set(X, Y);

                    BACKGROUND.top.push(bottom);
                    LAYER.top.addChild(top);

                    // info

                    let info = new PIXI.Text(X + ', ' + Y, style);

                    info.anchor.set(0.5, 0);
                    info.position.set(X + 240, Y - 120);

                    BACKGROUND.info.push(bottom);
                    LAYER.info.addChild(info);

                }

            }

        }

        callback();

    }

};