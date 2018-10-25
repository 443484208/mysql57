var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '134.175.9.97',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'saorong',
});
module.exports = connection;