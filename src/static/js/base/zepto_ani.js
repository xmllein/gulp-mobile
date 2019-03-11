define(['Zepto'], function (Zepto, factory) {

    return ! function (t, e) {
      function n(t) {
        return t.replace(/([A-Z])/g, "-$1").toLowerCase()
      }

      function r(t) {
        return i ? i + t : t.toLowerCase()
      }

      var i, o, a, s, u, c, l, f, h, p, d = "",
        m = {
          Webkit: "webkit",
          Moz: "",
          O: "o"
        },
        g = document.createElement("div"),
        v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        y = {};
      g.style.transform === e && t.each(m, function (t, n) {
        return g.style[t + "TransitionProperty"] !== e ? (d = "-" + t.toLowerCase() + "-", i = n, !1) : e
      }), o = d + "transform", y[a = d + "transition-property"] = y[s = d + "transition-duration"] = y[c = d + "transition-delay"] = y[u = d + "transition-timing-function"] = y[l = d + "animation-name"] = y[f = d + "animation-duration"] = y[p = d + "animation-delay"] = y[h = d + "animation-timing-function"] = "", t.fx = {
        off: i === e && g.style.transitionProperty === e,
        speeds: {
          _default: 400,
          fast: 200,
          slow: 600
        },
        cssPrefix: d,
        transitionEnd: r("TransitionEnd"),
        animationEnd: r("AnimationEnd")
      }, t.fn.animate = function (n, r, i, o, a) {
        return t.isFunction(r) && (o = r, i = e, r = e), t.isFunction(i) && (o = i, i = e), t.isPlainObject(r) && (i = r.easing, o = r.complete, a = r.delay, r = r.duration), r && (r = ("number" == typeof r ? r : t.fx.speeds[r] || t.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(n, r, i, o, a)
      }, t.fn.anim = function (r, i, d, m, g) {
        var x, b, E, T = {},
          j = "",
          w = this,
          C = t.fx.transitionEnd,
          S = !1;
        if (i === e && (i = t.fx.speeds._default / 1e3), g === e && (g = 0), t.fx.off && (i = 0), "string" == typeof r) T[l] = r, T[f] = i + "s", T[p] = g + "s", T[h] = d || "linear", C = t.fx.animationEnd;
        else {
          b = [];
          for (x in r) v.test(x) ? j += x + "(" + r[x] + ") " : (T[x] = r[x], b.push(n(x)));
          j && (T[o] = j, b.push(o)), i > 0 && "object" == typeof r && (T[a] = b.join(", "), T[s] = i + "s", T[c] = g + "s", T[u] = d || "linear")
        }
        return E = function (n) {
          if (e !== n) {
            if (n.target !== n.currentTarget) return;
            t(n.target).unbind(C, E)
          } else t(this).unbind(C, E);
          S = !0, t(this).css(y), m && m.call(this)
        }, i > 0 && (this.bind(C, E), setTimeout(function () {
          S || E.call(w)
        }, 1e3 * (i + g) + 25)), this.size() && this.get(0).clientLeft, this.css(T), i > 0 || setTimeout(function () {
          w.each(function () {
            E.call(this)
          })
        }, 0), this
      }, g = null
    }(Zepto);
  
});