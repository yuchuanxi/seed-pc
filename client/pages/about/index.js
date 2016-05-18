/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:37:30
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');
// var
//   // Islider = require('islider'),
//   config = require('config');

module.exports = require('views')({

  name: 'about',
  el: {},
  template: require('./index.jade'),

  init: function () {
    var
      me = this;

    me.render();
  },
  render: function () {
    var
      me = this;

    me.header.show();
    me.footer.show(me.el.view);
    me.views.insertAdjacentHTML('beforeend', me.template({
      viewName: me.name,
      viewTitle: '关于我们'
    }));
    me.el.view = me.dom.$('.view.'+ me.name, me.views);

    me.bindEvent();
  },

  bindEvent: function () {
    var
      me = this;

    me.el.view.addEventListener('click', function ( e ) {
      var
        tag = e.target;

    });
  },
  // updateStatus: function () {
  //   var
  //     me = this;

  //   me.ajax.get(config.api.home, me.views, null, function ( res ) {
  //     me.dom.$('.commodities', me.el.view).innerHTML = me.listTpl({
  //       commodities: res.entry.commodities
  //     });
  //   }, me.backHome);
  // },

  destroy: function () {
    var
      me = this;

    me.el = {};
  }
});
