var express = require('express');
var router = express.Router();
var search=require('./../../mysql/login/search.js');
/* POST users listing. */
//默认 '/urlencoded
//登陆验证
router.post('/', function(req, res, next) {
	var a=req.session;
	if(a.username ){
		console.log(a.username);
	}
	search(res,req,req.body);
});
module.exports = router;
