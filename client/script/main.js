window.addEventListener('load', () => {

    // settings

    PIXI.utils.skipHello();
    PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // init

    GAME.init();
    TEXTURE.init();
    GUI.init();

});