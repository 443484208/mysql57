var connection = require('./../index.js');

var write = function(res,req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});
	//获取文章
//	if(id.user) {
		var sql = 'SELECT * FROM article';
		connection.query(sql, function(err, result) {
			if(err) throw err;
			if(result == "") {
				var data={
					message: '没有文章！',
					code:'404',
					
				}
				res.send(data);

				console.log('没有文章...')
			} else {
				console.log('已经获取到内容...准备返回...')
				search(result,res)
				

			}
		});
//	}
	

	
};
function search(result,res){
	var data={
		totalCount:result.length,
		totalPages:1,
		totalPages:1,
		pageIndex:1,
		pageSize:result.length,
		innerList:result,
		code:200,
		message:'获取成功！'
	}
	console.log('获取到数据！一共'+result.length)
			res.send(data);
	

	
}
module.exports = write;