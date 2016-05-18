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

module.exports = (function () {
  var
    spinner = null, inserted = false,
    init = function () {
      document.body.insertAdjacentHTML('beforeend',
          '<div class="spinner" id="gSpinner"><div>Loading…</div></div>');

      spinner = document.getElementById('gSpinner');
      inserted = true;
    },
    close = function () {
      spinner.classList.remove('show');
    },
    open = function ( container ) {
      if ( container ) {

        inserted || init();
        var
          rect = container.getBoundingClientRect();

        spinner.style.top = (rect.top + rect.height / 2) + 'px';
        spinner.style.left = (rect.left + rect.width / 2) + 'px';
        spinner.classList.add('show');

        setTimeout(function () {
          close();
        }, 15000);
      }
    };

  return {
    start: open,
    stop: close
  };
}());
