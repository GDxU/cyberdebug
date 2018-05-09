window.TEXTURE = {

    init: () => {

        PIXI.loader.add('white',   '/client/image/model/white.png');
        PIXI.loader.add('cyan',    '/client/image/model/cyan.png');
        PIXI.loader.add('magenta', '/client/image/model/magenta.png');
        PIXI.loader.add('yellow',  '/client/image/model/yellow.png');

        PIXI.loader.add('pin', '/client/image/cursor/pin.png');

        PIXI.loader.add('tile',   '/client/image/tile.png');

        PIXI.loader.add('/client/image/hud/radar.png');
        PIXI.loader.add('/client/image/hud/detector.png');

        PIXI.loader.load(() => {

            TEXTURE.initRadar();
            TEXTURE.initDetector();

            GUI.menu.show();

        });

    },

    initRadar: () => {

        for (let x = 0; x < 5; x++) {

            TEXTURE['radar_' + x] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/hud/radar.png'].texture,
                new PIXI.Rectangle(x * 99, 0, 99, 99)
            );

        }

    },

    initDetector: () => {

        for (let x = 0; x < 5; x++) {

            for (let y = 0; y < 3; y++) {

                TEXTURE['detector_' + x + '_' + y] = new PIXI.Texture(
                    PIXI.loader.resources['/client/image/hud/detector.png'].texture,
                    new PIXI.Rectangle(x * 99, y * 33, 99, 33)
                );

            }

        }

    }

};