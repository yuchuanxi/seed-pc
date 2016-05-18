/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-16 21:50:09
 * @title       title
 * @description description
 */
'use strict';
const
  debug = require('debug')('F:mock/index'),
  Router = require('koa-router'),
  proxy = require('koa-proxy'),

  router = new Router();

debug('in mock data');
module.exports = router;


// // 发送验证码
// // {
// //  mobile: '137xxxx0322'
// // }
// router.post('/yiyuanpai/api/user/code', function* () {
//   this.body = {
//     status: true,
//     code: 0,
//     message: 'ok',
//     entry: true
//   };
// });
// // 登陆
// // 登陆成功后返回用户信息
// // {
// //  mobile: '137xxxx0322',
// //  password: 'asd123'
// // }
// router.post('/yiyuanpai/api/user/login', function* () {
//   this.body = {
//     status: true,
//     code: 0,
//     message: 'ok',
//     entry: {
//       mobile: '138585858123',
//       id: 12,
//       balance: 100
//     }
//   };
// });
