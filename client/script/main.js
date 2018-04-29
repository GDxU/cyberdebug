window.addEventListener('load', () => {

    let timestamps = [];

    // ws

    window.ws = new WebSocket('ws://' + window.location.host + ':81');

    ws.addEventListener('open', () => {
        console.log('WS open');
    });

    ws.addEventListener('close', () => {
        console.log('WS close');
    });

    ws.addEventListener('error', () => {
        console.log('WS error');
    });

    ws.addEventListener('message', (message) => {
        // console.log('WS message', message);
        timestamps.push(Date.now());
        if (timestamps.length > 100) timestamps.shift();
        let s = 0;
        for (let i = 1; i < timestamps.length; i++) {
            s += timestamps[i] - timestamps[i - 1];
        }
        let ms = s / timestamps.length;
        let tr = 1000 / ms;
        document.body.innerHTML = ms.toFixed(2) + ' ms, ' + tr.toFixed(2) + ' tr<br>' + message.data;
    });

});