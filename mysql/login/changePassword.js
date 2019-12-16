var connection = require('./../index.js');
var changePassword = function(res, req, id) {
	connection.connect(function(err) {
		if (err) {} else {
			console.log("数据库连接成功");
		}
	});
	console.log('id=', id);
	//查是否有该用户
	if (id.user) {
		var sql = 'SELECT * FROM hong_user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
			console.log('result666=', result);
			if (err) throw err;
			if (result == "") {
				console.log('登陆验证...');
				var data = {
					message: '修改失败,没有找到该账号!',
					code: '404',
				}
				console.log('没有该账号!');
				res.send(data);
			}else if(result[0].password==id.oldPassword){
				console.log('查找账号原密码相同...');
				console.log('开始修改密码...');
				updatePassword(res, id.user, id.newPassword)
			} else {
				console.log(result[0].retrieve)
				console.log('原密码不一样...');
				var data = {
					message: '原密码不一样',
					code: '404',
				}
				res.send(data);
			}
		});
	}else{
		console.log('没有填写用户！')
		var data = {
			message: '修改失败,没有填写账号',
			code: '404',
		}
		res.send(data);
	}
};


function updatePassword(res, user, password) {
	console.log(user);
	var sql = 'UPDATE hong_user SET password="' + password + '" WHERE user="' + user + '";';
	console.log(sql);
	connection.query(sql, function(err, result) {
		if (err) throw err;
		if (result == "") {} else {
			console.log('更新密码成功')
			var data = {
				message: '更新密码成功!',
				code: '200',
			};
			res.send(data);
		}
	});
}
module.exports = changePassword;
