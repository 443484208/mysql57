var connection = require('./../index.js');
//随机session
function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
};
var login = function(res, req, id) {
	connection.connect(function(err) {
		if (err) {} else {
			console.log("数据库连接成功");
		}
	});
	//查是否有该用户
	if (id.user) {
		var sql = 'SELECT * FROM user where user="' + id.user + '"';
		connection.query(sql, function(err, result) {
			console.log(result)
			if (result == "") {
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
				var session = randomString(8);
				console.log('生成随机数=', session);
				console.log(result)
				console.log('色素随便=', req.session.views);
				if (result[0].password == id.password) {
					var data = {
						message: '登陆成功！',
						code: '200',
						data: {
							age: result[0].age,
							user: result[0].user,
							email: result[0].email,
							session: session,
						}
					};
					search(res, id, session, data);
					//					if(req.session.views) {
					//						req.session.views++
					//							res.setHeader('Content-Type', 'text/html');
					//					} else {
					//						req.session.views = session;
					//					}
				} else {
					var data = {
						message: '密码不对！',
						code: '201',
					};
					console.log('密码不对！');
					res.send(data);
				}
			}
		});
	}
}

function addsession(res, id, session, data) {
	//新增
	var addSql = 'INSERT INTO session(user,session,lastTime) VALUES(?,?,?)';
	var addSqlParams = [];
	addSqlParams.push(id.user)
	addSqlParams.push(session)
	addSqlParams.push(id.lastTime)
	connection.query(addSql, addSqlParams, function(err, result) {
		if (err) {
			res.send(data);
		} else {}
	});
}

function search(res, id, session, data) {
	console.log('id.user', id.user)
	var sql = 'SELECT * FROM session where user="' + id.user + '";';
	connection.query(sql, function(err, result) {
		console.log(data)
		console.log('err=', err)
		console.log('result=', result)
		if (err) throw err;
		if (result == "") {
			console.log(data)
			console.log('没有登录过，现在准备写入数据库。。。')
			addsession(res, id, session, data)
		} else {
			console.log('登陆过，替换session。。。');
			updatesession(res, id, session, data)
		}
	});
	console.log("session=", session)
}

function updatesession(res, id, session, data) {
	var sql = 'UPDATE session SET session = "' + session + '" WHERE user ="' + id.user + '";';
	connection.query(sql, function(err, result) {
		if (err) throw err;
		if (result == "") {} else {
			console.log('登陆过，替换session。。。');
			console.log('result=', result)
			res.send(data);
		}
	});
}

module.exports = login;
