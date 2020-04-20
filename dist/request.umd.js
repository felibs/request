(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('axios')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'axios'], factory) :
    (global = global || self, factory(global.RequestHooks = {}, global.Vue, global.axios));
}(this, (function (exports, vue, axios) { 'use strict';

    axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max,
        nativeMin = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = function() {
      return root.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var lodash_debounce = debounce;

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT$1 = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN$1 = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag$1 = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim$1 = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary$1 = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal$1 = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt$1 = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString$1 = objectProto$1.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax$1 = Math.max,
        nativeMin$1 = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now$1 = function() {
      return root$1.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce$1(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      wait = toNumber$1(wait) || 0;
      if (isObject$1(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now$1();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now$1());
      }

      function debounced() {
        var time = now$1(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT$1);
      }
      if (isObject$1(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce$1(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject$1(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike$1(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol$1(value) {
      return typeof value == 'symbol' ||
        (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber$1(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol$1(value)) {
        return NAN$1;
      }
      if (isObject$1(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject$1(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim$1, '');
      var isBinary = reIsBinary$1.test(value);
      return (isBinary || reIsOctal$1.test(value))
        ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex$1.test(value) ? NAN$1 : +value);
    }

    var lodash_throttle = throttle;

    // import debounce from 'lodash-es/debounce'
    // noop
    function noop() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
    }
    function type(p) {
        return Object.prototype.toString.call(p).slice(8, -1);
    }
    function toArray(p) {
        if (Array.isArray(p)) {
            return p;
        }
        else {
            return [p];
        }
    }
    // 是否为promise
    function isPromise(fn) {
        return type(fn) === 'Promise' || (type(fn) === 'Function' && type(fn.then) === 'Function' && type(fn.catch) === 'Function');
    }
    // 最先执行的format函数
    function resultFormat(result) {
        if (Array.isArray(result) && result.length === 1) {
            return result[0];
        }
        else {
            return result;
        }
    }
    // 对run封装，返回真正的run
    function wrapperRun(option, fn) {
        if (option.debounce > 0) {
            return lodash_debounce(fn, option.debounce);
        }
        else if (option.throttle > 0) {
            return lodash_throttle(fn, option.throttle);
        }
        else {
            return fn;
        }
    }

    // run函数类型
    var runType;
    (function (runType) {
        runType["normal"] = "normal";
        runType["debounce"] = "debounce";
        runType["throttle"] = "throttle";
    })(runType || (runType = {}));
    var execType;
    (function (execType) {
        execType["async"] = "async";
        execType["asynchronous"] = "asynchronous";
    })(execType || (execType = {}));
    var execItemType;
    (function (execItemType) {
        execItemType["string"] = "string";
        execItemType["axios"] = "axios";
        execItemType["functional"] = "functional";
    })(execItemType || (execItemType = {}));

    function serializeMethod(method) {
        var serializeList = Array.isArray(method) ? __spread(method) : [method];
        return serializeList.map(function (item) {
            if (typeof item === 'string') {
                return {
                    fn: axios,
                    args: [{ url: item, method: 'GET' }],
                    ctx: null,
                    type: execItemType.string,
                };
            }
            else if (typeof item === 'function') {
                return {
                    fn: item,
                    args: [],
                    ctx: null,
                    type: execItemType.functional,
                };
            }
            else {
                return {
                    fn: axios,
                    args: [item],
                    ctx: null,
                    type: execItemType.axios,
                };
            }
        });
    }
    function serializeOption(option) {
        var format = [
            {
                fn: resultFormat,
                ctx: null,
                args: [],
            },
        ];
        if (typeof option.format === 'function') {
            format.push({
                fn: option.format,
                args: [],
                ctx: null,
            });
        }
        return {
            manual: option.manual || false,
            onSuccess: option.onSuccess || noop,
            onError: option.onError || noop,
            loading: option.loading || false,
            data: option.data || null,
            params: option.params || [],
            throttle: option.throttle || 0,
            debounce: option.debounce || 0,
            format: format,
            async: typeof option.async === 'boolean' ? option.async : true,
            cacheKey: option.cacheKey || '',
            key: typeof option.key === 'function' ? option.key : null,
            refreshDeps: Array.isArray(option.refreshDeps) ? option.refreshDeps : null
        };
    }
    function mergeArgs(methods, option, args) {
        return methods.map(function (item) {
            var _a;
            // api为string
            if (item.type === execItemType.string) {
                var runParams = {};
                if (typeof args === 'object' && args !== null) {
                    runParams = args;
                }
                item.args[0].params = Object.assign({}, option.params, runParams);
            }
            else if (item.type === execItemType.functional) {
                item.args = []; // 每次执行run，都需要重新合成参数
                (_a = item.args).push.apply(_a, __spread(toArray(args), toArray(option.params)));
            }
            else if (item.type === execItemType.axios) {
                var runParams = {};
                if (typeof args === 'object' && args !== null) {
                    runParams = args;
                }
                var method = item.args[0].method ? item.args[0].method.toLocaleUpperCase() : 'GET';
                // todo 多种方法参数的支持
                if (method === 'GET') {
                    item.args[0].params = Object.assign({}, option.params, item.args[0].params ? item.args[0].params : {}, runParams);
                }
                else if (method === 'POST') {
                    item.args[0].data = Object.assign({}, option.params, item.args[0].data ? item.args[0].data : {}, runParams);
                }
            }
            return item;
        });
    }

    function asyncEach(asyncs, next, callback) {
        if (asyncs.length === 0)
            return callback(undefined, asyncs);
        var transformed = new Array(asyncs.length);
        var count = 0;
        var returned = false;
        asyncs.forEach(function (item, index) {
            next(item, function (error, transformedItem) {
                if (returned)
                    return;
                if (error) {
                    returned = true;
                    return callback(error, null);
                }
                transformed[index] = transformedItem;
                count += 1;
                if (count === asyncs.length)
                    return callback(null, transformed);
            });
        });
    }
    // 执行同步或者异步函数
    function execute(fn, args, ctx) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, error_1, response, _b, _c, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = { data: null, error: null };
                        if (!(type(fn) === 'AsyncFunction')) return [3 /*break*/, 5];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        _a = result;
                        return [4 /*yield*/, fn.apply(ctx || null, args)];
                    case 2:
                        _a.data = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        result.error = error_1;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 10];
                    case 5:
                        _d.trys.push([5, 9, , 10]);
                        response = fn.apply(ctx || null, args);
                        _b = result;
                        if (!isPromise(response)) return [3 /*break*/, 7];
                        return [4 /*yield*/, response];
                    case 6:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _c = response;
                        _d.label = 8;
                    case 8:
                        _b.data = _c;
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _d.sent();
                        result.error = error_2;
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, result];
                }
            });
        });
    }
    function asyncExecuter(fnList) {
        return new Promise(function (resolve) {
            asyncEach(fnList, function next(item, callbck) {
                execute(item.fn, item.args, item.ctx)
                    .then(function (_a) {
                    var data = _a.data, error = _a.error;
                    callbck(error, data);
                })
                    .catch(function (error) {
                    callbck(error, null);
                });
            }, function result(error, data) {
                resolve({
                    data: data,
                    error: error,
                });
            });
        });
    }
    function asynchronousExecuter(fnList) {
        return __awaiter(this, void 0, void 0, function () {
            var result, fns, execItem, hasError, _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = { data: null, error: null };
                        fns = fnList.slice();
                        execItem = fns.shift();
                        hasError = false;
                        _b.label = 1;
                    case 1:
                        if (!(execItem && !hasError)) return [3 /*break*/, 3];
                        return [4 /*yield*/, execute(execItem.fn, execItem.args, execItem.ctx)];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            hasError = true;
                            result.error = error;
                            result.data = null;
                        }
                        result.data = data;
                        execItem = fns.shift();
                        if (execItem) {
                            execItem.args = [data]; // 上段的执行结果给下个函数作为参数
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    }
    function executer(fnList, type) {
        if (type === void 0) { type = execType.async; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = { data: null, error: null };
                        if (!(type === execType.async)) return [3 /*break*/, 2];
                        return [4 /*yield*/, asyncExecuter(fnList)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, asynchronousExecuter(fnList)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    }

    var cache = Object.create(null);
    function useRequest(method, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var serializedMethods = serializeMethod(method);
        var serializedOptions = serializeOption(options);
        var state = vue.reactive({
            loading: serializedOptions.loading,
            data: serializedOptions.data,
            error: null,
            fetches: {},
        });
        var setLoading = function (arg, status) { return __awaiter(_this, void 0, void 0, function () {
            var _a, data, error, fetcheState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!serializedOptions.key) return [3 /*break*/, 2];
                        return [4 /*yield*/, execute(serializedOptions.key, toArray(arg))];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error === null && typeof data === 'string' && data) {
                            fetcheState = state.fetches[data] || { loading: false, data: null, error: null };
                            state.fetches[data] = Object.assign(fetcheState, {
                                loading: status,
                            });
                        }
                        else {
                            throw Error('key function return no a string');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        state.loading = status;
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        var setResult = function (result, arg) { return __awaiter(_this, void 0, void 0, function () {
            var formatResult, _a, data, error, fetcheState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 对返回结果进行format
                        serializedOptions.format[0].args = [result.data];
                        return [4 /*yield*/, executer(serializedOptions.format, execType.asynchronous)
                            // 如果存在key，重置数据
                        ]; // 对结果进行format
                    case 1:
                        formatResult = _b.sent() // 对结果进行format
                        ;
                        if (!serializedOptions.key) return [3 /*break*/, 3];
                        return [4 /*yield*/, execute(serializedOptions.key, toArray(arg))]; // 或者key
                    case 2:
                        _a = _b.sent() // 或者key
                        , data = _a.data, error = _a.error;
                        if (error === null && typeof data === 'string' && data) { // 必须为string类型才可以作为Object的key
                            fetcheState = state.fetches[data] || { loading: false, data: null, error: null };
                            state.fetches[data] = Object.assign(fetcheState, { data: formatResult.data, error: result.error });
                        }
                        else {
                            throw Error('key function return no a string');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        state.data = formatResult.data;
                        state.error = result.error;
                        // 重置cache
                        if (serializedOptions.cacheKey) {
                            cache[serializedOptions.cacheKey] = state.data;
                        }
                        _b.label = 4;
                    case 4:
                        // 执行回掉函数
                        if (result.error) {
                            serializedOptions.onError(state.error);
                        }
                        else {
                            serializedOptions.onSuccess(state.data); // 请求的参数
                        }
                        return [4 /*yield*/, setLoading(arg, false)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, formatResult.data];
                }
            });
        }); };
        // 初始化时，需要判断是否存在cachekey，如果存在，需要覆盖当前state.data
        if (serializedOptions.cacheKey && Object.prototype.hasOwnProperty.call(cache, serializedOptions.cacheKey)) {
            state.data = cache[serializedOptions.cacheKey];
        }
        var run = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setLoading(arg, true)
                            // 需要在执行executer函数前执行初始赋值操作
                        ];
                        case 1:
                            _a.sent();
                            // 需要在执行executer函数前执行初始赋值操作
                            if (serializedOptions.cacheKey && Object.prototype.hasOwnProperty.call(cache, serializedOptions.cacheKey)) {
                                state.data = cache[serializedOptions.cacheKey];
                            }
                            result = null;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, executer(mergeArgs(serializedMethods, serializedOptions, arg), serializedOptions.async ? execType.async : execType.asynchronous)];
                        case 3:
                            result = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.log('error', error_1);
                            return [3 /*break*/, 5];
                        case 5: return [4 /*yield*/, setResult(result, arg)];
                        case 6: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        var cancel = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var config = {};
        if (serializedOptions.manual === false) {
            run(serializedOptions.params);
        }
        else {
            Object.assign(config, { run: wrapperRun(serializedOptions, run), cancel: cancel });
        }
        if (serializedOptions.refreshDeps && serializedOptions.manual === false) {
            vue.watch(serializedOptions.refreshDeps, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                run();
            });
        }
        return __assign(__assign({}, vue.toRefs(state)), config);
    }

    exports.useRequest = useRequest;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
