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
		var sql = 'SELECT * FROM user where user="' + id.user + '" and retrieve="'+id.retrieve+'"';
		connection.query(sql, function(err, result) {
	console.log('result666=',result);
			
			if(err) throw err;
			if(result == "") {
				console.log('登陆验证...');
				var data = {
						message: '修改失败,没有找到该账号！',
						code: '404',
					}
				console.log('没有该账号！');
				res.send(data);
			} else {
				console.log('查找账号成功...');
				console.log('修改密码成功...');

					var retrieve=randomString(8)
					
						
					updatelook(res,retrieve,id.user,id.password)

				

				
			}
		});
	}
};



function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for(var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
};
function updatelook(res, retrieve,user,password) {
	console.log(user)
	var sql = 'UPDATE user SET retrieve ="'+ retrieve+'",password="'+password+'" WHERE user="'+ user+'";';
	console.log(sql)

	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result == "") {
		} else {
			console.log('更新找回随机码')
			var data = {
						message: '更新密码成功！',
						code: '200',
					};
					res.send(data);
					
		
			
		}
	});

}


module.exports = login;