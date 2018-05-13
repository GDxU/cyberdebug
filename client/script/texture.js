window.TEXTURE = {

    init: () => {

        PIXI.loader.add('pin', '/client/image/cursor/pin.png');

        PIXI.loader.add('tile',   '/client/image/tile.png');

        // hud

        PIXI.loader.add('/client/image/hud/radar.png');
        PIXI.loader.add('/client/image/hud/detector.png');
        PIXI.loader.add('/client/image/hud/line.png');
        PIXI.loader.add('/client/image/hud/unknown.png');

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

        let actions = ['stand', 'walk1', 'walk2', 'kill', 'killed', 'stun', 'stunned', 'miss', 'missed'];
        let side = ['s', 'sw', 'w', 'nw', 'n', 'ne', 'e', 'se'];

        for (let c = 0; c < TEXTURE.characters.length; c++) {

            for (let a = 0; a < actions.length; a++) {

                for (let s = 0; s < side.length; s++) {

                    let C = TEXTURE.characters[c];
                    let A = actions[a];
                    let S = side[s];

                    TEXTURE['character_' + C + '_' + A + '_' + S] = new PIXI.Texture(
                        PIXI.loader.resources['/client/image/character/' + C + '.png'].texture,
                        new PIXI.Rectangle(s * 21, a * 21, 21, 21)
                    );

                }

            }

        }

    },

    character: (model, action, side) => {

        let character = TEXTURE.characters[model % TEXTURE.characters.length];

        if (action === 'walk') {

            return [
                TEXTURE['character_' + character + '_' + action + '1_' + side],
                TEXTURE['character_' + character + '_' + action + '2_' + side]
            ];

        } else return [TEXTURE['character_' + character + '_' + action + '_' + side]];

    },

    characters: ['debug']

};