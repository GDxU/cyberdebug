window.HUD = {

    sync: () => {

        HUD.radar.sync();
        HUD.detector.sync();
        HUD.info.sync();
        HUD.alert.sync();

    },

    init: () => {

        HUD.radar.init();
        HUD.detector.init();
        HUD.info.init();
        HUD.alert.init();

    },

    radar: {

        store: [],

        init: () => {

            if (!HUD.radar.store.length) {

                for (let i = 0; i < 5; i++) {

                    let radar = new PIXI.Sprite(TEXTURE['hud_radar_' + i]);

                    radar.visible = false;
                    radar.anchor.set(0.5);

                    HUD.radar.store.push(radar);
                    GAME.hud.addChild(radar);

                }

            }

        },

        sync: () => {

            HUD.radar.store.forEach((radar, i) => {

                radar.x = CAMERA.getX();
                radar.y = CAMERA.getY();

                if (USER.contract) {

                    radar.rotation = USER.contract.azimuth;
                    radar.visible = USER.contract.radar === i;

                } else radar.visible = false;

            });

        }

    },

    detector: {

        store: [],

        init: () => {

            if (!HUD.detector.store.length) {

                for (let i = 0; i < 5; i++) {

                    let detector = new PIXI.extras.AnimatedSprite([
                        TEXTURE['hud_detector_' + i + '_0'],
                        TEXTURE['hud_detector_' + i + '_1'],
                        TEXTURE['hud_detector_' + i + '_2']
                    ]);

                    detector.visible = false;
                    detector.anchor.set(0.5);
                    detector.animationSpeed = 0.1;
                    detector.play();

                    HUD.detector.store.push(detector);
                    GAME.hud.addChild(detector);

                }

            }

        },

        sync: () => {

            HUD.detector.store.forEach((detector, i) => {

                detector.x = CAMERA.getX();
                detector.y = CAMERA.getY(70);

                if (typeof USER.detector === 'number') {

                    detector.visible = USER.detector === i;

                } else detector.visible = false;

            });

        }

    },

    info: {

        init: () => {

            if (!HUD.info.user) {

                HUD.info.container = new PIXI.Container();

                // user

                let style = new PIXI.TextStyle({
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#00ffff'
                });

                HUD.info.user = {
                    name: new PIXI.Text('User', style),
                    line: new PIXI.Sprite(TEXTURE['hud_line_user']),
                    hunter: new PIXI.Text('0', style)
                };

                HUD.info.user.name.anchor.set(1, 1);
                HUD.info.user.name.x = -55;
                HUD.info.user.name.y = -5;
                HUD.info.container.addChild(HUD.info.user.name);

                HUD.info.user.line.anchor.set(1, 0.5);
                HUD.info.user.line.x = -50;
                HUD.info.user.line.y = 0;
                HUD.info.container.addChild(HUD.info.user.line);

                HUD.info.user.hunter.anchor.set(1, 0);
                HUD.info.user.hunter.x = -55;
                HUD.info.user.hunter.y = 5;
                HUD.info.container.addChild(HUD.info.user.hunter);

                // target

                style = new PIXI.TextStyle({
                    fontFamily: 'EuropeExt Normal',
                    fontSize: 12,
                    fill: '#ff00ff'
                });

                HUD.info.target = {
                    sprite: new PIXI.Sprite(PIXI.loader.resources['/client/image/hud/unknown.png'].texture),
                    name: new PIXI.Text('Target', style),
                    line: new PIXI.Sprite(TEXTURE['hud_line_target']),
                    hunter: new PIXI.Text('0', style)
                };

                HUD.info.target.sprite.anchor.set(0, 1);
                HUD.info.target.sprite.x = 50;
                HUD.info.target.sprite.y = -22;
                HUD.info.container.addChild(HUD.info.target.sprite);

                HUD.info.target.name.anchor.set(0, 1);
                HUD.info.target.name.x = 55;
                HUD.info.target.name.y = -5;
                HUD.info.container.addChild(HUD.info.target.name);

                HUD.info.target.line.anchor.set(0, 0.5);
                HUD.info.target.line.x = 50;
                HUD.info.target.line.y = 0;
                HUD.info.container.addChild(HUD.info.target.line);

                HUD.info.target.hunter.anchor.set(0, 0);
                HUD.info.target.hunter.x = 55;
                HUD.info.target.hunter.y = 5;
                HUD.info.container.addChild(HUD.info.target.hunter);

                // hud

                GAME.hud.addChild(HUD.info.container);

            }

        },

        sync: () => {

            HUD.info.user.name.text = USER.name;
            HUD.info.user.hunter.text = USER.hunter;

            HUD.info.target.sprite.texture = USER.contract ? TEXTURE.character(USER.contract.model, 'stand', 's')[0] : PIXI.loader.resources['/client/image/hud/unknown.png'].texture;
            HUD.info.target.name.text = USER.contract ? USER.contract.name : 'Поиск...';
            HUD.info.target.hunter.text = USER.contract ? USER.contract.hunter : '?';

            HUD.info.container.x = CAMERA.getX();
            HUD.info.container.y = CAMERA.getY();

        }

    },

    alert: {

        init: () => {

            // очки

            HUD.alert.score = new PIXI.Text('', {
                fontFamily: 'New_Zelek',
                fontSize: 24
            });

            HUD.alert.score.anchor.set(0.5, 1);

            GAME.hud.addChild(HUD.alert.score);

            // информация

            HUD.alert.info = new PIXI.Text('', {
                fontFamily: 'New_Zelek',
                fontSize: 24
            });

            HUD.alert.info.anchor.set(0.5, 1);

            GAME.hud.addChild(HUD.alert.info);

        },

        sync: () => {

            HUD.alert.score.x = CAMERA.getX();
            HUD.alert.score.y = CAMERA.getY(-90);

            HUD.alert.info.x = CAMERA.getX();
            HUD.alert.info.y = CAMERA.getY(-70);

            if (WS.data.alert) {

                // удаление алерта при наличии

                if (HUD.alert.timeout) {

                    clearTimeout(HUD.alert.timeout);
                    HUD.alert.timeout = undefined;
                    HUD.alert.score.text = '';
                    HUD.alert.info.text = '';

                }

                setTimeout(() => {

                    HUD.alert.timeout = undefined;
                    HUD.alert.score.text = '';
                    HUD.alert.info.text = '';

                }, 2000);

                // disconnect

                if (WS.data.alert === 'disconnect') {
                    HUD.alert.info.text = 'Контракт аннулирован';
                    HUD.alert.info.style.fill = '#ffff00';
                }

                // kill

                if (WS.data.alert === 'killed') {
                    HUD.alert.info.text = TOOL.getRandomInt(100) ? 'Убит' : 'Потрачено';
                    HUD.alert.info.style.fill = '#ff00ff';
                }

                if (WS.data.alert === 'kill') {
                    HUD.alert.score.text = '+200';
                    HUD.alert.score.style.fill = '#00ffff';
                    HUD.alert.info.text = 'Убийство';
                    HUD.alert.info.style.fill = '#00ffff';
                }

                if (WS.data.alert === 'fail') {
                    HUD.alert.info.text = 'Контракт потерян';
                    HUD.alert.info.style.fill = '#ffff00';
                }

                // miss

                if (WS.data.alert === 'miss') {
                    HUD.alert.info.text = 'Промах';
                    HUD.alert.info.style.fill = '#ffff00';
                }

                // stun

                if (WS.data.alert === 'stun') {
                    HUD.alert.score.text = '+100';
                    HUD.alert.score.style.fill = '#00ffff';
                    HUD.alert.info.text = 'Оглушение';
                    HUD.alert.info.style.fill = '#00ffff';
                }

                if (WS.data.alert === 'stunned') {
                    HUD.alert.score.text = '-50';
                    HUD.alert.score.style.fill = '#ff00ff';
                    HUD.alert.info.text = 'Оглушен';
                    HUD.alert.info.style.fill = '#ff00ff';
                }

            }

        }

    }

};