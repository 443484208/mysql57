var express = require('express');
var router = express.Router();
var login = require('./../../mysql/login/login.js');
var sessionViews = require('./../session.js');
/* POST users listing. */
//默认 '/urlencoded
//登陆验证
router.post('/', function(req, res, next) {
			login(res, req, req.body);
});
module.exports = router;
