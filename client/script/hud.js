window.HUD = {

    sync: () => {

        HUD.radar.store.forEach((radar, i) => {

            radar.x = CAMERA.getX();
            radar.y = CAMERA.getY();

            if (USER.contract) {

                radar.rotation = USER.contract.azimuth;
                radar.visible = USER.contract.radar === i;

            } else radar.visible = false;

        });

        HUD.detector.store.forEach((detector, i) => {

            detector.x = CAMERA.getX();
            detector.y = CAMERA.getY(70);

            if (typeof USER.detector === 'number') {

                detector.visible = USER.detector === i;

            } else detector.visible = false;

        });

    },

    init: () => {

        HUD.radar.init();
        HUD.detector.init();

    },

    radar: {

        store: [],

        init: () => {

            if (!HUD.radar.store.length) {

                for (let i = 0; i < 5; i++) {

                    let radar = new PIXI.Sprite(TEXTURE['radar_' + i]);

                    radar.visible = false;
                    radar.anchor.set(0.5);

                    HUD.radar.store.push(radar);
                    GAME.hud.addChild(radar);

                }

            }

        }

    },

    detector: {

        store: [],

        init: () => {

            if (!HUD.detector.store.length) {

                for (let i = 0; i < 5; i++) {

                    let detector = new PIXI.extras.AnimatedSprite([
                        TEXTURE['detector_' + i + '_0'],
                        TEXTURE['detector_' + i + '_1'],
                        TEXTURE['detector_' + i + '_2']
                    ]);

                    detector.visible = false;
                    detector.anchor.set(0.5);
                    detector.animationSpeed = 0.1;
                    detector.play();

                    HUD.detector.store.push(detector);
                    GAME.hud.addChild(detector);

                }

            }

        }

    }

};