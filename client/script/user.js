window.USER = {

    id: undefined,
    name: undefined,
    model: undefined,

    target: undefined,

    synchronized: false,

    sync: () => {

        if (!USER.synchronized) {

            if (WS.data.id) {

                USER.id = WS.data.id;

            }

            if (USER.id) {

                let target = TARGET.get(USER.id);
                if (target) {

                    USER.target = target;

                    USER.model = target.model;

                    USER.synchronized = true;

                }

            }

        }

    }

};