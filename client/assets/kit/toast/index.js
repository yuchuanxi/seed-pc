/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */
require('./index.less');
/**
 * 消息组件
 */
module.exports = (function () {
  var
    toastType = 'toast',
    posType   = 'top',
    toast     = null,
    timer     = null,
    inserted  = false,
    TEMPLATE = {
      toast : '<p></p><p>{value}</p>',
      success : '<p><i class="toast-icon"></i></p><p>{value}</p>',
      error : '<p><i class="toast-icon"></i></p><p>{value}</p>',
      info : '<p><i class="toast-icon"></i></p><p>{value}</p>'
    },

    init = function () {
      inserted = true;
      // 全局只有一个实例
      document.querySelector('.views').insertAdjacentHTML('beforeend',
          '<div id="gToast" class="g-toast"></div>');
      toast = document.getElementById('gToast');
      // _subscribeCloseTag();
    },

    hide = function () {

      toast.classList.remove('show');
      toast.dataset.type && toast.classList.remove( toast.dataset.type );
      toast.innerHTML = '';
    },
    /**
     * 显示消息提示
     * @param type 类型  toast|success|error|info  空格 + class name 可以实现自定义样式
     * @param text 文字内容
     * @param dealy 持续时间 为0则不自动关闭,默认为2000ms
     */
    show = function ( type, text, dealy, pos ) {
      var
        className = type.split(/\s/);

      posType = pos || 'center';
      inserted || init();
      timer && clearTimeout( timer );
      toastType = className[ 0 ];
      // toast.className = toastType;
      toast.innerHTML = TEMPLATE[ toastType ].replace('{value}', text);
      toast.dataset.type && toast.classList.remove( toast.dataset.type );
      toast.dataset.type = toastType;
      toast.dataset.pos && toast.classList.remove( toast.dataset.pos );
      toast.dataset.pos = posType;
      toast.classList.add( toastType );
      toast.classList.add( 'show' );
      toast.classList.add(posType);
      dealy !== 0 && (timer = setTimeout( hide, dealy || 1200 ));
    };

    // _subscribeCloseTag = function () {
    //   toast.addEventListener('touchstart', function () {
    //     hide();
    //   }, false);
    // };

    // init();
  return {
    show: show,
    hide: hide
  };
}());
