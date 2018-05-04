let fs = require('fs');
let http = require('http');

let TOOL = require('./tool');

let HTTP = {};

HTTP.ip = '' || TOOL.getIp();
HTTP.port = 80;

HTTP.types = {
    html: 'text/html',
    js: 'text/javascript',
    css: 'text/css',
    png: 'image/png'
};

HTTP.server = http.createServer((req, res) => {

    let path = '.' + (req.url === '/' ? '/client/index.html' : req.url);
    console.log('HTTP ' + req.connection.remoteAddress + ' ' + path);

    fs.readFile(path, (error, data) => {

        if (error) {

            res.statusCode = 404;
            res.end(http.STATUS_CODES[404]);

        } else {

            Object.keys(HTTP.types).forEach(type => {
                let regexp = new RegExp('\.' + type + '$');
                if (regexp.test(path)) res.writeHead(200, {
                    'Content-Type': HTTP.types[type]
                });
            });
            res.end(data);

        }

    });

});

HTTP.server.listen(HTTP.port, HTTP.ip, () => {
    console.log('HTTP running at http://' + HTTP.ip + ':' + HTTP.port + '/');
});

module.exports = HTTP;