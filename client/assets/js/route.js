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
  dom = require('dom'),
  store = require('store'),

  viewMask = dom.$('.views-mask'),

  route = {
    current: null,
    history: [],
    viewHistory: {},
    operateType: 'forward',
    go: function ( viewObj ) {
      var
        me = this,
        current = this.current,
        type = this.operateType,
        hash = location.hash,
        his = this.history,
        view = viewObj.el.view;

      if ( current === view ) {
        return false;
      }
      else if ( type === 'back' ) {
        this.operateType = 'forward';

        viewMask.classList.add('show');
        current.remove();
        setTimeout(function () {
          viewMask.classList.remove('show');
        }, 400);
      }
      else if ( type === 'replace' ) {
        this.operateType = 'forward';

        viewMask.classList.add('show');
        current.remove();
        setTimeout(function () {
          viewMask.classList.remove('show');
        }, 400);
      }
      else { // forward

        current && current.classList.remove('show')
        viewMask.classList.add('show');
        setTimeout(function () {
          viewMask.classList.remove('show');
        }, 400);
      }

      if ( type !== 'back' ) {

        his.push(location.hash);
      }
      store.set('history', his);
      view.classList.add('show');
      document.querySelector('title').innerHTML = view.dataset.title;
      me.current = view;
      me.viewHistory[hash] = viewObj;
      // console.log('start ---------------------------------------------------')
      // console.log('history: ', his)
      // console.log('viewHistory: ',me.viewHistory)
      // console.log('end -----------------------------------------------------')
    },
    forward: function ( hash) {
      location.hash = hash;
    },
    back: function ( from ) {
      var
        me = this,
        path = location.hash;

      me.operateType = 'back';
      me.history.pop();
      me.viewHistory[path] && me.viewHistory[path].destroy();
      delete me.viewHistory[path];
      location.replace(from);
    },
    replace: function ( hash ) {
      var
        me = this,
        path = location.hash;

      me.operateType = 'replace';
      me.history.pop();
      me.viewHistory[path] && me.viewHistory[path].destroy();
      delete me.viewHistory[path];
      location.replace(hash);
    }
  };

module.exports = route;
