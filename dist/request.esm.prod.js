import { reactive as t, watch as n, toRefs as r } from "vue";
import e from "axios";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var o = function () {
    return (o =
        Object.assign ||
        function (t) {
            for (var n, r = 1, e = arguments.length; r < e; r++)
                for (var o in (n = arguments[r]))
                    Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            return t;
        }).apply(this, arguments);
};
function a(t, n, r, e) {
    return new (r || (r = Promise))(function (o, a) {
        function i(t) {
            try {
                c(e.next(t));
            } catch (t) {
                a(t);
            }
        }
        function u(t) {
            try {
                c(e.throw(t));
            } catch (t) {
                a(t);
            }
        }
        function c(t) {
            var n;
            t.done
                ? o(t.value)
                : ((n = t.value),
                  n instanceof r
                      ? n
                      : new r(function (t) {
                            t(n);
                        })).then(i, u);
        }
        c((e = e.apply(t, n || [])).next());
    });
}
function i(t, n) {
    var r,
        e,
        o,
        a,
        i = {
            label: 0,
            sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
            },
            trys: [],
            ops: [],
        };
    return (
        (a = { next: u(0), throw: u(1), return: u(2) }),
        "function" == typeof Symbol &&
            (a[Symbol.iterator] = function () {
                return this;
            }),
        a
    );
    function u(a) {
        return function (u) {
            return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; i; )
                    try {
                        if (
                            ((r = 1),
                            e &&
                                (o =
                                    2 & a[0]
                                        ? e.return
                                        : a[0]
                                        ? e.throw ||
                                          ((o = e.return) && o.call(e), 0)
                                        : e.next) &&
                                !(o = o.call(e, a[1])).done)
                        )
                            return o;
                        switch (
                            ((e = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                            case 0:
                            case 1:
                                o = a;
                                break;
                            case 4:
                                return i.label++, { value: a[1], done: !1 };
                            case 5:
                                i.label++, (e = a[1]), (a = [0]);
                                continue;
                            case 7:
                                (a = i.ops.pop()), i.trys.pop();
                                continue;
                            default:
                                if (
                                    !((o = i.trys),
                                    (o = o.length > 0 && o[o.length - 1]) ||
                                        (6 !== a[0] && 2 !== a[0]))
                                ) {
                                    i = 0;
                                    continue;
                                }
                                if (
                                    3 === a[0] &&
                                    (!o || (a[1] > o[0] && a[1] < o[3]))
                                ) {
                                    i.label = a[1];
                                    break;
                                }
                                if (6 === a[0] && i.label < o[1]) {
                                    (i.label = o[1]), (o = a);
                                    break;
                                }
                                if (o && i.label < o[2]) {
                                    (i.label = o[2]), i.ops.push(a);
                                    break;
                                }
                                o[2] && i.ops.pop(), i.trys.pop();
                                continue;
                        }
                        a = n.call(t, i);
                    } catch (t) {
                        (a = [6, t]), (e = 0);
                    } finally {
                        r = o = 0;
                    }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
            })([a, u]);
        };
    }
}
function u(t, n) {
    var r = "function" == typeof Symbol && t[Symbol.iterator];
    if (!r) return t;
    var e,
        o,
        a = r.call(t),
        i = [];
    try {
        for (; (void 0 === n || n-- > 0) && !(e = a.next()).done; )
            i.push(e.value);
    } catch (t) {
        o = { error: t };
    } finally {
        try {
            e && !e.done && (r = a.return) && r.call(a);
        } finally {
            if (o) throw o.error;
        }
    }
    return i;
}
function c() {
    for (var t = [], n = 0; n < arguments.length; n++)
        t = t.concat(u(arguments[n]));
    return t;
}
var s =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
    f = /^\s+|\s+$/g,
    l = /^[-+]0x[0-9a-f]+$/i,
    y = /^0b[01]+$/i,
    p = /^0o[0-7]+$/i,
    d = parseInt,
    h = "object" == typeof self && self && self.Object === Object && self,
    v =
        ("object" == typeof s && s && s.Object === Object && s) ||
        h ||
        Function("return this")(),
    b = Object.prototype.toString,
    g = Math.max,
    m = Math.min,
    w = function () {
        return v.Date.now();
    };
