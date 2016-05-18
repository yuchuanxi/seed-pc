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
 * 弹出框组件
 */
var popup = (function () {
  var
    // query = document.querySelector,
    popupEl,
    maskEl,
    transition,
    clickMask2Close,
    // canOverride = true,
    inserted = false,
    // POSITION = [ 'top', 'center', 'bottom' ],
    ANIM = {
      top: [ 'slideDownIn', 'slideUpOut' ],
      bottom: [ 'slideUpIn', 'slideDownOut' ],
      defaultAnim: [ 'bounceIn', 'bounceOut' ]
    },
    TEMPLATE = {
      alert :   '<h2 class="g-popup-title">{title}</h2>' +
                '<div class="g-popup-content">{content}</div>' +
                '<div class="g-popup-btns flex">' +
                  '<a class="g-popup-btn flex-1 bt tap-highlight"'+
                      'data-target="closePopup" data-icon="checkmark">{ok}</a>' +
                '</div>',
      confirm : '<h2 class="g-popup-title">{title}</h2>' +
                '<div class="g-popup-content">{content}</div>' +
                '<div class="g-popup-btns flex">' +
                  '<a class="g-popup-btn flex-1 btr tap-highlight cancel"'+
                      'data-icon="close">{cancel}</a>' +
                  '<a class="g-popup-btn flex-1 bt tap-highlight"'+
                      'data-icon="checkmark">{ok}</a>' +
                '</div>',
      loading : '<i class="icon spinner"></i><p>{title}</p>'
    },
    opened = false,

    hide = function ( noTransition ) {

      maskEl.classList.remove('show');

      // canOverride || (canOverride = true); // 被设置为不能被覆盖的弹唱关闭时释放控制权
      if ( transition && !noTransition ) {
        // J.anim(popupEl,transition[1],200,function (){
          // popupEl.hide().empty();
          // J.opened = false;
        // });
        popupEl.classList.remove('show');
        popupEl.innerHTML = '';
        opened = false;
      }
      else {
        popupEl.classList.remove('show');
        popupEl.innerHTML = '';
        opened = false;
      }
    },
    subscribeEvents = function () {
      maskEl.addEventListener('touchstart', function (e) {
        clickMask2Close && hide();
        e.preventDefault();
      });
      popupEl.addEventListener('touchstart', function (e) {
        if ( e.target.matches( '[data-target="closePopup"]' ) ) {

          hide();
          e.preventDefault();
        }
      });
    },
    /**
     * 全局只有一个popup实例
     * @private
     */
    init = function () {
      document.body.insertAdjacentHTML('beforeend',
          '<div id="gPopupMask" class="g-popup-mask"></div>'+
          '<div id="gPopup" class="g-popup"></div>');
      maskEl = document.getElementById('gPopupMask');
      popupEl = document.getElementById('gPopup');

      inserted = true;
      subscribeEvents();
    },


    show = function (options) {
      var
        settings = {
          height : null, // 高度
          width : null, // 宽度
          opacity : null, // 透明度
          url : null, // 远程加载url
          tplId : null, // 加载模板ID
          tplData : null, // 模板数据，配合tplId使用
          html : '', // popup内容
          // 位置 {@String top|top-second|center|bottom|bottom-second}   {@object  css样式}
          pos : 'center',
          clickMask2Close : true, //  是否点击外层遮罩关闭popup
          showCloseBtn : true, //  是否显示关闭按钮
          arrowDirection : null, // popover的箭头指向
          // canOverride: true,
          animation : true, // 是否显示动画
          timingFunc : 'linear',
          duration : 200, // 动画执行时间
          onShow : null  // @event 在popup内容加载完毕，动画开始前触发
        },
        i,
        keys,
        transKey,
        html;

      inserted || init();

      for ( i in options ) {
        if ( options.hasOwnProperty(i) ) {
          settings[i] = options[i];
        }
      }
      // settings = G.extend( settings, options );

      clickMask2Close = settings.clickMask2Close;
      // canOverride = settings.canOverride;
      settings.opacity !== null && (maskEl.style.opacity = settings.opacity);
      // rest position and class
      popupEl.setAttribute('style', '');
      popupEl.setAttribute('class', 'g-popup');
      settings.width && (popupEl.style.width = settings.width);
      settings.height && (popupEl.style.height = settings.height);

      keys = [];
      i = 0;

      if ( typeof settings.pos === 'object' && settings.pos !== null ) {
        keys = Object.keys( settings.pos );
        while ( keys[i] ) {
          popupEl.style[ keys[ i ] ] = settings.pos[ keys[ i ] ];
          i++;
        }
        transition = ANIM.defaultAnim;
      }
      else if ( typeof settings.pos === 'string' ) {
        popupEl.classList.add( settings.pos );
        transKey = settings.pos.indexOf('top')>-1 ?
            'top' : (settings.pos.indexOf('bottom')>-1?'bottom':'defaultAnim');
        transition = ANIM[ transKey ];
      }
      else {
        throw new Error('错误的参数！');
      }

      maskEl.classList.add('show');

      if (settings.html) {
        html = settings.html;
      }

      if ( settings.showCloseBtn ) {
        html += '<div id="closePopup" data-target="closePopup"'+
            'class="icon cancel-circle"></div>';
      }
      if ( settings.arrowDirection ) {
        popupEl.classList.add( 'arrow ' + settings.arrowDirection );
        popupEl.style.padding = '8px';
        if ( settings.arrowDirection === 'top' || settings.arrowDirection === 'bottom' ) {
          transition = ANIM[settings.arrowDirection];
        }
      }

      popupEl.innerHTML = html;
      popupEl.classList.add('show');

      // 初始化Popup中组件元素
      settings.onShow && settings.onShow.call(popupEl);

      // if ( settings.pos === 'center' ) {
      //   var height = popupEl.offsetHeight;
      //   popupEl.style.marginTop = '-' + height / 2 + 'px';
      // }

      if ( settings.animation ) {
        // J.anim(popupEl,transition[0],settings.duration,settings.timingFunc);
      }

      opened = true;
    },

    /**
     * alert组件
     * @param title 标题
     * @param content 内容
     */
    alert = function ( title, content, btnName ) {
      // if ( !canOverride ) { return false; } // 是否允许弹窗被新触发的弹窗覆盖
      var markup = TEMPLATE.alert
          .replace('{title}', title)
          .replace('{content}', content)
          .replace('{ok}', btnName || '确定');

      show({
        html: markup,
        pos: 'center',
        clickMask2Close: false,
        showCloseBtn: false
      });
    },
    /**
     * confirm 组件
     * @param title 标题
     * @param content 内容
     * @param okCall 确定按钮handler
     * @param cancelCall 取消按钮handler
     */
    confirm = function ( title, content, okCall, cancelCall, okText, cancelText ) {
      // if ( !canOverride ) { return false; } // 是否允许弹窗被新触发的弹窗覆盖
      var
        markup = TEMPLATE.confirm
          .replace('{title}', title)
          .replace('{content}', content)
          .replace('{cancel}', cancelText || '取消')
          .replace('{ok}', okText || '确定'),
        checkmark,
        closebtn;

      show({
        html: markup,
        pos: 'center',
        clickMask2Close: false,
        showCloseBtn: false
        // canOverride: !!override
      });

      checkmark = popupEl.querySelector('.g-popup-btns [data-icon="checkmark"]');
      closebtn = popupEl.querySelector('.g-popup-btns [data-icon="close"]');
      checkmark.addEventListener('touchstart', function () {

        okCall && okCall.call(this);
        if ( popup.forbid ) return false;
        hide();
      }, false);
      closebtn.addEventListener('touchstart', function () {

        cancelCall && cancelCall.call(this);
        if ( popup.forbid ) return false;
        hide();
      }, false);
      // 防止出现“点透“
      checkmark.addEventListener('touchend', function (e) {
        e.preventDefault();
      }, false);
      closebtn.addEventListener('touchend', function (e) {
        e.preventDefault();
      }, false);

    };

  return {
    open: show,
    close: hide,
    alert: alert,
    confirm: confirm,
    opened: opened,
    forbid: false
  };
}());

module.exports = popup;
