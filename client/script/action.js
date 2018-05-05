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
            USER.target &&
            ACTION.pin.x === USER.target.sprite.x &&
            ACTION.pin.y === USER.target.sprite.y
        );

    }

};