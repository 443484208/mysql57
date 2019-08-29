var crypto = require('crypto'); //加载crypto库
console.log(crypto.getHashes()); //打印支持的hash算法
var content = 'password'; //加密的明文；
var md5 = crypto.createHash('md5'); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
md5.update(content);
var d = md5.digest('hex'); //加密后的值d
console.log("加密的结果：" + d);



/********hmac-sha1加密***************/
// var content = 'password'; //加密的明文；
// var token1 = 'miyue'; //加密的密钥；
// var buf = crypto.randomBytes(16);
// token1 = buf.toString('hex'); //密钥加密；
// console.log("生成的token(用于加密的密钥):" + token1);
// var SecrectKey = token1; //秘钥；
// var Signture = crypto.createHmac('sha1', SecrectKey); 
//定义加密方式
// Signture.update(content);
// var miwen = Signture.digest().toString('base64'); 
//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
// console.log("加密的结果f：" + miwen);
/**********对应的结果(每次生成的结果都不一样)******************/
// 生成的token(用于加密的密钥): de7c3dafede518a1ad9c2096ee9b4eff
// 加密的结果f： PUX7fnOMlqVj + BS9o6RnNgxfffY =
// 生成的token(用于加密的密钥): 93 fee046ebf47412c2d54c1e808218d2
// 加密的结果f： / ERkUcrjkwxzgxNM7WczU8RaX5o =
