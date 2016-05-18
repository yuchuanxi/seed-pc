/**
 *
 * @authors     yuChuanXi (http://yuchuanxi.com, wangfei.f2e@gmail.com)
 * @date        2016-05-02 22:29:18
 * @title       路由名，hash映射表
 * @description description
 */
'use strict';

var
  routesConfig = require('routesConfig'),
  /**
   * 将字符串的首字母转成大写
   * @param  {String} string 需要处理的字符串
   * @return {String}        首字母大写后的字符串
   */
  upperFirstLetter = function (string) {
    return string.replace(/^\w/, function(firstLetter) {
      return firstLetter.toUpperCase();
    });
  },
  /**
   * 根据routes config generate routes-map
   * @param  {Object} rules     routes config(routes rule)
   * @param  {Object} routeMaps routes map, 用于存放结果
   * @param  {String} hashUrl   hash字符串
   * @param  {String} supName   上级路有名字
   * @return {Object}           routeMaps
   */
  generate = function (rules, routeMaps, hashUrl, supName) {
    routeMaps || (routeMaps = {});
    hashUrl || (hashUrl = '#');

    Object.keys(rules).forEach(function (key) {
      var
        route = rules[key],
        name = supName ? supName + upperFirstLetter(key) : key,
        subRoutes = Array.isArray(route) ? route[3] : route,
        hash = hashUrl + (route[1] ? route[1] : key);

      routeMaps[name] = hash;
      if (subRoutes) { // 存在子路有
        generate(subRoutes, routeMaps, hash + '/', name);
      }
    });

    return routeMaps;
  };

console.log('routesMap', generate(routesConfig))
module.exports = generate(routesConfig);
