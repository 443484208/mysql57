// mysql语句集合
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'hong',
});
var mysqlL = {
	search: function(tableName, data) {
		if (typeof(data) == 'object' && (data instanceof Array) == false) {
			var arrayData = [];
			for (x in data) {
				arrayData.push(x);
				arrayData.push(data[x]);
			}
			var sql = 'SELECT * FROM ' + tableName + ' where ' + arrayData[0] + '=' + connection.escape(arrayData[1]);
			if (arrayData.length < 3) {
				return {
					data: sql,
					message: 200
				}
			} else {
				return {
					message: 400,
					data: '参数太多'
				}
			}
		} else {
			return {
				message: 400,
				data: '参数格式错误'
			}
		}
	},
	searchAnd: function(tableName, data) {
		var arrayData = [];
		for (x in data) {
			arrayData.push(x);
			arrayData.push(data[x]);
		}
		if (arrayData.length > 3) {
			var sql = 'SELECT * FROM ' + tableName + ' where ' + arrayData[0] + '="' + arrayData[1] + '" and ' + arrayData[2] +
				'="' + arrayData[3] + '"';
			return {
				data: sql,
				message: 200
			}
		} else {
			return {
				data: '条件不够',
				message: 400
			}
		}
	},
	insert: function(tableName, data) {
		if (typeof(data) == 'object' && (data instanceof Array) == false) {
			var arrayData = '';
			var arrayType = '';
			for (x in data) {
				arrayType = arrayType != '' ? (arrayType + ',' + x) : x;
				arrayData = arrayData != '' ? (arrayData + ',?') : '?';
			}
			console.log(arrayType);
			console.log(arrayData);
			var sql = 'INSERT INTO ' + tableName + '(' + arrayType + ') VALUES(' + arrayData+')';
			return {
				data: sql,
				message: 200
			}
		} else {
			return {
				message: 400,
				data: '参数格式错误'
			}
		}
	}
}
module.exports = mysqlL;
