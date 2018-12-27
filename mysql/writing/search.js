var connection = require('./../index.js');
var results;
var pageIndex;
var pageSize;
var write = function(res, req, id) {
	connection.connect(function(err) {
		if(err) {} else {
			console.log("数据库连接成功");
		}
	});
	if(id.pageIndex>1){
		pageIndex=Number(id.pageSize)+1;
		pageSize=id.pageSize*id.pageIndex;
	}else{
		pageIndex=1;
		pageSize=id.pageSize;
	}
	//获取文章
	var count = 'select count(*) from article where isDelect=0';
	connection.query(count, function(err, result) {
		if(err) throw err;
		if(result == "") {
			var data = {
				message: '没有文章！',
				code: '404',
			}
			return res.send(data);
			console.log('没有文章...')
		} else {
			results = result[0]['count(*)'];
			console.log('已经获取到一共'+results+'条信息...准备开始条件查询...')
		}
	});
	console.log('pageIndex=',pageIndex)
	console.log('pageSize=',pageSize)
	//	if(id.user) {
	var sql = 'SELECT * FROM article where isDelect=0 order by modificationtime is null, modificationtime ASC LIMIT  ' + pageIndex + ',' + pageSize;

	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result == "") {
			var data = {
				message: '没有文章！',
				code: '404',
			}
			res.send(data);
			console.log('没有文章...')
		} else {
			console.log('已经获取到内容...准备返回...')
			search(result, res, results,id)

		}
	});
	//	}

};

function search(result, res, results,id) {
	var data = {
		totalCount: result.length,
		count: results,
		pageIndex: id.pageIndex,
		pageSize: id.pageSize,
		innerList: result,
		code: 200,
		message: '获取成功！'
	}
	res.send(data);
}
module.exports = write;