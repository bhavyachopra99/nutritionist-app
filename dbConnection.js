var mysql = require('mysql');
const dotenv = require('dotenv')
var conn = mysql.createConnection({
    port:'3306',
    host: 'localhost', // Replace with your host name
    user: 'system',      // Replace with your database username
    password: '1234',      // Replace with your database password
    database: 'wp' // // Replace with your database Name
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;