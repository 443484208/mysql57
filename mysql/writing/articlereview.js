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
		var sql = 'SELECT *  FROM articlereview where articleId="' + id.id + '"';
		connection.query(sql, function(err, result) {
			console.log('result=', result);
			if (err) throw err;
			if (result == "") {
				console.log('没有文章评论id,新建文章评论数据库');
				add(res, id);
			} else {
				console.log('查找文章成功...');
				console.log('返回数据...');
				var data = {
					message: '查找成功!',
					code: '200',
					data: {
						id: result[0].id,
						comments: result[0].comments,
						userAuthor: result[0].userAuthor,
					}
				};
				res.send(data);
			}
		});
	}else{
		console.log('请输入账号名');
		res.send({
			message:'没有找到，缺少账号名'
		})
		
	}
};
//数量
function add(res, id) {
	//新增
	var addSql = 'INSERT INTO articlereview(articleId,comments,userAuthor) VALUES(?,?,?)';
	var addSqlParams = [];
	addSqlParams.push(id.id)
	addSqlParams.push('[]')
	addSqlParams.push(id.user)
	connection.query(addSql, addSqlParams, function(err, result) {
		if (err) {
			console.log('注册成功...');
		} else {
			var data = {
				message: '查找成功!',
				code: '200',
				data: {
					id: id.id,
					count: 0,
					comments: '',
					userAuthor: id.userAuthor
				}
			};
			res.send(data);
		}
	});
}

module.exports = login;
