var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//登陆模块
var addUserRouter = require('./routes/login/addUser');
var login = require('./routes/login/login');
var search = require('./routes/login/search');
//文章
var wzarticle = require('./routes/writing/article');
var wzsearch = require('./routes/writing/search');
//session
var parseurl = require('parseurl')
var session = require('express-session')
//cors
var cors = require('cors')
var app = express();




app.use(session({
  secret: 'keyboard cat',cookie: { maxAge: 60000 }
  
}))
app.use(cors({
    origin:['http://localhost:8236'],
    methods:['GET','POST'],
//  alloweHeaders:['Conten-Type','Authorization'],
    credentials: true // enable set cookie
}));
//跨域设置
//app.all('*', function(req, res, next) {
//	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//	res.header("X-Powered-By", ' 3.2.1')
//	res.header("Content-Type", "application/json;charset=utf-8");
//	next();
//});
// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//使用中间件session
//app.use(session({
// cookieName: 'session',
// secret: 'random_string_goes_here',
// duration: 30 * 60 * 1000,
// activeDuration: 5 * 60 * 1000,
//}));







app.use('/', indexRouter);
//登陆模块接口
app.use('/addUser', addUserRouter);
app.use('/login', login);
app.use('/search', search);
//文章
app.use('/wz/article', wzarticle);
app.use('/wz/search', wzsearch);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log('成功开启。。。')

module.exports = app;
