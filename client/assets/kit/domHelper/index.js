/**
*
* @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
* @date    2016-01-16 10:13:08
* @version $Id$
*
* title
* --------------------------------------------
* 提供DOM相关方法，操作的DOM为原声DOM对象
*/

  /*
 * ChildNode polyfill
 * specifications: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode
 * version: 1.0
 * author: filip.mosner@firma.seznam.cz
 */
var
  buildDOM = function () {
    var nodes = Array.prototype.slice.call(arguments),
      frag = document.createDocumentFragment(),
      div, node;

    while ((node = nodes.shift())) {
      if (typeof node == 'string') {
        div = document.createElement('div');
        div.innerHTML = node;
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
      }
      else {
        frag.appendChild(node);
      }
    }

    return frag;
  },
  proto = {
    before: function () {
      var
        frag = buildDOM.apply(this, arguments);

      this.parentNode.insertBefore(frag, this);
    },
    after: function () {
      var
        frag = buildDOM.apply(this, arguments);

      this.parentNode.insertBefore(frag, this.nextSibling);
    },
    replaceWith: function () {
      var
        frag;

      if (this.parentNode) {
        frag = buildDOM.apply(this, arguments);

        this.parentNode.replaceChild(frag, this);
      }
    },
    remove: function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }
  },

  a = ['Element', 'DocumentType', 'CharacterData'], // interface
  b = ['before', 'after', 'replaceWith', 'remove'], // methods
  doc = document,
  querySelector =  function (selector, parentNode) {
    return (parentNode || doc).querySelector( selector );
  },
  querySelectorAll = function (selector, parentNode) {
    return [].slice.call((parentNode || doc).querySelectorAll( selector ));
  },
  /**
   * 返回当前元素的最近父元素
   * @param  {[type]} node     [description]
   * @param  {[type]} selector [description]
   * @return {[type]}          [description]
   */
  closest = function (node, selector) {
    var
      matches = false;

    do {
      matches = node.matches( selector );
    }
    while (!matches && (node = node.parentNode) && node.ownerDocument);

    return matches ? node : false;
  };

a.forEach(function (v) {
  b.forEach(function (func) {
    if (window[v]) {
      if (window[v].prototype[func]) { return; }
      window[v].prototype[func] = proto[func];
    }
  });
});

// Element matches Polyfill
// https://gist.github.com/jonathantneal/3062955
Element && !Element.prototype.matches && (function ( protot ) {

  protot.matches = protot.matchesSelector ||
      // protot.mozMatchesSelector ||
      protot.msMatchesSelector ||
      // protot.oMatchesSelector ||
      protot.webkitMatchesSelector ||
      function (selector) {
        var
          me = this,
          nodes = (me.parentNode || me.document || me.ownerDocument)
              .querySelectorAll(selector), i = -1;

        while (nodes[ ++i ] && nodes[i] !== me);

        return Boolean(nodes[i]);
      };
}(Element.prototype));

module.exports = {
  $: querySelector,
  $$: querySelectorAll,
  get: doc.getElementById.bind( doc ),
  closest: closest
};
