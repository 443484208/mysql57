var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'hong',
});

var sessionViews = function(res, body) {
	var sql = "SELECT * FROM hong_session where (user='" + body.user + "') and (session='" + body.session + "');";
	var p = new Promise(function(resolve, reject) {
		//做一些异步操作
		connection.query(sql, function(err, result) {
			if(err){
				console.log('err:',err);
				console.log('result:',result);
				var datas = {
					message: '链接服务器失败!',
					code: '404',
				};
				res.send(datas);
				resolve(false);
			}else if(result == "") {
				var datas = {
					message: '登陆超时!',
					code: '400',
				};
				res.send("datas:",datas);
				console.log('登录过期!');
				resolve(false);
			} else {
				console.log('验证成功!');
				resolve(true);
			}
		});
	});
	return p;
};
module.exports = sessionViews;