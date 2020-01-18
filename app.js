var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Now playing
var indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
// /search
const searchRouter = require('./routes/search')

var app = express();

const helmet = require('helmet');
app.use(helmet())

app.use((req, res, next) => {
  console.log('req.query')
  console.log(req.query)
  // console.log(req.query.api_key)
  if (req.query.api_key != '12345678') {
    console.log("req.query.api_key under app.use")
    console.log(req.query.api_key)
    res.status(401)
    console.log("before sending invalid after 401 status")
    res.json("Invalid API Key")
  } else {
    console.log("API key is valid  ")
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movie', movieRouter);
app.use('/search', searchRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
