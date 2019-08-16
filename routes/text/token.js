var express = require('express');
var router = express.Router();
var search = require('./../../mysql/text/token.js');
var sessionViews = require('./../session.js');
/* POST users listing. */
//默认 '/urlencoded
//登陆验证
router.post('/', function(req, res, next) {
	sessionViews(res, req.body).then(function(data) {
		if(data) {
			console.log(req.headers.token)
			search(res, req, req.body);
		} else {}
	})
});
module.exports = router;