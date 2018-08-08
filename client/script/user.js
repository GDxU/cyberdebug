window.USER = {

    id: undefined,
    name: undefined,
    contract: undefined,
    hunter: undefined,

    target: undefined,

    sfx: {
        glitch: undefined
    },

    sync: () => {

        if (WS.data.user) {

            USER.id       = WS.data.user.id;
            USER.contract = WS.data.user.contract;
            USER.hunter   = WS.data.user.hunter;
            USER.detector = WS.data.user.detector;
            USER.morph    = WS.data.user.morph;
            USER.teleport = WS.data.user.teleport;
            USER.glitch   = WS.data.user.glitch;

            // проверка на инициализацию модели игрока

            if (!USER.target && USER.id) USER.target = TARGET.get(USER.id);

            // включение эффектов

            /*

            let sfx = [];

            if (!USER.sfx.glitch && WS.data.user.sfx.includes('glitch')) {

                let d = 32;

                USER.sfx.glitch = new PIXI.filters.GlitchFilter({
                    slices: Math.floor(window.innerHeight / 100),
                    offset: Math.floor(window.innerWidth / 10),
                    fillMode: PIXI.filters.GlitchFilter.CLAMP,
                    seed: Math.random(),
                    red:   [TOOL.getRandomInt(-d, d), TOOL.getRandomInt(-d, d)],
                    green: [TOOL.getRandomInt(-d, d), TOOL.getRandomInt(-d, d)],
                    blue:  [TOOL.getRandomInt(-d, d), TOOL.getRandomInt(-d, d)]
                });

                sfx.push(USER.sfx.glitch);

            }

            if (sfx.length > 0) GAME.application.stage.filters = sfx;

            if (USER.sfx.glitch && !WS.data.user.sfx.includes('glitch')) {

                GAME.application.stage.filters = GAME.application.stage.filters.filter(i => i !== USER.sfx.glitch);
                USER.sfx.glitch = undefined;

            }

            */

        }

    }

};