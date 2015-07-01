var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var location = require('./middlewares/location');
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'production') {
    var FileStreamRotator = require('file-stream-rotator');
    var mkdirp = require('mkdirp');

    // HTTP日志
    var logDirectory = config.logDir;
    // ensure log directory exists
    mkdirp.sync(logDirectory);
    var accessLogStream = FileStreamRotator.getStream({
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false, // 开发模式下打开
        date_format: 'YYYY-MM-DD'
    });
    morgan.token('sid', function(req) {
        return req.sessionID || 'NoSessionID';
    });
    // [日期] "请求方法 请求URL 响应码 响应时间 ms HTTP协议版本" "SessionID" 客户端IP 远端用户 响应体大小 "响应头referrer" "浏览器UA"
    app.use(morgan('[:date[iso]] ":method :url :status :response-time ms - HTTP/:http-version" ":sid" :remote-addr - :remote-user :res[content-length] ":referrer" ":user-agent"', {
        stream: accessLogStream
    }));
} else {
    app.use(morgan('dev'));
}

app.use(location());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


module.exports = app;