function j(t) {
    var n = typeof t;
    return !!t && ("object" == n || "function" == n);
}
function O(t) {
    if ("number" == typeof t) return t;
    if (
        (function (t) {
            return (
                "symbol" == typeof t ||
                ((function (t) {
                    return !!t && "object" == typeof t;
                })(t) &&
                    "[object Symbol]" == b.call(t))
            );
        })(t)
    )
        return NaN;
    if (j(t)) {
        var n = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = j(n) ? n + "" : n;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace(f, "");
    var r = y.test(t);
    return r || p.test(t) ? d(t.slice(2), r ? 2 : 8) : l.test(t) ? NaN : +t;
}
var x = function (t, n, r) {
        var e,
            o,
            a,
            i,
            u,
            c,
            s = 0,
            f = !1,
            l = !1,
            y = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        function p(n) {
            var r = e,
                a = o;
            return (e = o = void 0), (s = n), (i = t.apply(a, r));
        }
        function d(t) {
            return (s = t), (u = setTimeout(v, n)), f ? p(t) : i;
        }
        function h(t) {
            var r = t - c;
            return void 0 === c || r >= n || r < 0 || (l && t - s >= a);
        }
        function v() {
            var t = w();
            if (h(t)) return b(t);
            u = setTimeout(
                v,
                (function (t) {
                    var r = n - (t - c);
                    return l ? m(r, a - (t - s)) : r;
                })(t)
            );
        }
        function b(t) {
            return (u = void 0), y && e ? p(t) : ((e = o = void 0), i);
        }
        function x() {
            var t = w(),
                r = h(t);
            if (((e = arguments), (o = this), (c = t), r)) {
                if (void 0 === u) return d(c);
                if (l) return (u = setTimeout(v, n)), p(c);
            }
            return void 0 === u && (u = setTimeout(v, n)), i;
        }
        return (
            (n = O(n) || 0),
            j(r) &&
                ((f = !!r.leading),
                (a = (l = "maxWait" in r) ? g(O(r.maxWait) || 0, n) : a),
                (y = "trailing" in r ? !!r.trailing : y)),
            (x.cancel = function () {
                void 0 !== u && clearTimeout(u),
                    (s = 0),
                    (e = c = o = u = void 0);
            }),
            (x.flush = function () {
                return void 0 === u ? i : b(w());
            }),
            x
        );
    },
    T = /^\s+|\s+$/g,
    E = /^[-+]0x[0-9a-f]+$/i,
    S = /^0b[01]+$/i,
    k = /^0o[0-7]+$/i,
    A = parseInt,
    K = "object" == typeof self && self && self.Object === Object && self,
    N =
        ("object" == typeof s && s && s.Object === Object && s) ||
        K ||
        Function("return this")(),
    $ = Object.prototype.toString,
    D = Math.max,
    P = Math.min,
    F = function () {
        return N.Date.now();
    };
function G(t, n, r) {
    var e,
        o,
        a,
        i,
        u,
        c,
        s = 0,
        f = !1,
        l = !1,
        y = !0;
    if ("function" != typeof t) throw new TypeError("Expected a function");
    function p(n) {
        var r = e,
            a = o;
        return (e = o = void 0), (s = n), (i = t.apply(a, r));
    }
    function d(t) {
        return (s = t), (u = setTimeout(v, n)), f ? p(t) : i;
    }
    function h(t) {
        var r = t - c;
        return void 0 === c || r >= n || r < 0 || (l && t - s >= a);
    }
    function v() {
        var t = F();
        if (h(t)) return b(t);
        u = setTimeout(
            v,
            (function (t) {
                var r = n - (t - c);
                return l ? P(r, a - (t - s)) : r;
            })(t)
        );
    }
    function b(t) {
        return (u = void 0), y && e ? p(t) : ((e = o = void 0), i);
    }
    function g() {
        var t = F(),
            r = h(t);
        if (((e = arguments), (o = this), (c = t), r)) {
            if (void 0 === u) return d(c);
            if (l) return (u = setTimeout(v, n)), p(c);
        }
        return void 0 === u && (u = setTimeout(v, n)), i;
    }
    return (
        (n = M(n) || 0),
        W(r) &&
            ((f = !!r.leading),
            (a = (l = "maxWait" in r) ? D(M(r.maxWait) || 0, n) : a),
            (y = "trailing" in r ? !!r.trailing : y)),
        (g.cancel = function () {
            void 0 !== u && clearTimeout(u), (s = 0), (e = c = o = u = void 0);
        }),
        (g.flush = function () {
            return void 0 === u ? i : b(F());
        }),
        g
    );
}
function W(t) {
    var n = typeof t;
    return !!t && ("object" == n || "function" == n);
}
function M(t) {
    if ("number" == typeof t) return t;
    if (
        (function (t) {
            return (
                "symbol" == typeof t ||
                ((function (t) {
                    return !!t && "object" == typeof t;
                })(t) &&
                    "[object Symbol]" == $.call(t))
            );
        })(t)
    )
        return NaN;
    if (W(t)) {
        var n = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = W(n) ? n + "" : n;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace(T, "");
    var r = S.test(t);
    return r || k.test(t) ? A(t.slice(2), r ? 2 : 8) : E.test(t) ? NaN : +t;
}
var I,
    C,
    L,
    U = function (t, n, r) {
        var e = !0,
            o = !0;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return (
            W(r) &&
                ((e = "leading" in r ? !!r.leading : e),
                (o = "trailing" in r ? !!r.trailing : o)),
            G(t, n, { leading: e, maxWait: n, trailing: o })
        );
    };
function q() {
    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
}
function z(t) {
    return Object.prototype.toString.call(t).slice(8, -1);
}
function B(t) {
    return Array.isArray(t) ? t : [t];
}
function H(t) {
    return Array.isArray(t) && 1 === t.length ? t[0] : t;
}
function J(t, n) {
    return t.debounce > 0
        ? x(n, t.debounce)
        : t.throttle > 0
        ? U(n, t.throttle)
        : n;
}
function Q(t, n, r) {
    return t.map(function (t) {
        var e,
            o = {};
        if (t.type === L.string)
            "object" == typeof r && null !== r && (o = r),
                (t.args[0].params = Object.assign({}, n.params, o));
        else if (t.type === L.functional)
            (t.args = []), (e = t.args).push.apply(e, c(B(r), B(n.params)));
        else if (t.type === L.axios) {
            "object" == typeof r && null !== r && (o = r);
            var a = t.args[0].method
                ? t.args[0].method.toLocaleUpperCase()
                : "GET";
            "GET" === a
                ? ((t.args[0].params = Object.assign(
                      {},
                      n.params,
                      t.args[0].params ? t.args[0].params : {},
                      o
                  )),
                  (t.args[0].method = "GET"))
                : "POST" === a &&
                  (t.args[0].data = Object.assign(
                      {},
                      n.params,
                      t.args[0].data ? t.args[0].data : {},
                      o
                  ));
        }
        return t;
    });
}
function R(t, n) {
    return (
        void 0 === n && (n = []),
        a(this, void 0, void 0, function () {
            var r, e, o, a, u, s, f;
            return i(this, function (i) {
                switch (i.label) {
                    case 0:
                        if (
                            ((r = { data: null, error: null }),
                            "AsyncFunction" !== z(t))
                        )
                            return [3, 5];
                        i.label = 1;
                    case 1:
                        return (
                            i.trys.push([1, 3, , 4]),
                            (e = r),
                            [4, t.apply(void 0, c(n))]
                        );
                    case 2:
                        return (e.data = i.sent()), [3, 4];
                    case 3:
                        return (o = i.sent()), (r.error = o), [3, 4];
                    case 4:
                        return [3, 10];
                    case 5:
                        return (
                            i.trys.push([5, 9, , 10]),
                            (a = t.apply(void 0, c(n))),
                            (u = r),
                            (function (t) {
                                return (
                                    "Promise" === z(t) ||
                                    ("Function" === z(t) &&
                                        "Function" === z(t.then) &&
                                        "Function" === z(t.catch))
                                );
                            })(a)
                                ? [4, a]
                                : [3, 7]
                        );
                    case 6:
                        return (s = i.sent()), [3, 8];
                    case 7:
                        (s = a), (i.label = 8);
                    case 8:
                        return (u.data = s), [3, 10];
                    case 9:
                        return (f = i.sent()), (r.error = f), [3, 10];
                    case 10:
                        return [2, r];
                }
            });
        })
    );
}
function V(t) {
    return new Promise(function (n) {
        !(function (t, n, r) {
            if (0 === t.length) return r(null, t);
            var e = new Array(t.length),
                o = 0,
                a = !1;
            t.forEach(function (i, u) {
                n(i, function (n, i) {
                    if (!a)
                        return n
                            ? ((a = !0), r(n, null))
                            : ((e[u] = i),
                              (o += 1) === t.length ? r(null, e) : void 0);
                });
            });
        })(
            t,
            function (t, n) {
                R(t.fn, t.args).then(function (t) {
                    n(t.error, t.data);
                });
            },
            function (t, r) {
                n({ data: r, error: t });
            }
        );
    });
}
function X(t) {
    return a(this, void 0, void 0, function () {
        var n, r, e, o, a, u, c;
        return i(this, function (i) {
            switch (i.label) {
                case 0:
                    (n = { data: null, error: null }),
                        (r = t.slice()),
                        (e = r.shift()),
                        (o = !1),
                        (i.label = 1);
                case 1:
                    return !e || o ? [3, 3] : [4, R(e.fn, e.args)];
                case 2:
                    return (
                        (a = i.sent()),
                        (u = a.data),
                        (c = a.error) &&
                            ((o = !0), (n.error = c), (n.data = null)),
                        (n.data = u),
                        (e = r.shift()) && (e.args = [u]),
                        [3, 1]
                    );
                case 3:
                    return [2, n];
            }
        });
    });
}
function Y(t, n) {
    return (
        void 0 === n && (n = C.async),
        a(this, void 0, void 0, function () {
            var r;
            return i(this, function (e) {
                switch (e.label) {
                    case 0:
                        return (
                            (r = { data: null, error: null }),
                            n !== C.async ? [3, 2] : [4, V(t)]
                        );
                    case 1:
                        return (r = e.sent()), [3, 4];
                    case 2:
                        return [4, X(t)];
                    case 3:
                        (r = e.sent()), (e.label = 4);
                    case 4:
                        return [2, r];
                }
            });
        })
    );
}
!(function (t) {
    (t.normal = "normal"), (t.debounce = "debounce"), (t.throttle = "throttle");
})(I || (I = {})),
    (function (t) {
        (t.async = "async"), (t.asynchronous = "asynchronous");
    })(C || (C = {})),
    (function (t) {
        (t.string = "string"),
            (t.axios = "axios"),
            (t.functional = "functional");
    })(L || (L = {}));
var Z = Object.create(null);
function _(u, s) {
    var f = this;
    void 0 === s && (s = {});
    var l,
        y,
        p = (function (t) {
            return (Array.isArray(t) ? c(t) : [t]).map(function (t) {
                return "string" == typeof t
                    ? {
                          fn: e,
                          args: [{ url: t, method: "GET" }],
                          ctx: null,
                          type: L.string,
                      }
                    : "function" == typeof t
                    ? { fn: t, args: [], ctx: null, type: L.functional }
                    : { fn: e, args: [t], ctx: null, type: L.axios };
            });
        })(u),
        d =
            ((y = [{ fn: H, ctx: null, args: [] }]),
            "function" == typeof (l = s).format &&
                y.push({ fn: l.format, args: [], ctx: null }),
            {
                manual: l.manual || !1,
                onSuccess: l.onSuccess || q,
                onError: l.onError || q,
                loading: l.loading || !1,
                data: l.data || null,
                params: l.params || [],
                throttle: l.throttle || 0,
                debounce: l.debounce || 0,
                format: y,
                async: "boolean" != typeof l.async || l.async,
                cacheKey: l.cacheKey || "",
                key: "function" == typeof l.key ? l.key : null,
                refreshDeps: Array.isArray(l.refreshDeps)
                    ? l.refreshDeps
                    : null,
            }),
        h = t({ loading: d.loading, data: d.data, error: null, fetches: {} }),
        v = function (t, n) {
            return a(f, void 0, void 0, function () {
                return i(this, function (r) {
                    return (
                        d.key
                            ? n &&
                              (h.fetches[n] = Object.assign(
                                  h.fetches[n] || {
                                      loading: !1,
                                      data: null,
                                      error: null,
                                  },
                                  { loading: t }
                              ))
                            : (h.loading = t),
                        [2]
                    );
                });
            });
        },
        b = function (t) {
            return a(f, void 0, void 0, function () {
                var n, r;
                return i(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return d.key ? [4, R(d.key, B(t))] : [3, 2];
                        case 1:
                            if (
                                ((n = e.sent()),
                                (r = n.data),
                                null === n.error && "string" == typeof r && r)
                            )
                                return [2, r];
                            throw Error("key function return no a string");
                        case 2:
                            return [2, ""];
                    }
                });
            });
        },
        g = function (t, n) {
            return a(f, void 0, void 0, function () {
                var r;
                return i(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return (
                                (d.format[0].args = [t.data]),
                                [4, Y(d.format, C.asynchronous)]
                            );
                        case 1:
                            return (
                                (r = e.sent()),
                                d.key
                                    ? n &&
                                      (h.fetches[n] = Object.assign(
                                          h.fetches[n] || {
                                              loading: !1,
                                              data: null,
                                              error: null,
                                          },
                                          { data: r.data, error: t.error }
                                      ))
                                    : ((h.data = r.data),
                                      (h.error = t.error),
                                      d.cacheKey && (Z[d.cacheKey] = h.data)),
                                t.error
                                    ? d.onError(h.error)
                                    : d.onSuccess(h.data),
                                [4, v(!1, n)]
                            );
                        case 2:
                            return e.sent(), [2, r.data];
                    }
                });
            });
        };
    d.cacheKey &&
        Object.prototype.hasOwnProperty.call(Z, d.cacheKey) &&
        (h.data = Z[d.cacheKey]);
    var m = function () {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            return a(f, void 0, void 0, function () {
                var n, r;
                return i(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return [4, b(t)];
                        case 1:
                            return (n = e.sent()), [4, v(!0, n)];
                        case 2:
                            return (
                                e.sent(),
                                d.cacheKey &&
                                    Object.prototype.hasOwnProperty.call(
                                        Z,
                                        d.cacheKey
                                    ) &&
                                    (h.data = Z[d.cacheKey]),
                                [
                                    4,
                                    Y(
                                        Q(p, d, t),
                                        d.async ? C.async : C.asynchronous
                                    ),
                                ]
                            );
                        case 3:
                            return (r = e.sent()), [4, g(r, n)];
                        case 4:
                            return [2, e.sent()];
                    }
                });
            });
        },
        w = {};
    return (
        !1 === d.manual
            ? m(d.params)
            : Object.assign(w, {
                  run: J(d, m),
                  cancel: function () {
                      return a(f, void 0, void 0, function () {
                          return i(this, function (t) {
                              return [2];
                          });
                      });
                  },
              }),
        d.refreshDeps &&
            !1 === d.manual &&
            n(d.refreshDeps, function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                m();
            }),
        o(o({}, r(h)), w)
    );
}
export { _ as useRequest };
