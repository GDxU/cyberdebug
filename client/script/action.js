window.ACTION = {

    pin: undefined,

    init: () => {

        ACTION.pin = new PIXI.Graphics();

        ACTION.pin.visible = false;

        ACTION.pin.lineStyle(1,0xff0000);
        ACTION.pin.moveTo(0, 11);
        ACTION.pin.lineTo(11, 0);
        ACTION.pin.moveTo(0, 0);
        ACTION.pin.lineTo(11, 11);

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