window.USER = {

    id: undefined,
    name: undefined,

    sync: data => {

        if (data.id) {
            USER.id = data.id;
        }

    }

};