define(['Zepto'], function (Zepto ) {

  return ! function (t) {
    function n(n) {
      return n = t(n), !(!n.width() && !n.height()) && "none" !== n.css("display")
    }

    function e(t, n) {
      t = t.replace(/=#\]/g, '="#"]');
      var e, r, i = s.exec(t);
      if (i && i[2] in o && (e = o[i[2]], r = i[3], t = i[1], r)) {
        var u = Number(r);
        r = isNaN(u) ? r.replace(/^["']|["']$/g, "") : u
      }
      return n(t, e, r)
    }

    var r = t.zepto,
      i = r.qsa,
      u = r.matches,
      o = t.expr[":"] = {
        visible: function () {
          return n(this) ? this : void 0
        },
        hidden: function () {
          return n(this) ? void 0 : this
        },
        selected: function () {
          return this.selected ? this : void 0
        },
        checked: function () {
          return this.checked ? this : void 0
        },
        parent: function () {
          return this.parentNode
        },
        first: function (t) {
          return 0 === t ? this : void 0
        },
        last: function (t, n) {
          return t === n.length - 1 ? this : void 0
        },
        eq: function (t, n, e) {
          return t === e ? this : void 0
        },
        contains: function (n, e, r) {
          return t(this).text().indexOf(r) > -1 ? this : void 0
        },
        has: function (t, n, e) {
          return r.qsa(this, e).length ? this : void 0
        }
      },
      s = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
      c = /^\s*>/,
      a = "Zepto" + +new Date;
    r.qsa = function (n, u) {
      return e(u, function (e, o, s) {
        try {
          var h;
          !e && o ? e = "*" : c.test(e) && (h = t(n).addClass(a), e = "." + a + " " + e);
          var f = i(n, e)
        } catch (d) {
          throw console.error("error performing selector: %o", u), d
        } finally {
          h && h.removeClass(a)
        }
        return o ? r.uniq(t.map(f, function (t, n) {
          return o.call(t, n, f, s)
        })) : f
      })
    }, r.matches = function (t, n) {
      return e(n, function (n, e, r) {
        return !(n && !u(t, n) || e && e.call(t, null, r) !== t)
      })
    }
  }(Zepto);

});