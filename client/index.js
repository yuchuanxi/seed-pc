/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 10:34:07
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');
require('routes');

(function ready (fn) {

  function onReady () {
    document.removeEventListener('DOMContentLoaded', onReady);
    fn();
  }

  if (document.readyState !== 'loading') {
    fn();
  }
  else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
}(function () {

  // 手机上需要设置rem
  // if ( window.innerWidth > 500 ) {
  //   (function () {
  //     // 设置rem的值(设计稿为750px宽)
  //     // console.warn(window.innerWidth)
  //     // Mobile Safari reports 980 width when loading,
  //     // but the device width when called on scroll or resize event,
  //     // or if called inside `setTimeout` function, even if the delay is 0.
  //     setTimeout(function () {

  //       document.documentElement.style.fontSize = (window.innerWidth / 7.5) + 'px';
  //     }, 0);
  //   }());
  // }
  // 设置iOS顶部的20px高度
  // if ( navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ) {
  //   // views.style.top = '20px';
  //   // views.style.height = (document.body.offsetHeight - 20) + 'px';
  //   views.style.height = views.offsetHeight +'px'; // 防止iOS上键盘拉高容器
  //   document.addEventListener('blur', function (  ) {
  //     document.body.style.height = views.offsetHeight + 'px';
  //   }, true);
  // }
  // document.body.style.height = document.offsetHeight + 'px';
  // window.addEventListener('resize', setRem);

  // function getUrlQuerys () {
  //   var
  //     querys = location.search.slice(1).split('&'),
  //     query = null,
  //     i = 0,
  //     data = {};

  //   while ( (query = querys[i++]) ) {
  //     query = query.split('=')
  //     data[query[0]] = query[1];
  //   }

  //   return data;
  // }
  // window.getUrlQuerys = getUrlQuerys;
  // window.querys = getUrlQuerys();


}));
