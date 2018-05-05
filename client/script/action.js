window.ACTION = {

    pin: undefined,

    init: () => {

        ACTION.pin = new PIXI.Sprite(LOADER.loader.resources.pin.texture);
        ACTION.pin.visible = false;
        GAME.marker.addChild(ACTION.pin);

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