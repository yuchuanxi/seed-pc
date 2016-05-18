/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */

var
  qwest = require('./lib/qwest.js'),
  config = require('config'),
  toast = require('toast'),
  spinner = require('spinner'),

  loading = false,

  base = config.api.baseURL;

// qwest.setDefaultDataType('json');
function ajax ( method, url, params, success, catchCbk, complete, options ) {

  qwest[method]( url, params, options)
  .then(function ( xhr, res ) {
    // console.warn('then', arguments)
    if ( res.code === 12 && !loading ) { // 未登录 和后端约定好的错误码

      toast.show('info', '请重新登录', 400);
      location.hash = config.url.login;
      loading = true;
      setTimeout(function () {

        location.reload(); // 考虑做成弹框提示的方式
        loading = false;
      }, 400);
      store.clear(); // 清空所有缓存数据
    }
    else {
      success( res );
    }
  })
  .catch(function ( e, xhr, res) { // 异常错误
    // console.warn('catch', arguments)
    catchCbk && catchCbk();
  })
  .complete(function ( xhr, res ) {
    // console.warn('complete', arguments)
    complete();
  }); // 始终会执行，，按照本意
}

// 模糊服务端status:false和网络异常
function custom ( method, options, url, spinWrap, params, success, failure) {

  spinWrap && spinner.start(spinWrap);
  ajax(method, base + url, params, function ( res ) {

    if ( res.status ) {
      success( res );
    }
    else {
      failure && failure( res );
    }
  },
  // catch
  function () {
    // spinWrap && spinner.stop();
    failure && failure({});
  },
  // complete
  function () {
    spinWrap && spinner.stop();
  }, options);
}

module.exports = {
  execute: ajax,
  // 参数为 url, spinWrap, params, success, failure, catchCbk
  get: custom.bind( this, 'get', {cache: false, timeout: 15000}),
  // 参数为 url, spinWrap, params, success, failure, catchCbk
  post: custom.bind( this, 'post', {cache: false, timeout: 15000, dataType: 'json'})
};
