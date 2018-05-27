window.addEventListener('load', () => {

    GAME.init();
    GUI.init();
    TEXTURE.init(() => GUI.menu.visible(true));

});