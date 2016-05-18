/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-13 13:57:40
 * @title       title
 * @description description
 */
'use strict';
// const path = require('path');


module.exports = function (root, isDev) {
  return {
    mongodb: 'mongodb://localhost:27017/test',
    // model: path.join(root, 'model'),
    // view: path.join(root, 'view'),
    // controller: path.join(root, 'controller'),
    // mainpath: path.join(root, 'server'),
    // secret: '1234!@#$',
    root: root,
    // disqus_shortname: 'disqus',
    port: 2022,

    // 模块别名，便于引用
    aliasSourceMap: {
      'Router': 'assets/lib/director.js',
      // 'slimscroll': 'assets/lib/fullPage.js/vendors/jquery.slimscroll.js',
      'fullPage': 'assets/lib/fullPage.js/jquery.fullPage.js',
      'fullPageCss': 'assets/lib/fullPage.js/jquery.fullPage.css',

      'rangeSlider': 'assets/lib/ion.rangeSlider-2.1.4/js/ion-rangeSlider/ion.rangeSlider.js',
      'rangeSliderCss': 'assets/lib/ion.rangeSlider-2.1.4/css/ion.rangeSlider.css',
      'rangeSliderSkinCss': 'assets/lib/ion.rangeSlider-2.1.4/css/ion.rangeSlider.skinHTML5.css',

      'dom': 'assets/kit/domHelper/index.js',
      'store': 'assets/kit/store/index.js',
      // 'ajax': 'assets/kit/ajax/index.js',
      // 'spinner': 'assets/kit/spinner/index.js',
      // 'toast': 'assets/kit/toast/index.js',
      // 'popup': 'assets/kit/popup/index.js',

      'views': 'assets/js/views.js',

      'route': 'assets/js/route.js',
      'routesConfig': 'assets/js/routes-config.js', // 前端路由配置
      'routesMap': 'assets/js/routes-map.js',
      'routes': 'assets/js/routes.js',

      'ua': 'assets/js/ua.js', // userAgent嗅探 

      'configApi': isDev ? 'assets/js/api-config-dev.js' : 'assets/js/api-config.js' // 接口配置
    },
    // 变更不频繁的模块，放到vendors模块引用
    vendors: [
      // 'jquery',
      // // 'slimscroll',
      // 'fullPage',
      // 'fullPageCss',
      // 'rangeSlider',
      // 'rangeSliderCss',
      // 'rangeSliderSkinCss',

      // 'd3',
      // 'raphael',
      'Router',

      'dom',
      'store'
    ],
    // 变更比较频繁的模块，放到index模块去引用
    index: [
      'route',
      'views'
    ]
    // template: {
    //   webtitle: 'blog',
    //   navs: [{
    //     text: '最新',
    //     href: '/'
    //   }, {
    //     text: 'Javascript',
    //     href: '/category/javascript'
    //   }, {
    //     text: 'Node.js',
    //     href: '/category/nodejs'
    //   }, {
    //     text: 'V8',
    //     href: '/category/v8'
    //   }, {
    //     text: 'Python',
    //     href: '/category/python'
    //   }, {
    //     text: '算法',
    //     href: '/category/algorithm'
    //   }]
    // }
  }
};
