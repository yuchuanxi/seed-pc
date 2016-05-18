/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2015-12-14 14:13:38
 * @title       title
 * @description description
 */
'use strict';

var
  debug = require('debug')('slily:gulpfile'),
  nconf = require('nconf'),
  gulp = require('gulp'),
  webpack = require('webpack'),

  baseUrl = nconf.argv().get('url');

console.log('baseUrl=', baseUrl)
gulp.task('build', function () {
  var
    webpackConfig = require('./webpack.config.tpl.js')({
      debug: false,
      baseUrl: baseUrl || ''
      });

  webpack(webpackConfig, function ( err, stats ) {
   //
  });
});
