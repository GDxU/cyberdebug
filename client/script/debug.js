window.DEBUG = {

    ms: 0,
    tr: 0,
    timestamps: [],

    sync: () => {

        let html = '';

        if (CAMERA.target) {

            html += '<span>id:</span> ' + CAMERA.target.id + '<br>';
            html += '<span>name:</span> ' + USER.name + '<br>';
            html += '<span>x:</span> ' + CAMERA.target.sprite.x + '<br>';
            html += '<span>y:</span> ' + CAMERA.target.sprite.y + '<br>';
            html += '<span>w:</span> ' + GAME.application.renderer.width + '<br>';
            html += '<span>h:</span> ' + GAME.application.renderer.height + '<br>';
            html += '<span>users:</span> ' + WS.data.users + '<br>';
            html += '<span>bots:</span> ' + WS.data.bots + '<br>';
            html += '<span>here:</span> ' + (WS.data.targets ? WS.data.targets.length : 0) + '<br>';

        }

        DEBUG.timestamps.push(Date.now());

        if (DEBUG.timestamps[DEBUG.timestamps.length - 1] - DEBUG.timestamps[0] > 1000) {

            let s = 0;

            for (let i = 1; i < DEBUG.timestamps.length; i++) s += DEBUG.timestamps[i] - DEBUG.timestamps[i - 1];

            DEBUG.ms = s / (DEBUG.timestamps.length - 1);
            DEBUG.tr = 1000 / DEBUG.ms;

            DEBUG.timestamps = [];

        }

        html += '<span>ms:</span> ' + DEBUG.ms.toFixed(2) + '<br>';
        html += '<span>ms:</span> ' + DEBUG.ms.toFixed(2) + '<br>';
        html += '<span>tr:</span> ' + DEBUG.tr.toFixed(2);

        GUI.debug.info.innerHTML = html;

    }

};