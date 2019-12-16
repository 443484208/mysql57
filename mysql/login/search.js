var connection = require('./../index.js');
var login = function(res, req, id) {
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
			console.log('result=', result);
			if (err) throw err;
			if (result == "") {
				console.log('登陆验证...');
				var data = {
					message: '没有该账号!',
					code: '666',
				}
				console.log('没有该账号!');
				res.send(data);
			} else {
				console.log('查找账号成功...');
				console.log('准备校验邮箱...');
				if (result[0].email == id.email) {
					var retrieve = randomString(8)
					console.log('邮箱正确!...');
					updatelook(res, retrieve, id.user)
				} else {
					console.log('邮箱不正确!');
					var data = {
						message: '邮箱不正确!',
						code: '404',
					};
					res.send(data);
				}
			}
		});
	}else{
		console.log('请输入需要搜索的账号!');
		res.send({
			message:'请输入需要搜索的账号!'
		})
	}
};

function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
};

function updatelook(res, retrieve, user) {
	var sql = 'UPDATE hong_user SET retrieve = "' + retrieve + '" WHERE user ="' + user + '";';
	connection.query(sql, function(err, result) {
		if (err) throw err;
		if (result == "") {} else {
			console.log('更新找回随机码')
			var data = {
				message: '找回成功!',
				code: '200',
				data: {
					retrieve: retrieve,
				}
			};
			res.send(data);
		}
	});
}

module.exports = login;
