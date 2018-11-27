var connection = require('./../index.js');

var login = function(res,req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});


	//查是否有该用户
	if(id.user) {
		
		var sql = 'SELECT * FROM user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
			
			
			if(result == "") {
				console.log('登陆验证...');
				console.log('没有该账号！请注册后登陆！');
				var data = {
						message: '没有该账号！请注册后登陆！',
						code: '666',
					}
				res.send(data);
			} else {
				console.log('查找成功...');
				console.log('返回数据...登陆成功！');
				console.log(result)
				if(result[0].password == id.password) {
			
			
					var data = {
						message: '登陆成功！',
						code: '200',
						data: {
							age: result[0].age,
							user: result[0].user,
							email: result[0].email
						}
					}

					res.send(data);
if(req.session.views){
			console.log('session=',req.session.views)
			req.session.views=req.session.views+1;
			
		}else{
			req.session.views=1;
		}
		console.log(req.session.views)
				
				} else {
					var data = {
						message: '密码不对！',
						code: '201',
					}
					console.log('密码不对！')
					res.send(data);
				}
			}
		});
	}
}

module.exports = login;