window.TEXTURE = {

    init: () => {

        PIXI.loader.add('pin', '/client/image/cursor/pin.png');

        PIXI.loader.add('tile',   '/client/image/tile.png');

        // hud

        PIXI.loader.add('/client/image/hud/radar.png');
        PIXI.loader.add('/client/image/hud/detector.png');
        PIXI.loader.add('/client/image/hud/line.png');
        PIXI.loader.add('/client/image/hud/frame.png');

        // character

        TEXTURE.characters.forEach(character => PIXI.loader.add('/client/image/character/' + character + '.png'));

        PIXI.loader.load(() => {

            // hud

            TEXTURE.initRadar();
            TEXTURE.initDetector();
            TEXTURE.initLine();

            // character

            TEXTURE.initCharacter();

            GUI.menu.visible(true);

        });

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

    },

    initCharacter: () => {

        let actions = ['stand', 'walk1', 'walk2'];
        let sides = ['w', 'sw', 's', 'se', 'e', 'ne', 'n', 'nw'];

        for (let c = 0; c < TEXTURE.characters.length; c++) {

            let character = TEXTURE.characters[c];
            let texture = PIXI.loader.resources['/client/image/character/' + character + '.png'].texture;
            let width = Math.floor(texture.width / sides.length);
            let height = Math.floor(texture.height / actions.length);

            TEXTURE['character_' + character] = new PIXI.Texture(
                texture,
                new PIXI.Rectangle(2 * width, 0, width, width)
            );

            for (let a = 0; a < actions.length; a++) {

                let action = actions[a];

                for (let s = 0; s < sides.length; s++) {

                    let side = sides[s];

                    TEXTURE['character_' + character + '_' + action + '_' + side] = new PIXI.Texture(
                        texture,
                        new PIXI.Rectangle(s * width, a * height, width, height)
                    );

                }

            }

        }

    },

    character: (model, action, side) => {

        let character = TEXTURE.characters[model % TEXTURE.characters.length];

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

        let character = TEXTURE.characters[model % TEXTURE.characters.length];

        return TEXTURE['character_' + character];

    },

    characters: ['default']

};