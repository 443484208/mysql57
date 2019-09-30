var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	 res.type('html');
  res.render('test', { title: 'Main' });
});

module.exports = router;