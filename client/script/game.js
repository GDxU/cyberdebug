window.GAME = {

    application: undefined,

    init: () => {

        GAME.application = new PIXI.Application(window.innerWidth, window.innerHeight, {
            transparent: true
        });

        GAME.application.renderer.roundPixels = true;
        GAME.application.renderer.autoResize = true;
        GAME.application.renderer.plugins.interaction.cursorStyles.default = "url('/client/image/cursor/default.png') 11 11, auto";
        GAME.application.renderer.plugins.interaction.cursorStyles.hover = "url('/client/image/cursor/pointer.png') 11 11, auto";

        document.body.appendChild(GAME.application.view);

        window.addEventListener('resize', function () {

            GAME.application.renderer.resize(window.innerWidth, window.innerHeight);

            if (WS.client.readyState === WebSocket.OPEN) WS.client.send(JSON.stringify({
                camera: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            }));

        });

    }

};