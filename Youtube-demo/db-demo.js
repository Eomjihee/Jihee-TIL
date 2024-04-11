// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '1004',
  database: 'Youtube',
  dateStrings : true
});

// A simple SELECT query
connection.query(
  // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  'SELECT * FROM `users` ',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// Using placeholders
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
