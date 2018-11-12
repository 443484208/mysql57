var express = require('express');
var router = express.Router();
var login=require('./../../mysql/login/login.js');
/* POST users listing. */
//默认 '/urlencoded
//登陆验证
router.post('/', function(req, res, next) {
	console.log(res.session)
	req.session.username=req.body.user;

	login(res,req,req.body);
});
module.exports = router;
