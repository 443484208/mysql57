var connection = require('./../index.js');
var addUser = function(res, id) {
	console.log(res)
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");

		}
	});
	//查是否有该用户
	if(id.user) {
		var sql = 'SELECT * FROM user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
			if(err) throw err;
			if(result == "") {
				add(res, id);
				console.log('开始注册...');
			} else {
				console.log('已存在账号！请勿注册！');
				res.send({
					message: '已存在账号！请勿注册！'
				});

			}
		});
	}
}

function add(res, id) {
	//新增
	var addSql = 'INSERT INTO user(age,user,password,email,lastTime) VALUES(?,?,?,?,?)';
	var addSqlParams = [];
	addSqlParams.push(id.age)
	addSqlParams.push(id.user)
	addSqlParams.push(id.password)
	addSqlParams.push(id.email)
	addSqlParams.push(id.lastTime)
	connection.query(addSql, addSqlParams, function(err, result) {
		if(err) {
			console.log('注册失败...');
			
			res.send({
				message: '注册失败！'
			});
		} else {
			console.log('注册成功...');
			var data={
					message:'登陆成功！',
					code:'200',
					}
			res.send(data);
		}
	});
}

module.exports = addUser;