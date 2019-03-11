'use strict';
var require = {
  paths: {
    jquery: '../lib/jquery',
    Zepto: '../lib/zepto',
    module1: '../base/base_module1',
    underscore: "../lib/underscore",
    weui:"../lib/weui",
    math: '../base/base_math',
    modernizr: '../lib/modernizr',
    zeptoAni: '../base/zepto_ani',
    zeptoShow: '../base/zepto_show',
    zeptoSelector: '../base/zepto_selector',
    zeptoTap: '../base/zepto_tap',
  },
  shim:{
    'modernizr': {
      exports: 'Modernizr'
    }
  }
};



if (typeof module === "object" && typeof module.exports === 'object') {
  module.exports = require;
}