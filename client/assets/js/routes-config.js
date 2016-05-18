/**
 *
 * @authors     yuChuanXi (http://yuchuanxi.com, wangfei.f2e@gmail.com)
 * @date        2016-04-29 17:58:44
 * @title       路有配置文件
 * @description
 * 路由根据该配置文件生成路有规则table并初始化路由
 * routes-map根据该文件生成路由信息table，页面通过routes-map渲染页面链接
 */
'use strict';

// routeName: routeRule, hashUrl, modulePath, subRoutes
// 1
// rotueName: [routeRule, hashUrl, modulePath, subRoutes]
// 2
// routeName: []
// 3
// rotueName: {
//   sub1: [],
//   sub2: []
// }
module.exports = {
  // home: ['/home', '#home', 'home'],
  home: [],
  questions: [],
  about: [],

  // store: ['/store', '#store', 'store', {
  //   info: [],
  //   alipay: [, 'alipay2', 'alipay2']
  // }],
  // store: {
  //   info: [],
  //   test: ['', 'test2', 'test2']
  // },
  // log: ['/log/?(\w*)']
};
