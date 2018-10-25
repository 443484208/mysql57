var connection = require('./index.js');
var login = function(res, id) {

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
				console.log('登陆验证...');
				res.send({
					message: '没有该账号！请注册后登陆！'
				});
			} else {
				logins(res, id)
				console.log('有该账号，开始登陆...')
				

			}
		});
	}

}

function logins(res, id) {
	//登陆验证
	var addSql ='SELECT * FROM user where user="' + id.user + '"';
	connection.query(addSql, function(err, result) {
		if(err) {
			res.send({
				message: '登陆失败！'
			});
		} else {
			if(result){
				console.log('登陆成功...');
				console.log('返回数据...');
				if(result[0].password==id.password){
					
				var data={
					message:'登陆成功！',
					code:'200',
					data:{
					age:result[0].age,
					user:result[0].user,
					email:result[0].email}
					}
			res.send(data);
				}else{
					var data={
					message:'密码不对！',
					code:'201',
					}
					console.log('密码不对！')
				
			res.send({message:'密码不对！'});
				}
			}
				
				

		
			
		}
	})
}

module.exports = login;