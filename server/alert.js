let ALERT = {};

ALERT.send = (ws, alert) => {

    let message = {
        alert: alert
    };

    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(message));

};

module.exports = ALERT;