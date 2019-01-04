var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'hong',
});

var sessionViews = function(res, body) {
	console.log("body", body);
	var sql = 'SELECT * FROM session where user="' + body.user + '" and session="' + body.session + '";';
	var p = new Promise(function(resolve, reject) {
		//做一些异步操作
		connection.query(sql, function(err, result) {
			if(err) throw err;
			if(result == "") {
				var datas = {
					message: '登陆超时！',
					code: '400',
				};
				res.send(datas);
				console.log('登录过期！');
				
				resolve(false);
			} else {
				resolve(true);
				console.log('验证成功！');
				console.log(result);
			}
		});
	});
	return p;
};
module.exports = sessionViews;