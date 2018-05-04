window.WS = {

    data: undefined,
    client: undefined,

    init: function () {

        WS.client = new WebSocket('ws://' + window.location.host + ':81');

        WS.client.addEventListener('open', () => {

            console.log('WS open');

            let message = {
                name: USER.name,
                camera: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            };

            WS.client.send(JSON.stringify(message));

            console.log('WS message', message);

        });

        WS.client.addEventListener('close', () => {

            console.log('WS close');

        });

        WS.client.addEventListener('error', () => {

            console.log('WS error');

        });

        WS.client.addEventListener('message', message => {

            // console.log('WS message', message);

            WS.data = JSON.parse(message.data);

            USER.sync(WS.data);
            TARGET.sync(WS.data);
            CAMERA.sync();
            ACTION.sync();
            DEBUG.sync(WS.data);

        });

    }

};