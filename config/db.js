let mysql      = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'project',
    database : 'livreor'
});

connection.connect();

module.exports = connection
