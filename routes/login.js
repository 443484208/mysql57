var express = require('express');
var router = express.Router();
var login=require('./../mysql/login.js');
/* POST users listing. */
//默认 '/urlencoded
router.post('/', function(req, res, next) {
	login(res,req.body);
});
module.exports = router;
