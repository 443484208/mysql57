var connection = require('./index.js');

function search(res,id) {
	
connection.connect(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("数据库连接成功");

  }
});
	//查是否有该用户
	var sql = 'SELECT * FROM user where user="'+id+'"';
	connection.query(sql, function(err, result) {
		if(err) throw err;
		if(result==""){
			console.log("66666")
			console.log(id)

		}else {
			console.log(result)
			

		}

	});
//	connection.end();
}

module.exports = search;
