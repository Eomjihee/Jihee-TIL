const mysqlDB = require('./database/connect/mysqlDB');
const server = require('./server');
const router = require('./router');
const requestHandler = require('./requestHandler');

// mysqlDB.connect();
server.start(router.route, requestHandler.handle);
