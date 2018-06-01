window.addEventListener('load', () => {

    GAME.init();
    GUI.init();
    TEXTURE.init(() => {
        LAYER.init(() => {
            GUI.menu.visible(true);
        });
    });

});