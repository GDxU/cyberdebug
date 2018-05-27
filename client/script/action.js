window.ACTION = {

    pin: undefined,

    target: undefined,

    init: () => {

        ACTION.pin = new PIXI.Sprite(PIXI.loader.resources.pin.texture);
        ACTION.pin.anchor.set(0.5, 0.5);
        ACTION.pin.visible = false;
        LAYER.marker.addChild(ACTION.pin);

    },

    sync: () => {

        if (!ACTION.pin) ACTION.init();

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