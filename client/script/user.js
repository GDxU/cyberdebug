window.USER = {

    id: undefined,
    name: undefined,

    sync: () => {

        if (WS.data.id) {

            USER.id = WS.data.id;

        }

    }

};