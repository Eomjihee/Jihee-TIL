const mysqlDB = require('mysql');

const conn = mysqlDB.createConnection(
    {
        host: 'localhost',
        port:3306,
        user: 'programmers',
        password: 'programmers123',
        database: 'Tennis'
    }
);

module.exports = conn;