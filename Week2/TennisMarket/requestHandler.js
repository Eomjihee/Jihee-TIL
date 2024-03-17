const fs = require('fs'); // file sync
const main_view = fs.readFileSync('./main.html', 'utf-8');
const mysqlDB = require('./database/connect/mysqlDB');

let main = (res) => {
    mysqlDB.query('SELECT * FROM product', (err, rows) => {
        if (err) console.error(err);
        console.log(rows);
    });

    res.writeHead(200,{
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
    });
    res.write(main_view);
    res.end();
}
let redRacket = (res) => {
    fs.readFile('./img/redRacket.png', (err,data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}
let blueRacket = (res) => {
    fs.readFile('./img/blueRacket.png', (err,data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}
let blackRacket = (res) => {
    fs.readFile('./img/blackRacket.png', (err,data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}
let order = (res, productID) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    mysqlDB.query('INSERT INTO orderlist(product_id) VALUES('+productID+')', (err, rows) => {
        if (err) console.error(err);
        console.log(rows);
    });
    res.write('Order page');
    res.end();
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;

/* img directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;