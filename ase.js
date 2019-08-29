// var crypto = require('crypto'); //加载crypto库
// console.log(crypto.getCiphers()); //打印支持的cipher算法
// var secret = 'pass'; //密钥
// 
// //加密
// router.post("/encrypt", function(req, res) {
// 	var str = req.body.str; //明文
// 	var cipher = crypto.createCipher('aes-128-cbc', secret);
// 	var enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
// 	enc += cipher.final('hex'); //编码方式从转为hex;
// 	res.send(enc);
// });
// //解密
// router.post("/decrypt", function(req, res) {
// 	var str = req.body.str; //明文
// 	var decipher = crypto.createDecipher('aes-128-cbc', secret);
// 	var dec = decipher.update(str, 'hex', 'utf8'); //编码方式从hex转为utf-8;
// 	dec += decipher.final('utf8'); //编码方式从utf-8;
// 	res.send(dec);
// });
// 