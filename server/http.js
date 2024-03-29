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
    png: 'image/png',
    json: 'application/json'
};

HTTP.getImagesList = (res, type) => {

    fs.readdir('./client/image/' + type + '/', (error, files) => {

        if (error) {

            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);

        } else {

            let images = [];

            files.forEach(file => images.push(file.slice(0, -4)));

            res.writeHead(200, {
                'Content-Type': HTTP.types['json']
            });

            res.end(JSON.stringify(images));

        }

    });

};

HTTP.query = {

    banned: res => {

        res.writeHead(200, {
            'Content-Type': HTTP.types['json']
        });

        res.end(JSON.stringify(HTTP.banned));

    },

    debug: res => {

        fs.readFile('./client/debug.html', (error, data) => {

            if (error) {

                res.statusCode = 404;
                res.end(http.STATUS_CODES[404]);

            } else {

                res.writeHead(200, {
                    'Content-Type': HTTP.types['html']
                });

                res.end(data);

            }

        });

    },

    character: res => HTTP.getImagesList(res, 'character'),

    car: res => HTTP.getImagesList(res, 'car'),

    'building/base': res => HTTP.getImagesList(res, 'building/base'),
    'building/trash': res => HTTP.getImagesList(res, 'building/trash'),
    'building/cyan': res => HTTP.getImagesList(res, 'building/cyan'),
    'building/magenta': res => HTTP.getImagesList(res, 'building/magenta'),
    'building/yellow': res => HTTP.getImagesList(res, 'building/yellow'),
    'building/cat': res => HTTP.getImagesList(res, 'building/cat'),
    'building/banner': res => HTTP.getImagesList(res, 'building/banner')

};

HTTP.server = http.createServer((req, res) => {

    // проверка на наличие IP адреса в заблокированном массиве
    if (HTTP.banned.includes(req.connection.remoteAddress)) {

        res.statusCode = 404;
        res.end(http.STATUS_CODES[404]);

        console.log('HTTP banned ' + req.connection.remoteAddress + ' ' + req.url);

    } else {

        // фикс на случайный запрос иконки браузером
        if (req.url === '/favicon.ico') {

            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);

            console.log('HTTP fix ' + req.connection.remoteAddress + ' ' + req.url);

        } else {

            // проверка запроса на данные или статику
            let query = req.url.substr(1);

            if (HTTP.query[query]) {

                HTTP.query[query](res);

                console.log('HTTP ' + req.connection.remoteAddress + ' ' + req.url);

            } else {

                let path = '.' + (req.url === '/' ? '/client/index.html' : req.url);

                fs.readFile(path, (error, data) => {

                    if (error) {

                        res.statusCode = 404;
                        res.end(http.STATUS_CODES[404]);

                        // блокировка любопытного клиента
                        HTTP.banned.push(req.connection.remoteAddress);

                        console.log('HTTP ban ' + req.connection.remoteAddress + ' ' + req.url);

                    } else {

                        Object.keys(HTTP.types).forEach(type => {
                            let regexp = new RegExp('\.' + type + '$');
                            if (regexp.test(path)) res.writeHead(200, {
                                'Content-Type': HTTP.types[type]
                            });
                        });

                        res.end(data);

                        console.log('HTTP ' + req.connection.remoteAddress + ' ' + req.url);

                    }

                });

            }

        }

    }

});

HTTP.server.listen(HTTP.port, HTTP.ip, () => {
    console.log('Game http://cyberdebug.com');
    console.log('Debug http://cyberdebug.com/debug');
    console.log('HTTP running at http://' + HTTP.ip + ':' + HTTP.port + '/');
});

module.exports = HTTP;