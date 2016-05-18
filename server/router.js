/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 15:35:18
 * @title       title
 * @description description
 */
'use strict';
const
  debug = require('debug')('F:router'),
  Router = require('koa-router'),

  render = require('./render.js'),

  router = new Router();

debug('in page router');
module.exports = router;

router.get('home', '/', function* ( next ) {

  this.body = yield render('../views/index.jade', {
    title: 'Test'
  });
});
