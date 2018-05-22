let fs = require('fs');
let http = require('http');

let TOOL = require('./tool');

let HTTP = {};

HTTP.ip = '' || TOOL.getIp();
HTTP.port = 80;

// временно заблокированные IP адреса из-за любопытства
HTTP.banned = [];

HTTP.types = {
    html: 'text/html',
    js: 'text/javascript',
    css: 'text/css',
    png: 'image/png'
};

HTTP.server = http.createServer((req, res) => {

    let path = '.' + (req.url === '/' ? '/client/index.html' : req.url);

    // проверка на наличие IP адреса в заблокированном массиве
    if (HTTP.banned.includes(req.connection.remoteAddress)) {

        res.statusCode = 404;
        res.end(http.STATUS_CODES[404]);

        console.log('HTTP banned ' + req.connection.remoteAddress + ' ' + path);

    } else {

        fs.readFile(path, (error, data) => {

            if (error) {

                res.statusCode = 404;
                res.end(http.STATUS_CODES[404]);

                // блокировка любопытного клиента
                HTTP.banned.push(req.connection.remoteAddress);

                console.log('HTTP ban ' + req.connection.remoteAddress + ' ' + path);

            } else {

                Object.keys(HTTP.types).forEach(type => {
                    let regexp = new RegExp('\.' + type + '$');
                    if (regexp.test(path)) res.writeHead(200, {
                        'Content-Type': HTTP.types[type]
                    });
                });

                res.end(data);

                console.log('HTTP ' + req.connection.remoteAddress + ' ' + path);

            }

        });

    }

});

HTTP.server.listen(HTTP.port, HTTP.ip, () => {
    console.log('HTTP running at http://' + HTTP.ip + ':' + HTTP.port + '/');
});

module.exports = HTTP;