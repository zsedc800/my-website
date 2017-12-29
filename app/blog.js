var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var Logger = require('../common/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('../config');

var app = express();
var logger = Logger.getLogger('access');
var api_router_v1 = require('../api_router_v1');
var web_router = require('../web_router');
app.set('port', config['blog_port']);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// 通用middleware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(Logger.connectLogger(Logger.getLogger(), { level: Logger.levels.INFO }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config['session_secret']));
app.use(session({
  secret: config['session_secret'],
  key: config['auth_cookie_name'],
  cookie: {
    maxAge: 1000 * 3600 * 24 * 7,
    httpOnly: true
  },
  store: new RedisStore({
    url: config.redis_uri,
    pass: config.redis_password,
  }),
  resave: false,
  saveUninitialized: false
}));
app.use('/', web_router);
app.use('/api/v1', api_router_v1);
app.use(express.static(path.join(__dirname, '../public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

if (!module.parent) {
  app.listen(app.get('port'), () => {
    logger.info('server listening on port', app.get('port'));
    logger.info('you can debug your app at http://' + config.hostname + '/' + app.get('port'));
  });
}

module.exports = app;
