let ALERT = {};

ALERT.send = (ws, alert) => {

    let message = {
        alert: alert
    };

    ws.send(JSON.stringify(message));

};

module.exports = ALERT;