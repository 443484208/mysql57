var express = require('express');
var router = express.Router();
var getLogin=require('./../mysql/getLogin.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.query.user){
	getLogin(res,req.query.user)
		
	}

//	console.log(getLogin);
//res.send('respond with a resource');
});

module.exports = router;
