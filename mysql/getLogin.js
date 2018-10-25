var connection = require('./index.js');

function getLogin(res,id) {
	
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
						return res.send({message:'暂无数据！'});
		}else {
			
			return res.send(result);
		}

	});
//	connection.end();
}

module.exports = getLogin;
