var connection = require('./../index.js');
var login = function(res, req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});
	console.log('id=', id);
	//查是否有该用户
	if(id.user) {
		var sql = 'SELECT *  FROM articlereview where id="' + id.id + '"';
		connection.query(sql, function(err, result) {
			console.log('result=', result);

			if(err) throw err;
			if(result == "") {
				console.log('没有文章id');
				var data = {
					message: '没有该文章id！',
					code: '404',

				};
				res.send(data);
			} else {
				console.log('查找文章id成功...');
				console.log('正在录入数据数据...');
				updatelook(res,id.id,id.list,id)
				

			}
		});
	}
};
//数量
function updatelook(res, id,list,commentNumber) {

	list="'"+list+"'"

	
	var sql = 'UPDATE articlereview SET comments = ' + list + ' WHERE id ="'+id+ '"';

	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result == "") {} else {
			console.log('更新成功！');
			updateCommentNumber(res,commentNumber);
		}
	});

}
function updateCommentNumber(res, id) {

	var sql = 'UPDATE article SET comment = ' + id.commentNumber + ' WHERE id ="' +id.articleId +'"';

	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result == "") {} else {
			var data = {
				message: '评论成功！',
				code: '200',

			};
			res.send(data);

		}
	});

}
module.exports = login;