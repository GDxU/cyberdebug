window.USER = {

    id: undefined,
    name: undefined,

    sync: data => {

        if (data.id) {
            console.log(data);
            USER.id = data.id;
        }

    }

};