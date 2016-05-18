/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 14:04:25
 * @title       title
 * @description description
 */
'use strict';
const
  // built-in modules
  path = require('path'),
  // thirdparty modules
  koa = require('koa'),
  debug = require('debug')('F:index'),
  nconf = require('nconf'),
  favicon = require('koa-favicon'),
  koaStatic = require('koa-static'),
  // koaProxy = require('koa-proxy'),
  // enforceHttps = require('koa-sslify'),
  // staticCache = require('koa-static-cache'),
  logger = require('koa-logger'),
  // local modules
  mock = require('./mock/index.js'),
  // router = require('./router.js'),

  app = koa(),

  isDev = nconf.get('NODE_ENV') !== 'production',
  staticDir = isDev ? 'client' : 'dist'

  ;

var
  server;

// exports module
exports = module.exports = server = Object.create(app);

server.start = function ( config ) {
  this.init(config);

  this.loadMiddleware();
};
server.init = function ( config ) {
  this.opts = config || {};

  this.initCache();
};
server.initCache = function () {

};
server.loadMiddleware = function () {
  const
    port = this.opts.port || 8000,
    opts = this.opts;

  if ( isDev  ) {
    let
      webpack = require('webpack'),
      webpackConf = require('../webpack.config.tpl.js')({debug: true}),
      compiler = webpack(webpackConf),
      webpackDevMiddleware = require('koa-webpack-dev-middleware'),
      webpackHotMiddleware = require('koa-webpack-hot-middleware');

    // this.use(webpackDevMiddleware(compiler, {
    //   contentBase: webpackConf.output.path,
    //   publicPath: webpackConf.output.publicPath,
    //   hot: true,
    //   // stats: webpackConf.devServer.stats
    //   stats: {
    //     cached: false,
    //     colors: true
    //   }
    // }));
    this.use(webpackDevMiddleware(compiler, webpackConf.devServer));
    this.use(webpackHotMiddleware(compiler));
  }
  // Force HTTPS on all page
  // this.use(enforceHttps({
  //   trustProtoHeader: true
  // }));
  this.use(favicon(path.join(opts.root, staticDir +'/favicon.ico')));
  this.use(koaStatic(path.join(opts.root, staticDir)));
  // this.use(staticCache(path.join(opts.root, staticDir), {
  //   maxAge: 365 * 24 * 60 * 60
  // }));

  if ( opts.log ) {
    this.use(logger());
  }

  this.use(mock.routes());
  // this.use(router());

  if ( isDev ) {
    // this.use(koaProxy({
      // host: 'http://daily.52shangou.com'
    // }));
  }
  // TODO: ADD MIDDLEWARE

  this.listen(port);
  debug('Server listening on ' + port);
};
