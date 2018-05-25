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

            let types = ['s', 'l', 'r', 't'];
            let sides = ['s', 'se', 'e', 'ne', 'n'];

            for (let c = 0; c < TEXTURE.character.store.length; c++) {

                let character = TEXTURE.character.store[c];
                let texture = PIXI.loader.resources['/client/image/character/' + character + '.png'].texture;
                let width = Math.floor(texture.width / sides.length);
                let height = Math.floor(texture.height / types.length);

                TEXTURE['character_' + character] = new PIXI.Texture(
                    texture,
                    new PIXI.Rectangle(0, 0, width, width)
                );

                for (let t = 0; t < types.length; t++) {

                    let type = types[t];

                    for (let s = 0; s < sides.length; s++) {

                        let side = sides[s];
                        let frame = new PIXI.Rectangle(s * width, t * height, width, height);

                        TEXTURE['character_' + character + '_' + type + '_' + side] = new PIXI.Texture(texture, frame);
                        if (side === 'se') TEXTURE['character_' + character + '_' + type + '_sw'] = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'e')  TEXTURE['character_' + character + '_' + type + '_w']  = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'ne') TEXTURE['character_' + character + '_' + type + '_nw'] = new PIXI.Texture(texture, frame, null, null, 12);

                    }

                }

            }

        },

        get: (model, action, side) => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            if (action === 'stand') {

                return [
                    TEXTURE['character_' + character + '_s_' + side],
                    TEXTURE['character_' + character + '_s_' + side]
                ]

            }

            if (['walk', 'run'].includes(action)) {

                return [
                    TEXTURE['character_' + character + '_s_' + side],
                    TEXTURE['character_' + character + '_l_' + side],
                    TEXTURE['character_' + character + '_s_' + side],
                    TEXTURE['character_' + character + '_r_' + side]
                ]

            }

            if (action === 'kill') {

                return [
                    TEXTURE['character_' + character + '_t_' + side],
                    TEXTURE['character_' + character + '_r_' + side]
                ]

            }

            if (action === 'killed') {

                return [
                    TEXTURE['character_' + character + '_t_' + side],
                    TEXTURE['character_' + character + '_t_' + side]
                ]

            }

            if (action === 'stun') {

                return [
                    TEXTURE['character_' + character + '_r_' + side],
                    TEXTURE['character_' + character + '_r_' + side]
                ]

            }

            if (action === 'stunned') {

                return [
                    TEXTURE['character_' + character + '_t_' + side],
                    TEXTURE['character_' + character + '_t_' + side]
                ]

            }

            if (action === 'miss') {

                return [
                    TEXTURE['character_' + character + '_t_' + side],
                    TEXTURE['character_' + character + '_t_' + side]
                ]

            }

            if (action === 'missed') {

                return [
                    TEXTURE['character_' + character + '_t_' + side],
                    TEXTURE['character_' + character + '_t_' + side]
                ]

            }

        },

        preview: model => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            return TEXTURE['character_' + character];

        },

        test: () => {

            let x = 10000;
            let y = 10000;

            let actions = {
                stand: 1 / 60,
                walk: 1 / 15,
                run: 1 / 5,
                kill: 1 / 30,
                killed: 1 / 30,
                stun: 1 / 30,
                stunned: 1 / 30,
                miss: 1 / 30,
                missed: 1 / 30
            };

            let sides = ['w', 'sw', 's', 'se', 'e', 'ne', 'n', 'nw'];

            for (let c = 0; c < TEXTURE.character.store.length; c++) {

                for (let a = 0; a < Object.keys(actions).length; a++) {

                    for (let s = 0; s < sides.length; s++) {

                        let i = new PIXI.extras.AnimatedSprite(TEXTURE.character.get(
                            c,
                            Object.keys(actions)[a],
                            sides[s]
                        ));

                        i.animationSpeed = actions[Object.keys(actions)[a]];
                        i.x = x + c * 200 + s * 20;
                        i.y = y + a * 50;
                        i.play();

                        GAME.world.addChild(i);

                    }

                }

            }

        }

    }

};