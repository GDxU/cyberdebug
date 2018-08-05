window.WS = {

    data: undefined,
    client: undefined,

    init: function () {

        WS.client = new WebSocket('ws://' + window.location.host + ':81');

        WS.client.addEventListener('open', () => {

            if (CONFIG.debug) console.log('WS open');

            let message = {
                user: {
                    name: USER.name
                },
                camera: {
                    w: window.innerWidth,
                    h: window.innerHeight
                }
            };

            WS.client.send(JSON.stringify(message));

            if (CONFIG.debug) console.log('WS message', message);

        });

        WS.client.addEventListener('close', () => {

            if (CONFIG.debug) console.log('WS close');

        });

        WS.client.addEventListener('error', () => {

            if (CONFIG.debug) console.log('WS error');

        });

        WS.client.addEventListener('message', message => {

            WS.data = JSON.parse(message.data);

            USER.sync();
            TARGET.sync();
            CAR.sync();
            GUI.total.sync();
            GUI.tool.sync();
            TRAFFIC.sync();
            CAMERA.sync();
            ACTION.sync();
            HUD.sync();

        });

    }

};