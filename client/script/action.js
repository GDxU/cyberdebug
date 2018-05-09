window.ACTION = {

    pin: undefined,

    init: () => {

        ACTION.pin = new PIXI.Sprite(PIXI.loader.resources.pin.texture);
        ACTION.pin.anchor.set(0.5, 0.5);
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