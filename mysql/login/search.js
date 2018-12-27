var connection = require('./../index.js');
var login = function(res,req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});
	console.log('id=',id);
	//查是否有该用户
	if(id.user) {
		var sql = 'SELECT * FROM user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
	console.log('result=',result);
			
			if(err) throw err;
			if(result == "") {
				console.log('登陆验证...');
				var data = {
						message: '没有该账号！',
						code: '666',
					}
				console.log('没有该账号！');
				res.send(data);
			} else {
				console.log('查找成功...');
				console.log('返回数据...');
					var data = {
						message: '查找成功！',
						code: '200',
						data: {
							age: result[0].age,
							user: result[0].user,
							email: result[0].email
						}
					};
					res.send(data);
			}
		});
	}
};




module.exports = login;