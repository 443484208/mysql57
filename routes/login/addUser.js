var express = require('express');
var router = express.Router();
var addUser=require('./../../mysql/login/addUser.js');
/* POST users listing. */
//默认 '/urlencoded
//注册用户
router.post('/', function(req, res, next) {
	addUser(res,req.body);
});
module.exports = router;
