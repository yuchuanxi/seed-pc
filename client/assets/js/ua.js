/**
 *
 * @authors     yuChuanXi (http://yuchuanxi.com, wangfei.f2e@gmail.com)
 * @date        2016-05-06 14:54:01
 * @title       title
 * @description description
 */
'use strict';

var
  ua = navigator.userAgent;

module.exports = {
  wechat: (/MicroMessenger/i).test(ua),
  mobile: Boolean(ua.match(/AppleWebKit.*Mobile.*/)),
  ios: Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
  iPhone: ua.indexOf('iPhone') > -1,
  android: ua.indexOf('Android') > -1
};
