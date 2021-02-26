var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

// enrutadores
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var adminRouter = require('./routes/adminRouter');
var productsRouter = require('./routes/productsRouter');
var servicesRouter = require('./routes/servicesRouter');
var carritoRouter = require('./routes/carritoRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);
app.use('/carrito', carritoRouter);
app.use('/products', productsRouter);
app.use('/services', servicesRouter);


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

module.exports = app;
