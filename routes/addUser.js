var express = require('express');
var router = express.Router();
var addUser=require('./../mysql/addUser.js');
/* POST users listing. */
//默认 '/urlencoded
router.post('/', function(req, res, next) {
	addUser(res,req.body);
});
module.exports = router;
