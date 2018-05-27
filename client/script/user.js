window.USER = {

    id: undefined,
    name: undefined,
    contract: undefined,
    hunter: undefined,

    target: undefined,

    sync: () => {

        if (WS.data.user) {

            USER.id       = WS.data.user.id;
            USER.contract = WS.data.user.contract;
            USER.hunter   = WS.data.user.hunter;
            USER.detector = WS.data.user.detector;
            USER.morph    = WS.data.user.morph;
            USER.teleport = WS.data.user.teleport;

            // проверка на инициализацию модели игрока

            if (!USER.target && USER.id) USER.target = TARGET.get(USER.id);

        }

    }

};