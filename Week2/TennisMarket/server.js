const http = require('http');
const url =  require('url');


let start = (route, handle) => {
    let onRequest = (req, res) => {
        let pathname = url.parse(req.url).pathname;
        let queryData = url.parse(req.url, true).query;

        route(pathname, handle, res, queryData.productId);

    }

    http.createServer(onRequest).listen(8080);

};

exports.start = start;