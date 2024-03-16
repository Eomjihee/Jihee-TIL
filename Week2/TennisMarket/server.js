const http = require('http');
const url =  require('url');


let start = (route, handle) => {
    let onRequest = (req, res) => {
        let pathname = url.parse(req.url).pathname;
        route(pathname, handle, res);

    }

    http.createServer(onRequest).listen(8080);

};

exports.start = start;