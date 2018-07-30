window.addEventListener('load', () => {

    CONFIG.init(() => {
        GAME.init();
        GUI.init();
        TEXTURE.init(() => {
            LAYER.init(() => {
                GUI.menu.visible(true);
            });
        });
    });

});