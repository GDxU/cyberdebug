window.ACTION = {

    pin: undefined,

    target: undefined,

    init: () => {

        ACTION.pin = new PIXI.Sprite(TEXTURE['marker_pin']);
        ACTION.pin.anchor.set(0.5, 0.5);
        ACTION.pin.visible = false;
        LAYER.marker.addChild(ACTION.pin);

        GAME.application.stage.interactive = true;

        GAME.application.stage.on('pointerdown', e => {

            let message = undefined;

            if (e.target.target && (USER.hunter || USER.contract)) {

                let id = e.target.target.id;

                ACTION.follow(id);
                message = JSON.stringify({action: {id: id}});

            } else {

                let point = {
                    x: Math.floor(e.data.global.x / CAMERA.scale - LAYER.world.x),
                    y: Math.floor(e.data.global.y / CAMERA.scale - LAYER.world.y)
                };

                ACTION.goto(point);
                message = JSON.stringify({action: point});

            }

            if (WS.client.readyState === WebSocket.OPEN) {

                WS.client.send(message);
                console.log('WS send ' + message);

            }

        });

    },

    sync: () => {

        if (ACTION.pin && ACTION.pin.visible && USER.target) {

            if (ACTION.target) {

                ACTION.pin.x = ACTION.target.sprite.x;
                ACTION.pin.y = ACTION.target.sprite.y;

                if (
                    Math.abs(ACTION.pin.x - USER.target.sprite.x) < 60 &&
                    Math.abs(ACTION.pin.y - USER.target.sprite.y) < 60
                ) {

                    ACTION.target = undefined;
                    ACTION.pin.visible = false;

                }

            } else {

                ACTION.pin.visible = !(
                    ACTION.pin.x === USER.target.sprite.x &&
                    ACTION.pin.y === USER.target.sprite.y
                );

            }

        }

    },

    goto: point => {

        ACTION.target = undefined;
        ACTION.pin.x = point.x;
        ACTION.pin.y = point.y;
        ACTION.pin.visible = true;

    },

    follow: id => {

        ACTION.target = TARGET.get(id);

        if (ACTION.target) {

            ACTION.pin.x = ACTION.target.sprite.x;
            ACTION.pin.y = ACTION.target.sprite.y;
            ACTION.pin.visible = true;

        }

    }

};