/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 * 下拉刷新，上拉加载组件
 * 改写自［西门 的 dropload 0.3.0(150410)]
 */

require('./index.less');

var
  DragLoad = function ( element, options ) {
    var
      me = this;

    me.element = element;
    me.inserted = false;
    me.loading = false;
    me.started = false;
    me.init(options);
  };

DragLoad.prototype = {
  constructor: DragLoad,

  tplUp : '<div class="dp-up">'+
      '<div class="dp-refresh">↓下拉刷新</div>'+
      '<div class="dp-update">↑释放更新</div>'+
      '<div class="dp-load"><span class="dp-loading"></span>加载中...</div>'+
    '</div>',
  // tplDown : '<div class="dp-down">'+
  //     '<div class="dp-refresh">↑上拉加载更多</div>'+
  //     '<div class="dp-update">↓释放加载</div>'+
  //     '<div class="dp-load"><span class="dp-loading"></span>加载中...</div>'+
  //   '</div>',
  tplScroll: '<div class="dp-scroll">'+
      '<div class="dp-load"><span class="dp-loading"></span>加载中...</div>'+
      '</div>',
  distance : 50, // 拉动距离
  refreshFn : '', // 上方function
  // loadDownFn : '', // 下方function
  scrollFn: '',

  init: function ( options ) {
    var
      me = this,
      element = me.element,
      key = null;

    for ( key in options ) {
      if ( options.hasOwnProperty( key) ) {
        me[key] = options[key];
      }
    }

    me.noPrefix =  element.style.transform !== undefined; // 是否webkit需要浏览器前缀
    // 绑定事件监听器
    element.addEventListener('touchstart', function ( e ) {
      // 只有在非loading状态才能触发控件
      me.loading || me.start(e);
    });
    element.addEventListener('touchmove', function ( e ) {
      // 只有touchstart事件触发控件，move和end事件才起作用
      me.started && me.move(e);
    });
    element.addEventListener('touchend', function () {
      // 只有touchstart事件触发控件，move和end事件才起作用
      me.started && me.end();
    });
    element.addEventListener('scroll', function () {
      // 只有在非loading状态才能触发控件
      me.loading || me.scroll();
    });
  },
  start: function ( e ) {
    var
      me = this;

    me.started = true;
    me.startY = e.touches[0].pageY;
    me.loadHeight = me.element.offsetHeight;
    me.childrenHeight = me.element.firstElementChild.offsetHeight;
    me.scrollTop = me.element.scrollTop;
  },
  move: function ( e ) {
    var
      me = this,
      distance = me.distance,
      absMoveY = 0;

    me.curY = e.touches[0].pageY;
    me.moveY = me.curY - me.startY;

    // console.log(me.moveY)
    me.direction = me.moveY > 0 ? 'down' : 'up';
    absMoveY = Math.abs(me.moveY);

    // 加载上方
    if ( me.refreshFn && me.scrollTop <= 0 && me.direction === 'down' ) {

      e.preventDefault();
      if ( !me.inserted ) {
        me.element.insertAdjacentHTML('afterbegin', me.tplUp);
        me.inserted = true;
      }
      me.domUp = me.element.querySelector('.dp-up');
      me.domUp.style[me.noPrefix ? 'transition': '-webkit-transition'] = 'all 0ms';

      // 下拉
      if ( absMoveY <= distance ) {
        me.offsetY = absMoveY;
        me.domUp.dataset.type = 'refresh';
      }
      // 指定距离 < 下拉距离 < 指定距离*2
      else if ( absMoveY > distance && absMoveY <= distance * 2 ) {
        me.offsetY = (distance + absMoveY) * 0.5;
        me.domUp.dataset.type = 'update';
      }
      // 下拉距离 > 指定距离*2
      else {
        me.offsetY = distance * 1.1 + absMoveY * 0.2;
      }

      // console.log(me.offsetY)

      me.domUp.style.height = me.offsetY +'px';
    }

    // 加载下方
    // if (me.loadDownFn &&
    //     me.childrenHeight <= (me.loadHeight + me.scrollTop) &&
    //     me.direction === 'up') {

    //   e.preventDefault();
    //   if ( !me.inserted ) {
    //     me.element.insertAdjacentHTML('beforeend', me.tplDown);
    //     me.domDown = me.element.querySelector('.dp-down');
    //     me.domDown.style[me.noPrefix ? 'transition': '-webkit-transition'] = 'all 0ms';
    //     me.inserted = true;
    //   }

    //   // 上拉
    //   if ( absMoveY <= distance ) {
    //     me.offsetY = absMoveY;
    //     me.domDown.dataset.type = 'refresh';
    //   }
    //   // 指定距离 < 上拉距离 < 指定距离*2
    //   else if ( absMoveY > distance && absMoveY <= distance * 2 ) {
    //     me.offsetY = distance * 0.5 + absMoveY * 0.5;
    //     me.domDown.dataset.type = 'update';
    //   }
    //   // 上拉距离 > 指定距离*2
    //   else {
    //     me.offsetY = distance * 1.1 + absMoveY * 0.2;
    //   }

    //   me.domDown.style.height =  me.offsetY +'px';
    //   me.element.scrollTop = me.offsetY+me.scrollTop;
    // }
  },
  end: function () {
    var
      me = this;

    me.started = false;
    // if ( me.inserted && !me.domScroll ) {
    if ( me.inserted ) {

      me.domCur = ({
        'down': me.domUp,
        'up': me.domDown
      })[me.direction];

      // fnTransition(me.domCur, 300);
      me.domCur.style[me.noPrefix ? 'transition': '-webkit-transition'] = 'all 300ms';
      if ( Math.abs(me.moveY) > me.distance ) {

        me.domCur.style.height = me.distance +'px';
        me.domCur.dataset.type = 'load';
        if ( me.refreshFn && me.direction === 'down' ) {
          me.loading = true;
          setTimeout(function () { // 3s后自动归位
            me.loading = false;
          }, 3000);
          me.type = 'refresh';
          me.refreshFn(me);
          // setTimeout(function () {
          //   me.refreshFn(me);
          // }, 1000);
        }
        // else if ( me.loadDownFn && me.direction === 'up' ) {
        //   me.loadDownFn(me);
        // }
      }
      else {
        me.resetPR();
      }
    }
  },
  scroll: function () {
    var
      me = this,
      el = me.element;

    if ( !me.closeScroll && !me.loading && me.scrollFn &&
         el.scrollHeight - el.scrollTop - el.offsetHeight <= 0.5 * el.offsetHeight ) {

      me.loading = true;
      setTimeout(function () { // 3s后自动归位
        me.loading = false;
      }, 3000);
      me.type = 'scroll';
      el.insertAdjacentHTML('beforeend', me.tplScroll);
      me.domScroll = el.querySelector('.dp-scroll');

      // setTimeout(function ( ) {
      //   me.scrollFn(me);
      // }, 1000)
      me.scrollFn(me);
    }
  },
  /**
   * 加载失败调用（网络失败，系统异常等）
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  loadFailure: function ( message ) {
    var
      me = this;

    // console.log('failure')
    if ( me.type === 'scroll' ) {

      me.loading = false;
      me.closeScroll = true;
      me.domScroll.innerHTML = message;
      me.domScroll.firstElementChild.addEventListener('touchstart', function () {

        me.loading = true;
        setTimeout(function () { // 3s后自动归位
          me.loading = false;
        }, 3000);
        me.closeScroll = false;
        me.scrollFn(me);
        me.domScroll.innerHTML =
            '<div class="dp-load"><span class="dp-loading"></span>加载中...</div>';
      });
    }
    else {
      me.resetPR();
    }
  },
  /**
   * 加载成功
   * @param  {[type]} res     [description]
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  loadSuccess: function ( res, message ) {
    var
      me = this;

    // console.log('success')
    if ( me.type === 'scroll' ) {

      if ( !res.length ) {
        me.domScroll.innerHTML = message;
        me.closeScroll = true;
        me.loading = false;
      }
      else {
        me.resetScroll();
      }
    }
    else {
      me.resetPR();
    }
  },

  resetPR: function () {
    var
      me = this,
      domCur = me.domCur,
      transitionend = me.noPrefix ? 'transitionend' : 'webkitTransitionEnd';

    domCur && (domCur.style.height = '0px');
    domCur && domCur.addEventListener(transitionend, function () {
      domCur.remove();
      me.domCur = null;
    });

    me.loading = false;
    me.inserted = false;
    me.closeScroll = false;
    if ( me.domScroll ) {
      me.domScroll.remove();
      me.domScroll = null;
    }
  },
  resetScroll: function () {
    var
      me = this;

    me.loading = false;
    me.domScroll.remove();
    me.domScroll = null;
  }
};

module.exports = DragLoad;
