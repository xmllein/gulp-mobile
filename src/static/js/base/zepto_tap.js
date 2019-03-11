define([
  'Zepto',
], function(Zepto) {
  'use strict';
  //手势
  return ! function (t) {
    function e(t) {
      return "tagName" in t ? t : t.parentNode
    }

    function n(t, e, n, i) {
      var o = Math.abs(t - e),
        r = Math.abs(n - i);
      return o >= r ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
    }

    function i() {
      d = null, u.last && (u.el.trigger("longTap"), u = {})
    }

    function o() {
      d && clearTimeout(d), d = null
    }

    function r() {
      a && clearTimeout(a), s && clearTimeout(s), c && clearTimeout(c), d && clearTimeout(d), a = s = c = d = null, u = {}
    }

    var a, s, c, d, u = {},
      l = 750;
    t(document).ready(function () {
      var f, h;
      t(document.body).bind("touchstart", function (n) {
        f = Date.now(), h = f - (u.last || f), u.el = t(e(n.touches[0].target)), a && clearTimeout(a), u.x1 = n.touches[0].pageX, u.y1 = n.touches[0].pageY, h > 0 && 250 >= h && (u.isDoubleTap = !0), u.last = f, d = setTimeout(i, l)
      }).bind("touchmove", function (t) {
        o(), u.x2 = t.touches[0].pageX, u.y2 = t.touches[0].pageY, Math.abs(u.x1 - u.x2) > 10 && t.preventDefault()
      }).bind("touchend", function () {
        o(), u.x2 && Math.abs(u.x1 - u.x2) > 30 || u.y2 && Math.abs(u.y1 - u.y2) > 30 ? c = setTimeout(function () {
          u.el.trigger("swipe"), u.el.trigger("swipe" + n(u.x1, u.x2, u.y1, u.y2)), u = {}
        }, 0) : "last" in u && (s = setTimeout(function () {
          var e = t.Event("tap");
          e.cancelTouch = r, u.el.trigger(e), u.isDoubleTap ? (u.el.trigger("doubleTap"), u = {}) : a = setTimeout(function () {
            a = null, u.el.trigger("singleTap"), u = {}
          }, 250)
        }, 0))
      }).bind("touchcancel", r), t(window).bind("scroll", r)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
      t.fn[e] = function (t) {
        return this.bind(e, t)
      }
    })
  }(Zepto)
  
});