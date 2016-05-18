/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 15:40:45
 * @title       title
 * @description 所有view的原型
 */
'use strict';

var
  dom = require('dom'),

  empty = function () {},
  parent = {
    dom         : dom,
    // store       : require('store'),
    route       : require('route'),
    routes       : require('routes'),
    ua       : require('ua'),
    // toast       : require('toast'),
    // spinner     : require('spinner'),
    // popup       : require('popup'),
    // ajax        : require('ajax'),


    views  : dom.$('body > .views'),
    // loading: false,

    init     : empty,
    format   : empty,
    render   : empty,
    bindEvent: empty,
    handler  : empty,

    header: require('../../components/header/index.js'),
    footer: require('../../components/footer/index.js'),
    backHome: function ( res ) {
      var
        me = this;

      me.toast.show('error', res.message || '请求异常');
      location.hash = config.url.home;
    },

    updateStatus: empty, // 更新view状态
    /**
     * 网络请求出现异常的时候允许重新加载
     * @param  {[type]} message    [加载失败后显示的提示消息]
     * @param  {[type]} wrapper    [放置提示消息的容器]
     * @param  {[type]} reloadFunc [重加载执行的函数]
     * @param  {[type]} args       [回传给重加载执行函数的参数]
     * @return {[type]}            [description]
     */
    loadErr: function ( wrapper, reloadFunc, message, args ) {
      var
        me = this;

      if ( typeof message === 'object' ) {
        message = message.message;
      }

      wrapper.innerHTML = '<div class="load-error"><h2>'+
          (message || '加载失败') +'，请重试</h2>'+
          '<button class="reload-btn">重新加载</button></div>';

      dom.$('.reload-btn', wrapper).addEventListener('touchstart', function () {
        wrapper.innerHTML = '<div class="reloading">加载中...</div>';
        reloadFunc.apply(me, args);
        // setTimeout(function () {

        //   reloadFunc.apply(me, args);
        // }, 3000);
      });
    },

    destory: empty // 销毁view
  };

function View ( config )  {

  var
    son = Object.create(parent),
    key = null;

  // son = Object.create(parent);
  // son.constructor = son;
  son.super = parent; // 用于访问父对象的属性和方法

  for ( key in config ) {
    if ( config.hasOwnProperty( key) ) {
      son[key] = config[key];
    }
  }

  return son;
}

module.exports = View;

