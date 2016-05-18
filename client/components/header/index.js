/**
 *
 * @authors     gooofly (http://gooofly.com, wangfei.f2e@gmail.com)
 * @date        2016-01-17 15:48:25
 * @title       title
 * @description description
 */
'use strict';
require('./index.less');

var
  // R = require('raphael'),
  dom = require('dom'),
  routesMap = require('routesMap'),
  route = require('route'),
  html = require('./index.jade')({
    url: routesMap
  }),
  inserted = false,
  header = dom.$('.header'),
  // changeTab = function ( tag, hash ) {
  //   dom.$('.cur', header).classList.remove('cur');
  //   tag.classList.add('cur');

  //   hash && (location.hash = tag.dataset.href);
  // },
  initEvent = function () {
    header.addEventListener('click', function ( e ) {
      var
        tag = e.target;

      if ( tag.matches('a') && tag.getAttribute('href') !== location.hash ) {
        // dom.$('.views .view').style.display = 'none';
        route.replace(tag.href);
      }

      e.preventDefault();
    });
  },
  init = function () {
    header.insertAdjacentHTML('afterbegin', html);
    inserted = true;

    initEvent();
    require(['raphael'], function (R) {
      initSvg(R);
    });
  },

  initSvg = function (R) {
    var
      paper = new R(dom.$('.navbar-logo'), 600, 500),
      mouthUp,
      mouthDown,
      eye,
      wingUp,
      wingDown,
      body,
      bodyShadow,

      wing,
      bird = paper.set();

    mouthUp = paper.path('M21.1,118.7L88,145.4L72.4,182.4Z').
      attr({
        'fill': '315-#F47B26-#F68C22:22.82-#F7991E:47.49-#F8A11B:72.92-#F8A31A'
      });
    mouthDown = paper.path('M11.2,121.1L79.7,145.4L120.5,50.3Z').
      attr({
        'fill': '315-#FCB121-#FDBC18:28.59-#FDC40F:63.14-#FDC70A'
      });
    body = paper.path('M578.3,145.8c8.8,58.4-7.2,295.4-254.6,295.4c-198.5,0-260.2-169.7-260.2-257c0-86.4,44.5-165.7,139.3-165.7c112.1,0,125.7,138.5,196,162.8C482.9,210.3,538.2,189.1,578.3,145.8z')
      .attr({
        'fill': '315-#F04B35-#CD2927:60.65-#BF1621'
      });
    bodyShadow = paper.path('M579.1,145.4c-90.3,97.6-347.8,84.1-347.8,84.1C253.9,302.7,322.1,356,402.9,356c84.7,0,155.7-58.7,174.6-137.6C581.9,187,581.3,160.3,579.1,145.4z')
      .attr({
        'fill': '315-#7E0009-#8A000E:23.79-#A90B19:70.29-#C0131E'
      });
    wingDown = paper.path('M508.5,116.1c-14.8,29.9-45.6,50.5-81.3,50.5c-50.1,0-90.7-40.6-90.7-90.7c0-13.1,2.8-25.6,7.8-36.8c-68.2,14.3-119.5,74.8-119.5,147.3c0,83.1,67.4,150.5,150.5,150.5c83.1,0,150.5-67.4,150.5-150.5C525.9,161,519.6,137.1,508.5,116.1z')
      .attr({
        'fill': '315-#F26537-#E5552D:40.49-#D94424'
      });
    wingUp = paper.path('M362.2,289.4c-52.2,0-98.9-23.1-130.6-59.6c18.5,61.9,75.9,107,143.8,107c82.9,0,150.1-67.2,150.1-150.1c0-4-0.2-8-0.5-12C501.1,241.6,437.3,289.4,362.2,289.4z')
      .attr({
        'fill': '315-#F36E38-#E55B2C:44.94-#DA4B24'
      });
    eye = paper.circle(158.6, 110.9, 16.2).
      attr({
        'fill': '315-#FCB121-#FDBC18:28.59-#FDC40F:63.14-#FDC70A'
      });

    bird.push(mouthUp, mouthDown, body, bodyShadow, wingDown, wingUp, eye);
    // console.log(bird)
    bird.attr({
      'stroke-width': 0
      // transform: 't-570, -500'
    });

    wing = paper.set(wingUp, wingDown);

    bird.hover(function () {
      mouthUp.stop().animate(R.animation({
        '60%': {transform: 'r-35'},
        '100%': {transform: ''}
      }, 400).repeat(Infinity));

      wing.stop().animate(R.animation({
        '30%': {transform: 's1.1r10'},
        '100%': {transform: ''}
      }, 1000).repeat(Infinity));
      eye.stop().animate(R.animation({
        '50%': {
          fill: '#fff',
          r: 18
        },
        '100%': {
          'fill': '#f60',
          r: 12.2
        }
      }, 100).repeat(Infinity));
    }, function () {
      mouthUp.stop().animate({
        transform: ''
      });
      wing.stop().animate({
        transform: ''
      });
      eye.stop().attr({
        'fill': '315-#FCB121-#FDBC18:28.59-#FDC40F:63.14-#FDC70A',
        r: 16.2
      });
      console.log('hover out')
    })

    // paper.attr('transform', 's0.5')
  };

module.exports = {
  show: function () {
    inserted || init();

    document.body.classList.add('show-header');
    header.classList.add('show');
  },
  hide: function () {
    document.body.classList.remove('show-header');
    header && header.classList.remove('show');
  }
};
