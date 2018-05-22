window.TEXTURE = {

    init: () => {

        PIXI.loader.add('pin', '/client/image/cursor/pin.png');

        PIXI.loader.add('tile', '/client/image/tile.png');

        // hud

        PIXI.loader.add('/client/image/hud/radar.png');
        PIXI.loader.add('/client/image/hud/detector.png');
        PIXI.loader.add('/client/image/hud/line.png');
        PIXI.loader.add('/client/image/hud/frame.png');

        // character

        TEXTURE.character.store.forEach(character => PIXI.loader.add('/client/image/character/' + character + '.png'));

        PIXI.loader.load(() => {

            TEXTURE.hud.init();
            TEXTURE.character.init();

            GUI.menu.visible(true);

        });

    },

    hud: {

        init: () => {

            TEXTURE.hud.initRadar();
            TEXTURE.hud.initDetector();
            TEXTURE.hud.initLine();

        },

        initRadar: () => {

            for (let x = 0; x < 5; x++) {

                TEXTURE['hud_radar_' + x] = new PIXI.Texture(
                    PIXI.loader.resources['/client/image/hud/radar.png'].texture,
                    new PIXI.Rectangle(x * 99, 0, 99, 99)
                );

            }

        },

        initDetector: () => {

            for (let x = 0; x < 5; x++) {

                for (let y = 0; y < 3; y++) {

                    TEXTURE['hud_detector_' + x + '_' + y] = new PIXI.Texture(
                        PIXI.loader.resources['/client/image/hud/detector.png'].texture,
                        new PIXI.Rectangle(x * 99, y * 33, 99, 33)
                    );

                }

            }

        },

        initLine: () => {

            TEXTURE['hud_line_user'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/hud/line.png'].texture,
                new PIXI.Rectangle(0, 0, 99, 1)
            );

            TEXTURE['hud_line_target'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/hud/line.png'].texture,
                new PIXI.Rectangle(0, 1, 99, 1)
            );

        }

    },

    character: {

        store: ['man', 'woman'],

        init: () => {

            let actions = ['stand', 'walk1', 'walk2'];
            let sides = ['s', 'se', 'e', 'ne', 'n'];

            for (let c = 0; c < TEXTURE.character.store.length; c++) {

                let character = TEXTURE.character.store[c];
                let texture = PIXI.loader.resources['/client/image/character/' + character + '.png'].texture;
                let width = Math.floor(texture.width / sides.length);
                let height = Math.floor(texture.height / actions.length);

                TEXTURE['character_' + character] = new PIXI.Texture(
                    texture,
                    new PIXI.Rectangle(0, 0, width, width)
                );

                for (let a = 0; a < actions.length; a++) {

                    let action = actions[a];

                    for (let s = 0; s < sides.length; s++) {

                        let side = sides[s];
                        let frame = new PIXI.Rectangle(s * width, a * height, width, height);

                        TEXTURE['character_' + character + '_' + action + '_' + side] = new PIXI.Texture(texture, frame);
                        if (side === 'se') TEXTURE['character_' + character + '_' + action + '_sw'] = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'e')  TEXTURE['character_' + character + '_' + action + '_w']  = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'ne') TEXTURE['character_' + character + '_' + action + '_nw'] = new PIXI.Texture(texture, frame, null, null, 12);

                    }

                }

            }

        },

        get: (model, action, side) => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            if (action.includes('stand')) {

                return [
                    TEXTURE['character_' + character + '_stand_' + side]
                ];

            } else {

                return [
                    TEXTURE['character_' + character + '_walk1_' + side],
                    TEXTURE['character_' + character + '_walk2_' + side]
                ];

            }

        },

        preview: model => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            return TEXTURE['character_' + character];

        }

    }

};