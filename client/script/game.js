window.GAME = {

    application: undefined,

    init: () => {

        // Пропуск приветствия рендринга
        PIXI.utils.skipHello();

        // Точность в шейдере фрагментов
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

        // Точность в вершинном шейдере
        PIXI.settings.PRECISION_VERTEX = PIXI.PRECISION.HIGH;

        // Масштабирование
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        GAME.application = new PIXI.Application(window.innerWidth, window.innerHeight, {
            transparent: true
        });

        GAME.application.stage.scale.set(CAMERA.scale);

        // Отлючение интерполяции пикселей
        GAME.application.renderer.roundPixels = true;

        // Автоматическое изменение размера области рендринга
        GAME.application.renderer.autoResize = true;

        GAME.application.renderer.plugins.interaction.cursorStyles.default = "url('/client/image/cursor/default.png') 11 11, auto";
        GAME.application.renderer.plugins.interaction.cursorStyles.hover = "url('/client/image/cursor/pointer.png') 11 11, auto";

        GAME.application.stage.filters = [];

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