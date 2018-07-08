'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');

const app = express();


function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mongoose connection
require('./lib/connectMongoose');

// internationalization
i18n.configure({
  locales: ['en','es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  queryParameter: 'lang',
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Nodepop API routes
app.use('/apiv1/ads', require('./routes/apiv1/ads'));
app.use('/apiv1/users', require('./routes/apiv1/users'));

app.locals.title = 'Nodepop API';

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirsetError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPI(req)) {
    res.json({ sucess: false, error: res.__err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.render('error');
});

module.exports = app;
