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
		var sql = 'SELECT user,id,text,title,modificationtime,look  FROM article where id="' + id.id + '"';
		connection.query(sql, function(err, result) {
	console.log('result=',result);
			
			if(err) throw err;
			if(result == "") {
				console.log('没有文章...');
				var data = {
						message: '没有文章！',
						code: '666',
				}
				res.send(data);
			} else {
				console.log('查找文章成功...');
				console.log('返回数据...');
					var data = {
						message: '查找成功！',
						code: '200',
						data: {
							user: result[0].user,
							user: result[0].user,
							text: result[0].text,
							title: result[0].title,
							modificationtime: result[0].modificationtime,
							look: result[0].look,
						}
					};
					updatelook(res,id.id,result[0].look)
					res.send(data);
			}
		});
	}
};
//数量
function updatelook(res, id,look) {
	var sql = 'UPDATE article SET look = "'+ (Number(look)+1 )+'" WHERE id ="'+ id +'";';

	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result == "") {
		} else {
			console.log('look+1');
		
			
		}
	});

}



module.exports = login;