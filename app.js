var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var userManager = require('./database/userManager');
var app = express();

app.use(expressSession({ 
  secret: 'watch the sunset at least once per day',
  cookie : {
      maxAge: 1000 * 60 * 60 * 24 * 365 /*1 y*/
  } 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var loginRequestHandler = require('./routes/loginRequestHandler')(passport);
var logoutRequestHandler = require('./routes/logoutRequestHandler');
var articleRequestHandler = require('./routes/articleRequestHandler');
var fileRequestHandler = require('./routes/fileRequestHandler');
var tooltipRequestHandler = require('./routes/tooltipRequestHandler');

app.use(function(req, res, next) {
  userManager.extend(req, res);
  res.manageUsernameCookie(req.user);
  next();
});

app.use('/login', loginRequestHandler);
app.use('/logout', logoutRequestHandler);
app.use('/articles', articleRequestHandler);
app.use('/files', fileRequestHandler);
app.use('/tooltips', tooltipRequestHandler);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// as it was in express generator
//module.exports = app;

var server = app.listen(3000, function () {
  console.log("Web server listening to port 3000");
  var host = server.address().address;
  var port = server.address().port;
});