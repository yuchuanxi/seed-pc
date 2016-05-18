/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 * 路由配置
 */
// 打包到一起，不进行异步加载
// require('../../pages/home/index.js');
// require('../../pages/questions/index.js');
// require('../../pages/about/index.js');

var
  Router = require('Router'),
  route = require('route'),
  routesConfig = require('routesConfig'),
  routesUrl = generate(routesConfig),
  path = location.hash || routesUrl.home;

console.log('routes', generateRoutesConfig(routesConfig, {}));
module.exports = new Router(generateRoutesConfig(routesConfig, {})).configure({
// module.exports = new Router({
//   '/': generateRouteCallback('home'),
//   '/questions': generateRouteCallback('questions'),
//   '/about': generateRouteCallback('about')
// }).configure({
  // delimiter: '/'
  // history: true,
  // on: function () {
  //   console.log('ON', arguments);
  //   // history.push(location.hash);
  //   // console.log(history);
  // },
  // // recurse: 'forward',
  // before: function () {
  //   // console.log(location.hash)
  //   spinner.start(document.querySelector('.views'));
  // }
  // after: function () { // 切换view之前，关闭当前view中的弹框等需要关闭的组件
  //   // 如果在native中
  //   // spinner.stop();
  //   // route.operateType = 'back'; // 过滤掉那些非route配置里的浏览器返回
  // }
  notfound: function () {
    var hash = location.hash;
    if (hash) {
      hash = hash.split('&');
      location.href = (location.search ? location.search +'&'+ hash[1] : '?'+ hash[1]) + hash[0];
      // location.hash = location.hash.split('&')[0]
      // location.href = location.href
    }
    else {
      location.href = path;
    }
  }
}).init(path);

function upperFirstLetter (string) {
  return string.replace(/^\w/, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

function generateRouteCallback (name) {
  return function () {
    var args = [].slice.call(arguments, 0);

    require(['../../pages/'+ name +'/index.js'], function (view) {
      view.el.view ? view.updateStatus.apply(view, args) : view.init.apply(view, args);

      route.go(view);
    });
  }
}

function generateRoutesConfig (rules, routeMaps, supPath) {
  supPath || (supPath = '');

  Object.keys(rules).forEach(function (key) {
    var
      curRoute = rules[key],
      rule = curRoute[0] ? curRoute[0] : '/'+ key,
      modulePath = supPath + (curRoute[2] ? curRoute[2] : key),
      subRoutes = Array.isArray(curRoute) ? curRoute[3] : curRoute;

    console.log('modulePath', modulePath);
    if (subRoutes) { // 存在子路有
      routeMaps[rule] = {
        on: generateRouteCallback(modulePath)
      };
      generateRoutesConfig(subRoutes, routeMaps[rule], modulePath + '/')
    }
    else {
      routeMaps[rule] = generateRouteCallback(modulePath);
    }
  });

  return routeMaps;
}
/**
 * 根据routes config generate routes-map
 * @param  {Object} rules     routes config(routes rule)
 * @param  {Object} routeMaps routes map, 用于存放结果
 * @param  {String} hashUrl   hash字符串
 * @param  {String} supName   上级路有名字
 * @return {Object}           routeMaps
 */
function generate (rules, routeMaps, hashUrl, supName) {
  routeMaps || (routeMaps = {});
  hashUrl || (hashUrl = '#');

  Object.keys(rules).forEach(function (key) {
    var
      r = rules[key],
      name = supName ? supName + upperFirstLetter(key) : key,
      subRoutes = Array.isArray(r) ? r[3] : r,
      hash = hashUrl + (r[1] !== undefined ? r[1] : key);

    routeMaps[name] = hash;
    if (subRoutes) { // 存在子路有
      generate(subRoutes, routeMaps, hash + '/', name);
    }
  });

  return routeMaps;
}

module.exports = routesUrl;
