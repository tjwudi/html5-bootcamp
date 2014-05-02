"use strict";

var koa = require('koa'),
  koaServe = require('koa-static'),
  koaBody = require('koa-body')(),
  koaRouter = require('koa-router'),
  koaJson = require('koa-json'),
  koaGzip = require('koa-gzip'),
  db = require('./db'),
  config = require('./config'),
  app = koa();

// serve static files
app.use(koaServe('./static'));
// initialize router
app.use(koaRouter(app));
// support json
app.use(koaJson());
// gzip
app.use(koaGzip());

// routes
app.post('/register', koaBody, function *(){
  var newDoc = yield db.insert(this.request.body);
  if (!!newDoc) {
    this.response.body = { status: 'OK' };
  }
  else {
    this.response.body = { status: 'ERR' };
  }
});

app.get('/applications', function *(){
  var docs = yield db.queryAll();
  this.response.body = { count: docs.length, docs: docs };
});

app.listen(config.SERVER_PORT);
console.log('Application server listening on port: ' + config.SERVER_PORT);