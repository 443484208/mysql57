var connection = require('./../index.js');
var addUser = function(res, id) {
	connection.connect(function(err) {
		if (err) {} else {
			console.log("数据库连接成功");
		}
	});
	//查是否有该用户
	if (id.user) {
		var sql = 'SELECT * FROM hong_user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
			console.log("err:",err)
			if (err) throw err;
			if (result == "") {
				add(res, id);
				console.log('开始注册...');
			} else {
				console.log('已存在账号!请勿注册!');
				res.send({
					message: '已存在账号!请勿注册!'
				});
			}
		});
	} else {
		console.log('请输入要申请的账号!');
		res.send({
			message: '请输入要申请的账号'
		})
	}
}

function add(res, id) {
	//新增
	var addSql = 'INSERT INTO hong_user(user,password,lastTime,email)VALUES(?,?,?,?)';
	var addSqlParams = [];
	addSqlParams.push(id.user)
	addSqlParams.push(id.password)
	addSqlParams.push(id.lastTime)
	addSqlParams.push(id.email)
	console.log('id.password=',id.password)
	connection.query(addSql, addSqlParams, function(err, result) {
		console.log('result=',result)
	console.log('err=',err)
		if (err) {
			console.log('注册失败...');
			res.send({
				message: '注册失败!'
			});
		} else {
			console.log('注册成功...');
			var data = {
				message: '登陆成功!',
				code: '200',
			}
			res.send(data);
		}
	});
}

module.exports = addUser;
