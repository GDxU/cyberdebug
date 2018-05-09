window.USER = {

    id: undefined,
    name: undefined,
    contract: undefined,
    hunter: undefined,

    target: undefined,

    sync: () => {

        if (WS.data.user) {

            USER.id =       WS.data.user.id;
            USER.contract = WS.data.user.contract;
            USER.hunter =   WS.data.user.hunter;
            USER.detector = WS.data.user.detector;

            if (!USER.target && USER.id) {

                USER.target = TARGET.get(USER.id);

                GUI.user.show();
                GUI.contract.show();

            }

            GUI.user.sync();
            GUI.contract.sync();

        }

    }

};