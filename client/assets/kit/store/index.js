/**
 *
 * @authors gooofly (wangfei.f2e@gmail.com, http://www.gooofly.com)
 * @date    2016-01-16 10:13:08
 * @version $Id$
 *
 * title
 * --------------------------------------------
 */
// 为jshint定义全局变量
/* jshint es3: true */
/* global localStorage, module */
'use strict';
var store = {version: '1.3.17'};

store.has = function (key) {
  return store.get(key) !== undefined;
};

store.transact = function (key, defaultVal, transactionFn) {
  var
    val;

  if (transactionFn === null) {
    transactionFn = defaultVal;
    defaultVal = null;
  }
  if (defaultVal === null) {
    defaultVal = {};
  }
  val = store.get(key, defaultVal);
  transactionFn(val);
  store.set(key, val);
};

store.serialize = function (value) {
  return JSON.stringify(value);
};
store.deserialize = function (value) {
  if (typeof value != 'string') { return undefined; }
  try { return JSON.parse(value); }
  catch (e) { return value || undefined; }
};

store.set = function (key, val) {
  if (val === undefined) { return store.remove(key); }
  localStorage.setItem(key, store.serialize(val));
  return val;
};
store.get = function (key, defaultVal) {
  var
    val = store.deserialize(localStorage.getItem(key));

  return (val === undefined ? defaultVal : val);
};
store.remove = function (key) { localStorage.removeItem(key); };
store.clear = function () { localStorage.clear(); };
store.getAll = function () {
  var
    ret = {};

  store.forEach(function (key, val) {
    ret[key] = val;
  });
  return ret;
};
store.forEach = function (callback) {
  var
    i = 0,
    key;

  for (i=0; i<localStorage.length; i++) {
    key = localStorage.key(i);
    callback(key, store.get(key));
  }
};

module.exports = store;
