var RequestHooks = (function (t, n, r) {
    "use strict";
    r = r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
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
    ***************************************************************************** */
    var e = function () {
        return (e =
            Object.assign ||
            function (t) {
                for (var n, r = 1, e = arguments.length; r < e; r++)
                    for (var a in (n = arguments[r]))
                        Object.prototype.hasOwnProperty.call(n, a) &&
                            (t[a] = n[a]);
                return t;
            }).apply(this, arguments);
    };
    function a(t, n, r, e) {
        return new (r || (r = Promise))(function (a, o) {
            function i(t) {
                try {
                    c(e.next(t));
                } catch (t) {
                    o(t);
                }
            }
            function u(t) {
                try {
                    c(e.throw(t));
                } catch (t) {
                    o(t);
                }
            }
            function c(t) {
                var n;
                t.done
                    ? a(t.value)
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
    function o(t, n) {
        var r,
            e,
            a,
            o,
            i = {
                label: 0,
                sent: function () {
                    if (1 & a[0]) throw a[1];
                    return a[1];
                },
                trys: [],
                ops: [],
            };
        return (
            (o = { next: u(0), throw: u(1), return: u(2) }),
            "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                    return this;
                }),
            o
        );
        function u(o) {
            return function (u) {
                return (function (o) {
                    if (r)
                        throw new TypeError("Generator is already executing.");
                    for (; i; )
                        try {
                            if (
                                ((r = 1),
                                e &&
                                    (a =
                                        2 & o[0]
                                            ? e.return
                                            : o[0]
                                            ? e.throw ||
                                              ((a = e.return) && a.call(e), 0)
                                            : e.next) &&
                                    !(a = a.call(e, o[1])).done)
                            )
                                return a;
                            switch (
                                ((e = 0), a && (o = [2 & o[0], a.value]), o[0])
                            ) {
                                case 0:
                                case 1:
                                    a = o;
                                    break;
                                case 4:
                                    return i.label++, { value: o[1], done: !1 };
                                case 5:
                                    i.label++, (e = o[1]), (o = [0]);
                                    continue;
                                case 7:
                                    (o = i.ops.pop()), i.trys.pop();
                                    continue;
                                default:
                                    if (
                                        !((a = i.trys),
                                        (a = a.length > 0 && a[a.length - 1]) ||
                                            (6 !== o[0] && 2 !== o[0]))
                                    ) {
                                        i = 0;
                                        continue;
                                    }
                                    if (
                                        3 === o[0] &&
                                        (!a || (o[1] > a[0] && o[1] < a[3]))
                                    ) {
                                        i.label = o[1];
                                        break;
                                    }
                                    if (6 === o[0] && i.label < a[1]) {
                                        (i.label = a[1]), (a = o);
                                        break;
                                    }
                                    if (a && i.label < a[2]) {
                                        (i.label = a[2]), i.ops.push(o);
                                        break;
                                    }
                                    a[2] && i.ops.pop(), i.trys.pop();
                                    continue;
                            }
                            o = n.call(t, i);
                        } catch (t) {
                            (o = [6, t]), (e = 0);
                        } finally {
                            r = a = 0;
                        }
                    if (5 & o[0]) throw o[1];
                    return { value: o[0] ? o[1] : void 0, done: !0 };
                })([o, u]);
            };
        }
    }
    function i(t, n) {
        var r = "function" == typeof Symbol && t[Symbol.iterator];
        if (!r) return t;
        var e,
            a,
            o = r.call(t),
            i = [];
        try {
            for (; (void 0 === n || n-- > 0) && !(e = o.next()).done; )
                i.push(e.value);
        } catch (t) {
            a = { error: t };
        } finally {
            try {
                e && !e.done && (r = o.return) && r.call(o);
            } finally {
                if (a) throw a.error;
            }
        }
        return i;
    }
    function u() {
        for (var t = [], n = 0; n < arguments.length; n++)
            t = t.concat(i(arguments[n]));
        return t;
    }
    var c =
            "undefined" != typeof globalThis
                ? globalThis
                : "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {},
        s = /^\s+|\s+$/g,
        f = /^[-+]0x[0-9a-f]+$/i,
        l = /^0b[01]+$/i,
        y = /^0o[0-7]+$/i,
        p = parseInt,
        d = "object" == typeof self && self && self.Object === Object && self,
        h =
            ("object" == typeof c && c && c.Object === Object && c) ||
            d ||
            Function("return this")(),
        v = Object.prototype.toString,
        b = Math.max,
        g = Math.min,
        m = function () {
            return h.Date.now();
        };
    function w(t) {
        var n = typeof t;
        return !!t && ("object" == n || "function" == n);
    }
    function j(t) {
        if ("number" == typeof t) return t;
        if (
            (function (t) {
                return (
                    "symbol" == typeof t ||
                    ((function (t) {
                        return !!t && "object" == typeof t;
                    })(t) &&
                        "[object Symbol]" == v.call(t))
                );
            })(t)
        )
            return NaN;
        if (w(t)) {
            var n = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = w(n) ? n + "" : n;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(s, "");
        var r = l.test(t);
        return r || y.test(t) ? p(t.slice(2), r ? 2 : 8) : f.test(t) ? NaN : +t;
    }
    var O = function (t, n, r) {
            var e,
                a,
                o,
                i,
                u,
                c,
                s = 0,
                f = !1,
                l = !1,
                y = !0;
            if ("function" != typeof t)
                throw new TypeError("Expected a function");
            function p(n) {
                var r = e,
                    o = a;
                return (e = a = void 0), (s = n), (i = t.apply(o, r));
            }
            function d(t) {
                return (s = t), (u = setTimeout(v, n)), f ? p(t) : i;
            }
            function h(t) {
                var r = t - c;
                return void 0 === c || r >= n || r < 0 || (l && t - s >= o);
            }
            function v() {
                var t = m();
                if (h(t)) return O(t);
                u = setTimeout(
                    v,
                    (function (t) {
                        var r = n - (t - c);
                        return l ? g(r, o - (t - s)) : r;
                    })(t)
                );
            }
            function O(t) {
                return (u = void 0), y && e ? p(t) : ((e = a = void 0), i);
            }
            function x() {
                var t = m(),
                    r = h(t);
                if (((e = arguments), (a = this), (c = t), r)) {
                    if (void 0 === u) return d(c);
                    if (l) return (u = setTimeout(v, n)), p(c);
                }
                return void 0 === u && (u = setTimeout(v, n)), i;
            }
            return (
                (n = j(n) || 0),
                w(r) &&
                    ((f = !!r.leading),
                    (o = (l = "maxWait" in r) ? b(j(r.maxWait) || 0, n) : o),
                    (y = "trailing" in r ? !!r.trailing : y)),
                (x.cancel = function () {
                    void 0 !== u && clearTimeout(u),
                        (s = 0),
                        (e = c = a = u = void 0);
                }),
                (x.flush = function () {
                    return void 0 === u ? i : O(m());
                }),
                x
            );
        },
        x = /^\s+|\s+$/g,
        T = /^[-+]0x[0-9a-f]+$/i,
        E = /^0b[01]+$/i,
        k = /^0o[0-7]+$/i,
        S = parseInt,
        A = "object" == typeof self && self && self.Object === Object && self,
        K =
            ("object" == typeof c && c && c.Object === Object && c) ||
            A ||
            Function("return this")(),
        N = Object.prototype.toString,
        P = Math.max,
        $ = Math.min,
        D = function () {
            return K.Date.now();
        };
    function F(t, n, r) {
        var e,
            a,
            o,
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
                o = a;
            return (e = a = void 0), (s = n), (i = t.apply(o, r));
        }
        function d(t) {
            return (s = t), (u = setTimeout(v, n)), f ? p(t) : i;
        }
        function h(t) {
            var r = t - c;
            return void 0 === c || r >= n || r < 0 || (l && t - s >= o);
        }
        function v() {
            var t = D();
            if (h(t)) return b(t);
            u = setTimeout(
                v,
                (function (t) {
                    var r = n - (t - c);
                    return l ? $(r, o - (t - s)) : r;
                })(t)
            );
        }
        function b(t) {
            return (u = void 0), y && e ? p(t) : ((e = a = void 0), i);
        }
        function g() {
            var t = D(),
                r = h(t);
            if (((e = arguments), (a = this), (c = t), r)) {
                if (void 0 === u) return d(c);
                if (l) return (u = setTimeout(v, n)), p(c);
            }
            return void 0 === u && (u = setTimeout(v, n)), i;
        }
        return (
            (n = W(n) || 0),
            G(r) &&
                ((f = !!r.leading),
                (o = (l = "maxWait" in r) ? P(W(r.maxWait) || 0, n) : o),
                (y = "trailing" in r ? !!r.trailing : y)),
            (g.cancel = function () {
                void 0 !== u && clearTimeout(u),
                    (s = 0),
                    (e = c = a = u = void 0);
            }),
            (g.flush = function () {
                return void 0 === u ? i : b(D());
            }),
            g
        );
    }
    function G(t) {
        var n = typeof t;
        return !!t && ("object" == n || "function" == n);
    }
    function W(t) {
        if ("number" == typeof t) return t;
        if (
            (function (t) {
                return (
                    "symbol" == typeof t ||
                    ((function (t) {
                        return !!t && "object" == typeof t;
                    })(t) &&
                        "[object Symbol]" == N.call(t))
                );
            })(t)
        )
            return NaN;
        if (G(t)) {
            var n = "function" == typeof t.valueOf ? t.valueOf() : t;
            t = G(n) ? n + "" : n;
        }
        if ("string" != typeof t) return 0 === t ? t : +t;
        t = t.replace(x, "");
        var r = E.test(t);
        return r || k.test(t) ? S(t.slice(2), r ? 2 : 8) : T.test(t) ? NaN : +t;
    }
    var M,
        R,
        q,
        I = function (t, n, r) {
            var e = !0,
                a = !0;
            if ("function" != typeof t)
                throw new TypeError("Expected a function");
            return (
                G(r) &&
                    ((e = "leading" in r ? !!r.leading : e),
                    (a = "trailing" in r ? !!r.trailing : a)),
                F(t, n, { leading: e, maxWait: n, trailing: a })
            );
        };
    function C() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
    }
    function H(t) {
        return Object.prototype.toString.call(t).slice(8, -1);
    }
    function L(t) {
        return Array.isArray(t) ? t : [t];
    }
    function U(t) {
        return Array.isArray(t) && 1 === t.length ? t[0] : t;
    }
    function V(t, n) {
        return t.debounce > 0
            ? O(n, t.debounce)
            : t.throttle > 0
            ? I(n, t.throttle)
            : n;
    }
    function z(t, n, r) {
        return t.map(function (t) {
            var e,
                a = {};
            if (t.type === q.string)
                "object" == typeof r && null !== r && (a = r),
                    (t.args[0].params = Object.assign({}, n.params, a));
            else if (t.type === q.functional)
                (t.args = []), (e = t.args).push.apply(e, u(L(r), L(n.params)));
            else if (t.type === q.axios) {
                "object" == typeof r && null !== r && (a = r);
                var o = t.args[0].method
                    ? t.args[0].method.toLocaleUpperCase()
                    : "GET";
                "GET" === o
                    ? ((t.args[0].params = Object.assign(
                          {},
                          n.params,
                          t.args[0].params ? t.args[0].params : {},
                          a
                      )),
                      (t.args[0].method = "GET"))
                    : "POST" === o &&
                      (t.args[0].data = Object.assign(
                          {},
                          n.params,
                          t.args[0].data ? t.args[0].data : {},
                          a
                      ));
            }
            return t;
        });
    }
    function B(t, n) {
        return (
            void 0 === n && (n = []),
            a(this, void 0, void 0, function () {
                var r, e, a, i, c, s, f;
                return o(this, function (o) {
                    switch (o.label) {
                        case 0:
                            if (
                                ((r = { data: null, error: null }),
                                "AsyncFunction" !== H(t))
                            )
                                return [3, 5];
                            o.label = 1;
                        case 1:
                            return (
                                o.trys.push([1, 3, , 4]),
                                (e = r),
                                [4, t.apply(void 0, u(n))]
                            );
                        case 2:
                            return (e.data = o.sent()), [3, 4];
                        case 3:
                            return (a = o.sent()), (r.error = a), [3, 4];
                        case 4:
                            return [3, 10];
                        case 5:
                            return (
                                o.trys.push([5, 9, , 10]),
                                (i = t.apply(void 0, u(n))),
                                (c = r),
                                (function (t) {
                                    return (
                                        "Promise" === H(t) ||
                                        ("Function" === H(t) &&
                                            "Function" === H(t.then) &&
                                            "Function" === H(t.catch))
                                    );
                                })(i)
                                    ? [4, i]
                                    : [3, 7]
                            );
                        case 6:
                            return (s = o.sent()), [3, 8];
                        case 7:
                            (s = i), (o.label = 8);
                        case 8:
                            return (c.data = s), [3, 10];
                        case 9:
                            return (f = o.sent()), (r.error = f), [3, 10];
                        case 10:
                            return [2, r];
                    }
                });
            })
        );
    }
    function J(t) {
        return new Promise(function (n) {
            !(function (t, n, r) {
                if (0 === t.length) return r(null, t);
                var e = new Array(t.length),
                    a = 0,
                    o = !1;
                t.forEach(function (i, u) {
                    n(i, function (n, i) {
                        if (!o)
                            return n
                                ? ((o = !0), r(n, null))
                                : ((e[u] = i),
                                  (a += 1) === t.length ? r(null, e) : void 0);
                    });
                });
            })(
                t,
                function (t, n) {
                    B(t.fn, t.args).then(function (t) {
                        n(t.error, t.data);
                    });
                },
                function (t, r) {
                    n({ data: r, error: t });
                }
            );
        });
    }
    function Q(t) {
        return a(this, void 0, void 0, function () {
            var n, r, e, a, i, u, c;
            return o(this, function (o) {
                switch (o.label) {
                    case 0:
                        (n = { data: null, error: null }),
                            (r = t.slice()),
                            (e = r.shift()),
                            (a = !1),
                            (o.label = 1);
                    case 1:
                        return !e || a ? [3, 3] : [4, B(e.fn, e.args)];
                    case 2:
                        return (
                            (i = o.sent()),
                            (u = i.data),
                            (c = i.error) &&
                                ((a = !0), (n.error = c), (n.data = null)),
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
    function X(t, n) {
        return (
            void 0 === n && (n = R.async),
            a(this, void 0, void 0, function () {
                var r;
                return o(this, function (e) {
                    switch (e.label) {
                        case 0:
                            return (
                                (r = { data: null, error: null }),
                                n !== R.async ? [3, 2] : [4, J(t)]
                            );
                        case 1:
                            return (r = e.sent()), [3, 4];
                        case 2:
                            return [4, Q(t)];
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
        (t.normal = "normal"),
            (t.debounce = "debounce"),
            (t.throttle = "throttle");
    })(M || (M = {})),
        (function (t) {
            (t.async = "async"), (t.asynchronous = "asynchronous");
        })(R || (R = {})),
        (function (t) {
            (t.string = "string"),
                (t.axios = "axios"),
                (t.functional = "functional");
        })(q || (q = {}));
    var Y = Object.create(null);
    return (
        (t.useRequest = function (t, i) {
            var c = this;
            void 0 === i && (i = {});
            var s,
                f,
                l = (function (t) {
                    return (Array.isArray(t) ? u(t) : [t]).map(function (t) {
                        return "string" == typeof t
                            ? {
                                  fn: r,
                                  args: [{ url: t, method: "GET" }],
                                  ctx: null,
                                  type: q.string,
                              }
                            : "function" == typeof t
                            ? { fn: t, args: [], ctx: null, type: q.functional }
                            : { fn: r, args: [t], ctx: null, type: q.axios };
                    });
                })(t),
                y =
                    ((f = [{ fn: U, ctx: null, args: [] }]),
                    "function" == typeof (s = i).format &&
                        f.push({ fn: s.format, args: [], ctx: null }),
                    {
                        manual: s.manual || !1,
                        onSuccess: s.onSuccess || C,
                        onError: s.onError || C,
                        loading: s.loading || !1,
                        data: s.data || null,
                        params: s.params || [],
                        throttle: s.throttle || 0,
                        debounce: s.debounce || 0,
                        format: f,
                        async: "boolean" != typeof s.async || s.async,
                        cacheKey: s.cacheKey || "",
                        key: "function" == typeof s.key ? s.key : null,
                        refreshDeps: Array.isArray(s.refreshDeps)
                            ? s.refreshDeps
                            : null,
                    }),
                p = n.reactive({
                    loading: y.loading,
                    data: y.data,
                    error: null,
                    fetches: {},
                }),
                d = function (t, n) {
                    return a(c, void 0, void 0, function () {
                        return o(this, function (r) {
                            return (
                                y.key
                                    ? n &&
                                      (p.fetches[n] = Object.assign(
                                          p.fetches[n] || {
                                              loading: !1,
                                              data: null,
                                              error: null,
                                          },
                                          { loading: t }
                                      ))
                                    : (p.loading = t),
                                [2]
                            );
                        });
                    });
                },
                h = function (t) {
                    return a(c, void 0, void 0, function () {
                        var n, r;
                        return o(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return y.key ? [4, B(y.key, L(t))] : [3, 2];
                                case 1:
                                    if (
                                        ((n = e.sent()),
                                        (r = n.data),
                                        null === n.error &&
                                            "string" == typeof r &&
                                            r)
                                    )
                                        return [2, r];
                                    throw Error(
                                        "key function return no a string"
                                    );
                                case 2:
                                    return [2, ""];
                            }
                        });
                    });
                },
                v = function (t, n) {
                    return a(c, void 0, void 0, function () {
                        var r;
                        return o(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return (
                                        (y.format[0].args = [t.data]),
                                        [4, X(y.format, R.asynchronous)]
                                    );
                                case 1:
                                    return (
                                        (r = e.sent()),
                                        y.key
                                            ? n &&
                                              (p.fetches[n] = Object.assign(
                                                  p.fetches[n] || {
                                                      loading: !1,
                                                      data: null,
                                                      error: null,
                                                  },
                                                  {
                                                      data: r.data,
                                                      error: t.error,
                                                  }
                                              ))
                                            : ((p.data = r.data),
                                              (p.error = t.error),
                                              y.cacheKey &&
                                                  (Y[y.cacheKey] = p.data)),
                                        t.error
                                            ? y.onError(p.error)
                                            : y.onSuccess(p.data),
                                        [4, d(!1, n)]
                                    );
                                case 2:
                                    return e.sent(), [2, r.data];
                            }
                        });
                    });
                };
            y.cacheKey &&
                Object.prototype.hasOwnProperty.call(Y, y.cacheKey) &&
                (p.data = Y[y.cacheKey]);
            var b = function () {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                    return a(c, void 0, void 0, function () {
                        var n, r;
                        return o(this, function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, h(t)];
                                case 1:
                                    return (n = e.sent()), [4, d(!0, n)];
                                case 2:
                                    return (
                                        e.sent(),
                                        y.cacheKey &&
                                            Object.prototype.hasOwnProperty.call(
                                                Y,
                                                y.cacheKey
                                            ) &&
                                            (p.data = Y[y.cacheKey]),
                                        [
                                            4,
                                            X(
                                                z(l, y, t),
                                                y.async
                                                    ? R.async
                                                    : R.asynchronous
                                            ),
                                        ]
                                    );
                                case 3:
                                    return (r = e.sent()), [4, v(r, n)];
                                case 4:
                                    return [2, e.sent()];
                            }
                        });
                    });
                },
                g = {};
            return (
                !1 === y.manual
                    ? b(y.params)
                    : Object.assign(g, {
                          run: V(y, b),
                          cancel: function () {
                              return a(c, void 0, void 0, function () {
                                  return o(this, function (t) {
                                      return [2];
                                  });
                              });
                          },
                      }),
                y.refreshDeps &&
                    !1 === y.manual &&
                    n.watch(y.refreshDeps, function () {
                        for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                        b();
                    }),
                e(e({}, n.toRefs(p)), g)
            );
        }),
        t
    );
})({}, Vue, axios);
