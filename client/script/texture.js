window.TEXTURE = {

    init: callback => {

        // marker

        PIXI.loader.add('/client/image/cursor/pin.png');

        // hud

        PIXI.loader.add('/client/image/hud/radar.png');
        PIXI.loader.add('/client/image/hud/detector.png');
        PIXI.loader.add('/client/image/hud/line.png');
        PIXI.loader.add('/client/image/hud/frame.png');

        // weapon

        PIXI.loader.add('/client/image/weapon/katana.png');
        PIXI.loader.add('/client/image/weapon/taser.png');

        // sfx

        PIXI.loader.add('/client/image/sfx/blood.png');
        PIXI.loader.add('/client/image/sfx/miss.png');
        PIXI.loader.add('/client/image/sfx/stunned.png');

        // character

        TEXTURE.character.load(() => {

            TEXTURE.character.store.forEach(character => PIXI.loader.add('/client/image/character/' + character + '.png'));

            // start loading

            PIXI.loader.load(() => {

                TEXTURE.marker.init();
                TEXTURE.hud.init();
                TEXTURE.weapon.init();
                TEXTURE.character.init();

                callback();

            });

        });

    },

    marker: {

        init: () => {

            TEXTURE['marker_pin'] = PIXI.loader.resources['/client/image/cursor/pin.png'].texture;

        }

    },

    hud: {

        init: () => {

            TEXTURE.hud.initRadar();
            TEXTURE.hud.initDetector();
            TEXTURE.hud.initLine();

        },

        initRadar: () => {

            PIXI.loader.resources['/client/image/hud/radar.png'].texture.baseTexture.scaleMode = 0;

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

    weapon: {

        // 0 grad (0), 90 grad (2), 180 grad (4), 270 grad (6)
        // Mirrors: vertical (8), main diagonal (10), horizontal (12), reverse diagonal (14)

        init: () => {

            TEXTURE.weapon.initKatana();
            TEXTURE.weapon.initTaser();

        },

        initKatana: () => {

            let horizontal = new PIXI.Rectangle(0, 0, 20, 4);
            let htrim = new PIXI.Rectangle(0, 0, 4, 20);
            let diagonal = new PIXI.Rectangle(0, 4, 15, 14);
            let dtrim = new PIXI.Rectangle(0, 4, 14, 15);

            let texture = PIXI.loader.resources['/client/image/weapon/katana.png'].texture;

            TEXTURE['weapon_katana_w']  = new PIXI.Texture(texture, horizontal, null, null, 12);
            TEXTURE['weapon_katana_sw'] = new PIXI.Texture(texture, diagonal,   null, null, 12);
            TEXTURE['weapon_katana_s']  = new PIXI.Texture(texture, horizontal, htrim, htrim, 6);
            TEXTURE['weapon_katana_se'] = new PIXI.Texture(texture, diagonal);
            TEXTURE['weapon_katana_e']  = new PIXI.Texture(texture, horizontal);
            TEXTURE['weapon_katana_ne'] = new PIXI.Texture(texture, diagonal,   dtrim, dtrim, 2);
            TEXTURE['weapon_katana_n']  = new PIXI.Texture(texture, horizontal, htrim, htrim, 2);
            TEXTURE['weapon_katana_nw'] = new PIXI.Texture(texture, diagonal,   dtrim, dtrim, 14);

        },

        initTaser: () => {

            let horizontal = new PIXI.Rectangle(0, 0, 13, 3);
            let htrim = new PIXI.Rectangle(0, 0, 3, 13);
            let diagonal = new PIXI.Rectangle(0, 3, 10, 10);

            let texture = PIXI.loader.resources['/client/image/weapon/taser.png'].texture;

            TEXTURE['weapon_taser_w']  = new PIXI.Texture(texture, horizontal, null, null, 4);
            TEXTURE['weapon_taser_sw'] = new PIXI.Texture(texture, diagonal, null, null, 6);
            TEXTURE['weapon_taser_s']  = new PIXI.Texture(texture, horizontal, htrim, htrim, 6);
            TEXTURE['weapon_taser_se'] = new PIXI.Texture(texture, diagonal);
            TEXTURE['weapon_taser_e']  = new PIXI.Texture(texture, horizontal);
            TEXTURE['weapon_taser_ne'] = new PIXI.Texture(texture, diagonal, null, null, 2);
            TEXTURE['weapon_taser_n']  = new PIXI.Texture(texture, horizontal, htrim, htrim, 2);
            TEXTURE['weapon_taser_nw'] = new PIXI.Texture(texture, diagonal, null, null, 4);

        }

    },

    character: {

        load: (callback) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', '/character', true);

            xhr.onreadystatechange = () => {

                if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                    TEXTURE.character.store = JSON.parse(xhr.responseText);

                    callback();

                }

            };

            xhr.send();

        },

        init: () => {

            let w = 15;
            let h = 45;

            TEXTURE.character.store.forEach(character => {

                let texture = PIXI.loader.resources['/client/image/character/' + character + '.png'].texture;

                TEXTURE['character_' + character] = new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, w, w));

                ['s', 'se', 'e', 'ne', 'n'].forEach((side, s) => {

                    // stand, walk1, walk2

                    ['stand', 'walk1', 'walk2'].forEach((type, t) => {

                        let frame = new PIXI.Rectangle(s * w, t * h, w, h);

                        TEXTURE['character_' + character + '_' + type + '_' + side] = new PIXI.Texture(texture, frame);

                        if (side === 'se') TEXTURE['character_' + character + '_' + type + '_sw'] = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'e')  TEXTURE['character_' + character + '_' + type + '_w']  = new PIXI.Texture(texture, frame, null, null, 12);
                        if (side === 'ne') TEXTURE['character_' + character + '_' + type + '_nw'] = new PIXI.Texture(texture, frame, null, null, 12);

                    });

                    // turn

                    let f = (side, rotate) => {

                        let d = ['s', 'n'].includes(side) ? h - 20 : h - 17;

                        let body = new PIXI.Rectangle(s * w, h, w, d);
                        let legs = new PIXI.Rectangle(s * w, 2 * h + d, w, h - d);

                        TEXTURE['character_' + character + '_turn_' + side] = new PIXI.RenderTexture.create(w, h);

                        let container = new PIXI.Container();

                        container.addChild(new PIXI.Sprite(new PIXI.Texture(texture, body, null, null, rotate)));
                        container.addChild(new PIXI.Sprite(new PIXI.Texture(texture, legs, null, null, rotate)));

                        container.children[1].position.set(0, d);

                        container.setTransform();

                        GAME.application.renderer.render(container, TEXTURE['character_' + character + '_turn_' + side]);

                    };

                    f(side, 0);
                    if (side === 'se') f('sw', 12);
                    if (side === 'e')  f('w',  12);
                    if (side === 'ne') f('nw', 12);

                    // kill 1

                    f = side => {

                        let p = {
                            w:  [2, 24],
                            sw: [8, 24],
                            s:  [7, 20],
                            se: [6, 24],
                            e:  [7, 24],
                            ne: [7, 8],
                            n:  [18, 7],
                            nw: [8, 8]
                        };

                        TEXTURE['character_' + character + '_kill1_' + side] = new PIXI.RenderTexture.create(w + 14, h);

                        let container = new PIXI.Container();

                        container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                        container.addChild(new PIXI.Sprite(TEXTURE['weapon_katana_' + side]));

                        container.children[0].position.set(7, 0);
                        container.children[1].position.set(p[side][0], p[side][1]);

                        container.setTransform();

                        if (['nw', 'n', 'ne'].includes(side)) container.children.reverse();

                        GAME.application.renderer.render(container, TEXTURE['character_' + character + '_kill1_' + side]);

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // kill 2

                    f = side => {

                        let p = {
                            w:  [0, 25],
                            sw: [6, 25],
                            s:  [7, 21],
                            se: [8, 25],
                            e:  [9, 25],
                            ne: [9, 7],
                            n:  [18, 6],
                            nw: [6, 7]
                        };

                        TEXTURE['character_' + character + '_kill2_' + side] = new PIXI.RenderTexture.create(w + 14, h);

                        let container = new PIXI.Container();

                        container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_walk2_' + side]));
                        container.addChild(new PIXI.Sprite(TEXTURE['weapon_katana_' + side]));

                        container.children[0].position.set(7, 0);
                        container.children[1].position.set(p[side][0], p[side][1]);

                        container.setTransform();

                        if (['nw', 'n', 'ne'].includes(side)) container.children.reverse();

                        GAME.application.renderer.render(container, TEXTURE['character_' + character + '_kill2_' + side]);

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // killed

                    f = side => {

                        for (let i = 0; i < 4; i++) {

                            TEXTURE['character_' + character + '_killed' + (i + 1) + '_' + side] = new PIXI.RenderTexture.create(w, h);

                            let container = new PIXI.Container();
                            let frame = new PIXI.Rectangle(i * 5, 0, 5, 15);
                            let blood = new PIXI.Texture(PIXI.loader.resources['/client/image/sfx/blood.png'].texture, frame);

                            container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                            container.addChild(new PIXI.Sprite(blood));

                            container.children[1].position.set(5, 15);

                            container.setTransform();

                            GAME.application.renderer.render(container, TEXTURE['character_' + character + '_killed' + (i + 1) + '_' + side]);

                        }

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // stun 1

                    f = side => {

                        let p = {
                            w:  [6, 24],
                            sw: [10, 25],
                            s:  [8, 23],
                            se: [9, 25],
                            e:  [10, 24],
                            ne: [9, 15],
                            n:  [18, 12],
                            nw: [10, 15]
                        };

                        TEXTURE['character_' + character + '_stun1_' + side] = new PIXI.RenderTexture.create(w + 14, h);

                        let container = new PIXI.Container();

                        container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                        container.addChild(new PIXI.Sprite(TEXTURE['weapon_taser_' + side]));

                        container.children[0].position.set(7, 0);
                        container.children[1].position.set(p[side][0], p[side][1]);

                        container.setTransform();

                        if (['nw', 'n', 'ne'].includes(side)) container.children.reverse();

                        GAME.application.renderer.render(container, TEXTURE['character_' + character + '_stun1_' + side]);

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // stun 2

                    f = side => {

                        let p = {
                            w:  [6, 24],
                            sw: [10, 25],
                            s:  [8, 23],
                            se: [9, 25],
                            e:  [10, 24],
                            ne: [9, 15],
                            n:  [18, 12],
                            nw: [10, 15]
                        };

                        let r = {
                            w:  'e',
                            sw: 'ne',
                            s:  'n',
                            se: 'nw',
                            e:  'w',
                            ne: 'sw',
                            n:  's',
                            nw: 'se'
                        };

                        TEXTURE['character_' + character + '_stun2_' + side] = new PIXI.RenderTexture.create(w + 14, h);

                        let container = new PIXI.Container();

                        container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                        container.addChild(new PIXI.Sprite(TEXTURE['weapon_taser_' + r[side]]));

                        container.children[0].position.set(7, 0);
                        container.children[1].position.set(p[side][0], p[side][1]);

                        container.setTransform();

                        if (['nw', 'n', 'ne'].includes(side)) container.children.reverse();

                        GAME.application.renderer.render(container, TEXTURE['character_' + character + '_stun2_' + side]);

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // stunned

                    f = side => {

                        for (let i = 0; i < 4; i++) {

                            TEXTURE['character_' + character + '_stunned' + (i + 1) + '_' + side] = new PIXI.RenderTexture.create(w, h);

                            let container = new PIXI.Container();
                            let frame = new PIXI.Rectangle(0, 0, w, h);
                            let stunned = new PIXI.Texture(PIXI.loader.resources['/client/image/sfx/stunned.png'].texture, frame, null, null, i * 4);

                            container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                            container.addChild(new PIXI.Sprite(stunned));

                            container.setTransform();

                            GAME.application.renderer.render(container, TEXTURE['character_' + character + '_stunned' + (i + 1) + '_' + side]);

                        }

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // miss

                    f = side => {

                        for (let i = 0; i < 4; i++) {

                            TEXTURE['character_' + character + '_miss' + (i + 1) + '_' + side] = new PIXI.RenderTexture.create(w, h);

                            let container = new PIXI.Container();
                            let frame = new PIXI.Rectangle(0, 0, w, h);
                            let miss = new PIXI.Texture(PIXI.loader.resources['/client/image/sfx/miss.png'].texture, frame, null, null, i * 4);

                            container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                            container.addChild(new PIXI.Sprite(miss));

                            container.setTransform();

                            GAME.application.renderer.render(container, TEXTURE['character_' + character + '_miss' + (i + 1) + '_' + side]);

                        }

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                    // missed

                    f = side => {

                        for (let i = 1; i < 4; i++) {

                            TEXTURE['character_' + character + '_missed' + i + '_' + side] = new PIXI.RenderTexture.create(w, h);

                            let container = new PIXI.Container();

                            container.addChild(new PIXI.Sprite(TEXTURE['character_' + character + '_turn_' + side]));
                            container.children[0].alpha = i * 0.25;

                            container.setTransform();

                            GAME.application.renderer.render(container, TEXTURE['character_' + character + '_missed' + i + '_' + side]);

                        }

                    };

                    f(side);
                    if (side === 'se') f('sw');
                    if (side === 'e')  f('w');
                    if (side === 'ne') f('nw');

                });

            });

        },

        get: (model, action, side) => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            if (action === 'stand') {

                return [
                    TEXTURE['character_' + character + '_stand_' + side]
                ]

            }

            if (['walk', 'run'].includes(action)) {

                return [
                    TEXTURE['character_' + character + '_stand_' + side],
                    TEXTURE['character_' + character + '_walk1_' + side],
                    TEXTURE['character_' + character + '_stand_' + side],
                    TEXTURE['character_' + character + '_walk2_' + side]
                ]

            }

            if (action === 'kill') {

                return [
                    TEXTURE['character_' + character + '_kill1_' + side],
                    TEXTURE['character_' + character + '_kill2_' + side]
                ]

            }

            if (action === 'killed') {

                return [
                    TEXTURE['character_' + character + '_killed1_' + side],
                    TEXTURE['character_' + character + '_killed2_' + side],
                    TEXTURE['character_' + character + '_killed3_' + side],
                    TEXTURE['character_' + character + '_killed4_' + side]
                ]

            }

            if (action === 'stun') {

                return [
                    TEXTURE['character_' + character + '_stun1_' + side],
                    TEXTURE['character_' + character + '_stun2_' + side]
                ]

            }

            if (action === 'stunned') {

                return [
                    TEXTURE['character_' + character + '_stunned1_' + side],
                    TEXTURE['character_' + character + '_stunned2_' + side],
                    TEXTURE['character_' + character + '_stunned3_' + side],
                    TEXTURE['character_' + character + '_stunned4_' + side]
                ]

            }

            if (action === 'miss') {

                return [
                    TEXTURE['character_' + character + '_miss1_' + side],
                    TEXTURE['character_' + character + '_miss2_' + side],
                    TEXTURE['character_' + character + '_miss3_' + side],
                    TEXTURE['character_' + character + '_miss4_' + side]
                ]

            }

            if (action === 'missed') {

                return [
                    TEXTURE['character_' + character + '_missed1_' + side],
                    TEXTURE['character_' + character + '_missed2_' + side],
                    TEXTURE['character_' + character + '_missed3_' + side],
                    TEXTURE['character_' + character + '_missed2_' + side]
                ]

            }

        },

        preview: model => {

            let character = TEXTURE.character.store[model % TEXTURE.character.store.length];

            return TEXTURE['character_' + character];

        }

    }

};