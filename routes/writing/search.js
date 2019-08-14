var express = require('express');
var router = express.Router();
var search = require('./../../mysql/writing/search.js');
var sessionViews = require('./../session.js');
/* POST users listing. */
//默认 '/urlencoded
//登陆验证
router.get('/', function(req, res, next) {
	sessionViews(res, req.query).then(function(data) {
		if(data) {
			search(res, req, req.query);
		} else {}
	});
});
module.exports = router;