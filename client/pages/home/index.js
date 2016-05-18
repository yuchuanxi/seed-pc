/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:37:30
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');

module.exports = require('views')({

  name: 'home',
  el: {},

  template: require('./index.jade'),

  init: function () {
    var
      me = this;

    me.time = Date.now();
    me.render();
    console.log('home page inited');
  },
  render: function () {
    var
      me = this;

    me.header.show();
    me.footer.show(me.el.view);
    me.views.insertAdjacentHTML('beforeend', me.template({
      viewName: me.name,
      viewTitle: '首页',
      urls: me.routes
    }));
    me.el.view = me.dom.$('.view.'+ me.name, me.views);
  },

  destroy: function () {
    var
      me = this;

    me.el = {};
  }
});
