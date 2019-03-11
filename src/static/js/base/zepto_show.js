define(['Zepto'], function(Zepto) {
  return ! function (t, e) {
    function n(n, r, i, o, a) {
      "function" != typeof r || a || (a = r, r = e);
      var s = {
        opacity: i
      };
      return o && (s.scale = o, n.css(t.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, r, null, a)
    }

    function r(e, r, i, o) {
      return n(e, r, 0, i, function () {
        a.call(t(this)), o && o.call(this)
      })
    }

    var i = window.document,
      o = (i.documentElement, t.fn.show),
      a = t.fn.hide,
      s = t.fn.toggle;
    t.fn.show = function (t, r) {
      return o.call(this), t === e ? t = 0 : this.css("opacity", 0), n(this, t, 1, "", r)
    }, t.fn.hide = function (t, n) {
      return t === e ? a.call(this) : r(this, t, "0,0", n)
    }, t.fn.toggle = function (n, r) {
      return n === e || "boolean" == typeof n ? s.call(this, n) : this.each(function () {
        var e = t(this);
        e["none" == e.css("display") ? "show" : "hide"](n, r)
      })
    }, t.fn.fadeTo = function (t, e, r) {
      return n(this, t, e, null, r)
    }, t.fn.fadeIn = function (t, e) {
      var n = this.css("opacity");
      return n > 0 ? this.css("opacity", 0) : n = 1, o.call(this).fadeTo(t, n, e)
    }, t.fn.fadeOut = function (t, e) {
      return r(this, t, null, e)
    }, t.fn.fadeToggle = function (e, n) {
      return this.each(function () {
        var r = t(this);
        r[0 == r.css("opacity") || "none" == r.css("display") ? "fadeIn" : "fadeOut"](e, n)
      })
    }
  }(Zepto);
  
});