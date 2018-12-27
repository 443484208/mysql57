var connection = require('./../index.js');

var write = function(res,req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});
	//查是否有该用户
	var addSql = 'INSERT INTO article(user,text,title,modificationtime,isDelect,creationTime) VALUES(?,?,?,?,?,?)';
	var addSqlParams = [];
	addSqlParams.push(id.user);
	addSqlParams.push(id.text);
	addSqlParams.push(id.title);
	addSqlParams.push(id.modificationtime);
	addSqlParams.push(0);

	console.log(addSqlParams);
	connection.query(addSql, addSqlParams, function(err, result) {
		if(err) {
			console.log('新建文章失败...');
			console.log(err);
			res.send({
				message: '新建文章失败！'
			});
		} else {
			console.log('新建文章成功...');
			var data={
					message:'新建文章成功！',
					code:'200',
				};
			res.send(data);
		}
	})
	

	
};

module.exports = write;