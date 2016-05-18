/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-18 12:02:23
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');

var
  dom = require('dom'),
  routesMap = require('routesMap'),
  route = require('route'),
  html = require('./index.jade')({
    url: routesMap
  }),
  inserted = false,
  footer = dom.$('.footer'),
  initEvent = function () {
    footer.addEventListener('click', function ( e ) {
      var
        tag = e.target;

      if ( tag.matches('a') && tag.getAttribute('href') !== location.hash ) {
        dom.$('.views .view').style.display = 'none';
        route.replace(tag.href);
      }

      e.preventDefault();
    });
  },
  init = function () {
    footer.insertAdjacentHTML('beforeend', html);
    inserted = true;

    initEvent();
  };

module.exports = {
  show: function ( href, hash ) {
    inserted || init();

    document.body.classList.add('show-footer');
    footer.classList.add('show');
    // changeTab(dom.$('[data-href="'+ href +'"]', header), hash);
  },
  hide: function () {
    document.body.classList.remove('show-footer');
    footer.classList.remove('show');
    // document.body.classList.remove('show-header');
    // header && header.classList.remove('show');
  }
};
