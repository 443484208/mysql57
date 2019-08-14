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
var retrieve = require('./routes/login/retrieve');

//文章
var wzarticle = require('./routes/writing/article');
var wzsearch = require('./routes/writing/search');
var wzdetails = require('./routes/writing/details');
var wzarticlereview = require('./routes/writing/articlereview');
var wzwriteComments = require('./routes/writing/writeComments');

//session
var parseurl = require('parseurl')
var session = require('express-session')
//上传图片
var upimg = require('./routes/updata/upimg');
//cors
var cors = require('cors')
var app = express();



app.use(session({
	secret: 'keyboard cat',
	cookie: {
		maxAge: 60000
	}

}))
app.use(cors({
	origin: ['http://127.0.0.1:8848'],
	methods: ['GET', 'POST'],
	//  alloweHeaders:['Conten-Type','Authorization'],
	credentials: true // enable set cookie
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//登陆模块接口
app.use('/addUser', addUserRouter);
app.use('/login', login);
app.use('/search', search);
app.use('/retrieve', retrieve);
//文章
app.use('/wz/article', wzarticle);
app.use('/wz/search', wzsearch);
app.use('/up/upimg', upimg);
app.use('/wz/details', wzdetails);
app.use('/wz/articlereview', wzarticlereview);
app.use('/wz/writeComments', wzwriteComments);

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
app.listen(3001, () =>
	console.log('成功开启3001。。。')
)
module.exports = app;
