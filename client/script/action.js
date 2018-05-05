window.ACTION = {

    pin: undefined,

    init: () => {

        ACTION.pin = new PIXI.Sprite(LOADER.loader.resources.pin.texture);

        ACTION.pin.visible = false;

        ACTION.pin.x = 0;
        ACTION.pin.y = 0;

        GAME.world.addChild(ACTION.pin);

    },

    sync: () => {

        if (!ACTION.pin) ACTION.init();

        ACTION.pin.visible = !(
            ACTION.pin &&
            CAMERA.target &&
            ACTION.pin.x === CAMERA.target.sprite.x &&
            ACTION.pin.y === CAMERA.target.sprite.y
        );

    }

};