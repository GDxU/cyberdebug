window.TEXTURE = {

    init: callback => {

        TEXTURE.marker.import();
        TEXTURE.traffic.import();
        TEXTURE.rain.import();
        TEXTURE.hud.import();
        TEXTURE.weapon.import();
        TEXTURE.road.import();
        TEXTURE.character.import(() => {

            TEXTURE.car.import(() => {

                TEXTURE.building.import(() => {

                    PIXI.loader.load(() => {

                        TEXTURE.marker.init();
                        TEXTURE.traffic.init();
                        TEXTURE.rain.init();
                        TEXTURE.hud.init();
                        TEXTURE.weapon.init();
                        TEXTURE.road.init();
                        TEXTURE.character.init();
                        TEXTURE.car.init();
                        TEXTURE.building.init();

                        callback();

                    });

                });

            });

        });

    },

    marker: {

        import: () => {

            PIXI.loader.add('/client/image/cursor/pin.png');

        },

        init: () => {

            TEXTURE['marker_pin'] = PIXI.loader.resources['/client/image/cursor/pin.png'].texture;

        }

    },

    traffic: {


        import: () => {

            PIXI.loader.add('/client/image/traffic/yellow.png');
            PIXI.loader.add('/client/image/traffic/vertical.png');
            PIXI.loader.add('/client/image/traffic/horizontal.png');

        },

        init: () => {

            TEXTURE['traffic_yellow']     = PIXI.loader.resources['/client/image/traffic/yellow.png'].texture;
            TEXTURE['traffic_vertical']   = PIXI.loader.resources['/client/image/traffic/vertical.png'].texture;
            TEXTURE['traffic_horizontal'] = PIXI.loader.resources['/client/image/traffic/horizontal.png'].texture;

        },

        get: type => {

            return TEXTURE['traffic_' + type];

        }

    },

    rain: {

        import: () => {

            PIXI.loader.add('/client/image/sfx/rain.png');

        },

        init: () => {

            TEXTURE['rain_4'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/sfx/rain.png'].texture,
                new PIXI.Rectangle(0, 0, 16, 16)
            );

            TEXTURE['rain_3'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/sfx/rain.png'].texture,
                new PIXI.Rectangle(16, 0, 12, 16)
            );

            TEXTURE['rain_2'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/sfx/rain.png'].texture,
                new PIXI.Rectangle(28, 0, 8, 16)
            );

            TEXTURE['rain_1'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/sfx/rain.png'].texture,
                new PIXI.Rectangle(36, 0, 4, 16)
            );

            TEXTURE['rain_0'] = new PIXI.Texture(
                PIXI.loader.resources['/client/image/sfx/rain.png'].texture,
                new PIXI.Rectangle(40, 0, 1, 16)
            );

        },

        get: wind => TEXTURE['rain_' + wind]

    },

    hud: {

        import: () => {

            PIXI.loader.add('/client/image/hud/radar.png');
            PIXI.loader.add('/client/image/hud/detector.png');
            PIXI.loader.add('/client/image/hud/line.png');
            PIXI.loader.add('/client/image/hud/frame.png');

        },

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

        import: () => {

            PIXI.loader.add('/client/image/weapon/katana.png');
            PIXI.loader.add('/client/image/weapon/taser.png');

        },

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

    road: {

        import: () => {

            PIXI.loader.add('/client/image/road/small_cross.png');
            PIXI.loader.add('/client/image/road/small_line.png');
            PIXI.loader.add('/client/image/road/small_t.png');

            PIXI.loader.add('/client/image/road/medium_cross.png');
            PIXI.loader.add('/client/image/road/medium_line.png');
            PIXI.loader.add('/client/image/road/medium_t.png');

            PIXI.loader.add('/client/image/road/large_cross.png');
            PIXI.loader.add('/client/image/road/large_across.png');
            PIXI.loader.add('/client/image/road/large_line.png');
            PIXI.loader.add('/client/image/road/large_t.png');

        },

        init: () => {

            TEXTURE.road.initSmall();
            TEXTURE.road.initMedium();
            TEXTURE.road.initLarge();

        },

        initSmall: () => {

            let r = new PIXI.Rectangle(0, 0, 250, 250);

            TEXTURE['road_small_cross'] = PIXI.loader.resources['/client/image/road/small_cross.png'].texture;

            TEXTURE['road_small_vertical'] = PIXI.loader.resources['/client/image/road/small_line.png'].texture;
            TEXTURE['road_small_horizontal'] = new PIXI.Texture(TEXTURE['road_small_vertical'], r, null, null, 2);

            TEXTURE['road_small_south'] = PIXI.loader.resources['/client/image/road/small_t.png'].texture;
            TEXTURE['road_small_east'] = new PIXI.Texture(TEXTURE['road_small_south'], r, null, null, 2);
            TEXTURE['road_small_north'] = new PIXI.Texture(TEXTURE['road_small_south'], r, null, null, 4);
            TEXTURE['road_small_west'] = new PIXI.Texture(TEXTURE['road_small_south'], r, null, null, 6);

        },

        initMedium: () => {

            let r = new PIXI.Rectangle(0, 0, 250, 250);

            TEXTURE['road_medium_cross_se'] = PIXI.loader.resources['/client/image/road/medium_cross.png'].texture;
            TEXTURE['road_medium_cross_ne'] = new PIXI.Texture(TEXTURE['road_medium_cross_se'], r, null, null, 2);
            TEXTURE['road_medium_cross_nw'] = new PIXI.Texture(TEXTURE['road_medium_cross_se'], r, null, null, 4);
            TEXTURE['road_medium_cross_sw'] = new PIXI.Texture(TEXTURE['road_medium_cross_se'], r, null, null, 6);

            TEXTURE['road_medium_vertical_east'] = PIXI.loader.resources['/client/image/road/medium_line.png'].texture;
            TEXTURE['road_medium_horizontal_north'] = new PIXI.Texture(TEXTURE['road_medium_vertical_east'], r, null, null, 2);
            TEXTURE['road_medium_vertical_west'] = new PIXI.Texture(TEXTURE['road_medium_vertical_east'], r, null, null, 4);
            TEXTURE['road_medium_horizontal_south'] = new PIXI.Texture(TEXTURE['road_medium_vertical_east'], r, null, null, 6);

            TEXTURE['road_medium_south'] = PIXI.loader.resources['/client/image/road/medium_t.png'].texture;
            TEXTURE['road_medium_east'] = new PIXI.Texture(TEXTURE['road_medium_south'], r, null, null, 2);
            TEXTURE['road_medium_north'] = new PIXI.Texture(TEXTURE['road_medium_south'], r, null, null, 4);
            TEXTURE['road_medium_west'] = new PIXI.Texture(TEXTURE['road_medium_south'], r, null, null, 6);

        },

        initLarge: () => {

            let r = new PIXI.Rectangle(0, 0, 250, 250);

            TEXTURE['road_large_cross'] = PIXI.loader.resources['/client/image/road/large_cross.png'].texture;

            TEXTURE['road_large_vertical_across'] = PIXI.loader.resources['/client/image/road/large_across.png'].texture;
            TEXTURE['road_large_horizontal_across'] = new PIXI.Texture(TEXTURE['road_large_vertical_across'], r, null, null, 2);

            TEXTURE['road_large_vertical'] = PIXI.loader.resources['/client/image/road/large_line.png'].texture;
            TEXTURE['road_large_horizontal'] = new PIXI.Texture(TEXTURE['road_large_vertical'], r, null, null, 2);

            TEXTURE['road_large_south'] = PIXI.loader.resources['/client/image/road/large_t.png'].texture;
            TEXTURE['road_large_east'] = new PIXI.Texture(TEXTURE['road_large_south'], r, null, null, 2);
            TEXTURE['road_large_north'] = new PIXI.Texture(TEXTURE['road_large_south'], r, null, null, 4);
            TEXTURE['road_large_west'] = new PIXI.Texture(TEXTURE['road_large_south'], r, null, null, 6);

        }

    },

    character: {

        import: callback => {

            PIXI.loader.add('/client/image/sfx/blood.png');
            PIXI.loader.add('/client/image/sfx/miss.png');
            PIXI.loader.add('/client/image/sfx/stunned.png');

            TOOL.getJSON('/character', data => {

                data.forEach(character => PIXI.loader.add('/client/image/character/' + character + '.png'));

                TEXTURE.character.store = data;

                callback();

            });

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

            if (action === 'stand') {

                return [
                    TEXTURE['character_' + model + '_stand_' + side]
                ]

            }

            if (['walk', 'run'].includes(action)) {

                return [
                    TEXTURE['character_' + model + '_stand_' + side],
                    TEXTURE['character_' + model + '_walk1_' + side],
                    TEXTURE['character_' + model + '_stand_' + side],
                    TEXTURE['character_' + model + '_walk2_' + side]
                ]

            }

            if (action === 'kill') {

                return [
                    TEXTURE['character_' + model + '_kill1_' + side],
                    TEXTURE['character_' + model + '_kill2_' + side]
                ]

            }

            if (action === 'killed') {

                return [
                    TEXTURE['character_' + model + '_killed1_' + side],
                    TEXTURE['character_' + model + '_killed2_' + side],
                    TEXTURE['character_' + model + '_killed3_' + side],
                    TEXTURE['character_' + model + '_killed4_' + side]
                ]

            }

            if (action === 'stun') {

                return [
                    TEXTURE['character_' + model + '_stun1_' + side],
                    TEXTURE['character_' + model + '_stun2_' + side]
                ]

            }

            if (action === 'stunned') {

                return [
                    TEXTURE['character_' + model + '_stunned1_' + side],
                    TEXTURE['character_' + model + '_stunned2_' + side],
                    TEXTURE['character_' + model + '_stunned3_' + side],
                    TEXTURE['character_' + model + '_stunned4_' + side]
                ]

            }

            if (action === 'miss') {

                return [
                    TEXTURE['character_' + model + '_miss1_' + side],
                    TEXTURE['character_' + model + '_miss2_' + side],
                    TEXTURE['character_' + model + '_miss3_' + side],
                    TEXTURE['character_' + model + '_miss4_' + side]
                ]

            }

            if (action === 'missed') {

                return [
                    TEXTURE['character_' + model + '_missed1_' + side],
                    TEXTURE['character_' + model + '_missed2_' + side],
                    TEXTURE['character_' + model + '_missed3_' + side],
                    TEXTURE['character_' + model + '_missed2_' + side]
                ]

            }

        },

        preview: model => {

            return TEXTURE['character_' + model];

        }

    },

    car: {

        import: callback => {

            TOOL.getJSON('/car', data => {

                data.forEach(car => PIXI.loader.add('/client/image/car/' + car + '.png'));

                TEXTURE.car.store = data;

                callback();

            });

        },

        init: () => {

            TEXTURE.car.store.forEach(car => {

                let texture = PIXI.loader.resources['/client/image/car/' + car + '.png'].texture;

                TEXTURE['car_' + car + '_s'] = new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 75, 100));
                TEXTURE['car_' + car + '_n'] = new PIXI.Texture(texture, new PIXI.Rectangle(75, 0, 75, 100));
                TEXTURE['car_' + car + '_w'] = new PIXI.Texture(texture, new PIXI.Rectangle(150, 0, 150, 100));
                TEXTURE['car_' + car + '_e'] = new PIXI.Texture(texture, new PIXI.Rectangle(150, 0, 150, 100), null, null, 12);

            });

        },

        get: (model, side) => {

            let car = TEXTURE.car.store[model % TEXTURE.car.store.length];

            return TEXTURE['car_' + car + '_' + side];

        }

    },

    building: {

        import: callback => {

            TOOL.getJSON('/building/base', data => {

                data.forEach(item => PIXI.loader.add('/client/image/building/base/' + item + '.png'));
                TEXTURE.building.base = data;

                TOOL.getJSON('/building/trash', data => {

                    data.forEach(item => PIXI.loader.add('/client/image/building/trash/' + item + '.png'));
                    TEXTURE.building.trash = data;

                    TOOL.getJSON('/building/cyan', data => {

                        data.forEach(item => PIXI.loader.add('/client/image/building/cyan/' + item + '.png'));
                        TEXTURE.building.cyan = data;

                        TOOL.getJSON('/building/magenta', data => {

                            data.forEach(item => PIXI.loader.add('/client/image/building/magenta/' + item + '.png'));
                            TEXTURE.building.magenta = data;

                            TOOL.getJSON('/building/yellow', data => {

                                data.forEach(item => PIXI.loader.add('/client/image/building/yellow/' + item + '.png'));
                                TEXTURE.building.yellow = data;

                                TOOL.getJSON('/building/cat', data => {

                                    data.forEach(item => PIXI.loader.add('/client/image/building/cat/' + item + '.png'));
                                    TEXTURE.building.cat = data;

                                    TOOL.getJSON('/building/banner', data => {

                                        data.forEach(item => PIXI.loader.add('/client/image/building/banner/' + item + '.png'));
                                        TEXTURE.building.banner = data;

                                        callback();

                                    });

                                });

                            });

                        });

                    });

                });

            });

        },

        init: () => {

            let up = new PIXI.Rectangle(0, 0, 250, 250);
            let down = new PIXI.Rectangle(0, 250, 250, 250);

            TEXTURE.building.base.forEach(item => {

                let texture = PIXI.loader.resources['/client/image/building/base/' + item + '.png'].texture;

                TEXTURE['building_base_' + item] = texture;
                TEXTURE['building_base_' + item + '_up'] = new PIXI.Texture(texture, up);
                TEXTURE['building_base_' + item + '_down'] = new PIXI.Texture(texture, down);

            });

            TEXTURE.building.trash.forEach(item => TEXTURE['building_trash_' + item] = PIXI.loader.resources['/client/image/building/trash/' + item + '.png'].texture);

            TEXTURE.building.cyan.forEach(item => {

                let texture = PIXI.loader.resources['/client/image/building/cyan/' + item + '.png'].texture;

                TEXTURE['building_cyan_' + item] = texture;
                TEXTURE['building_cyan_' + item + '_up'] = new PIXI.Texture(texture, up);
                TEXTURE['building_cyan_' + item + '_down'] = new PIXI.Texture(texture, down);

            });

            TEXTURE.building.magenta.forEach(item => {

                let texture = PIXI.loader.resources['/client/image/building/magenta/' + item + '.png'].texture;

                TEXTURE['building_magenta_' + item] = texture;
                TEXTURE['building_magenta_' + item + '_up'] = new PIXI.Texture(texture, up);
                TEXTURE['building_magenta_' + item + '_down'] = new PIXI.Texture(texture, down);

            });

            TEXTURE.building.yellow.forEach(item => {

                let texture = PIXI.loader.resources['/client/image/building/yellow/' + item + '.png'].texture;

                TEXTURE['building_yellow_' + item] = texture;
                TEXTURE['building_yellow_' + item + '_up'] = new PIXI.Texture(texture, up);
                TEXTURE['building_yellow_' + item + '_down'] = new PIXI.Texture(texture, down);

            });

            TEXTURE.building.cat.forEach(item => TEXTURE['building_cat_' + item] = PIXI.loader.resources['/client/image/building/cat/' + item + '.png'].texture);

            TEXTURE.building.banner.forEach(item => {

                let texture = PIXI.loader.resources['/client/image/building/banner/' + item + '.png'].texture;

                TEXTURE['building_banner_' + item + '_0'] = new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 108, 28));
                TEXTURE['building_banner_' + item + '_1'] = new PIXI.Texture(texture, new PIXI.Rectangle(0, 28, 108, 28));

            });

        }

    }

};