(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vuex'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vuex', 'axios'], factory) :
  (global = global || self, factory(global.MediaManager = {}, global.Vuex, global.axios));
}(this, function (exports, vuex, axios$1) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */

  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  /** Built-in value references. */

  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

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
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */

  var coreJsData = _root['__core-js_shared__'];
  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }

    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  var defineProperty = function () {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();

  var _defineProperty$1 = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty$1) {
      _defineProperty$1(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }

    return accumulator;
  }

  var _arrayAggregator = arrayAggregator;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];

        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }

      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */

  var baseFor = _createBaseFor();
  var _baseFor = baseFor;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

  var _baseTimes = baseTimes;

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
    return value != null && _typeof(value) == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]';
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */

  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /** Built-in value references. */

  var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */

  var isArguments = _baseIsArguments(function () {
    return arguments;
  }()) ? _baseIsArguments : function (value) {
    return isObjectLike_1(value) && hasOwnProperty$2.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;
  var isArray_1 = isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Built-in value references. */

    var Buffer = moduleExports ? _root.Buffer : undefined;
    /* Built-in method references for those with the same name as other `lodash` methods. */

    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */

    var isBuffer = nativeIsBuffer || stubFalse_1;
    module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^(?:0|[1-9]\d*)$/;
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */

  function isIndex(value, length) {
    var type = _typeof(value);

    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */

  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */

  function baseIsTypedArray(value) {
    return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */

    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */

    var moduleExports = freeModule && freeModule.exports === freeExports;
    /** Detect free variable `process` from Node.js. */

    var freeProcess = moduleExports && _freeGlobal.process;
    /** Used to access faster Node.js helpers. */

    var nodeUtil = function () {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        } // Legacy `process.binding('util')` for Node.js < 10.


        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();

    module.exports = nodeUtil;
  });

  /* Node.js helper references. */

  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */

  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      _isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$5;
    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeKeys = _overArg(Object.keys, Object);
  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */

  var objectProto$6 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */

  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */

  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */

  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }

      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee);
      }

      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }

      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */

  var baseEach = _createBaseEach(_baseForOwn);
  var _baseEach = baseEach;

  /**
   * Aggregates elements of `collection` on `accumulator` with keys transformed
   * by `iteratee` and values set by `setter`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */

  function baseAggregator(collection, setter, iteratee, accumulator) {
    _baseEach(collection, function (value, key, collection) {
      setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
  }

  var _baseAggregator = baseAggregator;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;
  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */

  function stackClear() {
    this.__data__ = new _ListCache();
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /* Built-in method references that are verified to be native. */

  var Map = _getNative(_root, 'Map');
  var _Map = Map;

  /* Built-in method references that are verified to be native. */

  var nativeCreate = _getNative(Object, 'create');
  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$7 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */

  var objectProto$8 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? data[key] !== undefined : hasOwnProperty$6.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;
  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash(),
      'map': new (_Map || _ListCache)(),
      'string': new _Hash()
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;
  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE = 200;
  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */

  function stackSet(key, value) {
    var data = this.__data__;

    if (data instanceof _ListCache) {
      var pairs = data.__data__;

      if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new _MapCache(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  } // Add methods to `Stack`.


  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;
  var _Stack = Stack;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */

  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);

    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;
    this.__data__ = new _MapCache();

    while (++index < length) {
      this.add(values[index]);
    }
  } // Add methods to `SetCache`.


  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;
  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;
  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */

  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    } // Assume cyclic values are equal.


    var stacked = stack.get(array);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var index = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array); // Ignore non-index properties.

    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }

      if (compared !== undefined) {
        if (compared) {
          continue;
        }

        result = false;
        break;
      } // Recursively compare arrays (susceptible to call stack limits).


      if (seen) {
        if (!_arraySome(other, function (othValue, othIndex) {
          if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }

    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /** Built-in value references. */

  var Uint8Array = _root.Uint8Array;
  var _Uint8Array = Uint8Array;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;
  /** `Object#toString` result references. */

  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag = '[object Symbol]';
  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }

        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$1:
        if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }

        return true;

      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag$1:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag$1:
        var convert = _mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked) {
          return stacked == other;
        }

        bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }

    }

    return false;
  }

  var _equalByTag = equalByTag;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }

  var _arrayPush = arrayPush;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }

    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */

  var objectProto$9 = Object.prototype;
  /** Built-in value references. */

  var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols = Object.getOwnPropertySymbols;
  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */

  var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
    if (object == null) {
      return [];
    }

    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function (symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };
  var _getSymbols = getSymbols;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$2 = 1;
  /** Used for built-in method references. */

  var objectProto$a = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$7 = objectProto$a.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
        return false;
      }
    } // Assume cyclic values are equal.


    var stacked = stack.get(object);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;

    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      } // Recursively compare objects (susceptible to call stack limits).


      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }

      skipCtor || (skipCtor = key == 'constructor');
    }

    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }

    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /* Built-in method references that are verified to be native. */

  var DataView = _getNative(_root, 'DataView');
  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */

  var Promise = _getNative(_root, 'Promise');
  var _Promise = Promise;

  /* Built-in method references that are verified to be native. */

  var Set = _getNative(_root, 'Set');
  var _Set = Set;

  /* Built-in method references that are verified to be native. */

  var WeakMap = _getNative(_root, 'WeakMap');
  var _WeakMap = WeakMap;

  /** `Object#toString` result references. */

  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';
  var dataViewTag$2 = '[object DataView]';
  /** Used to detect maps, sets, and weakmaps. */

  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

  if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
    getTag = function getTag(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;

          case mapCtorString:
            return mapTag$2;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag$2;

          case weakMapCtorString:
            return weakMapTag$1;
        }
      }

      return result;
    };
  }

  var _getTag = getTag;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$3 = 1;
  /** `Object#toString` result references. */

  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';
  /** Used for built-in method references. */

  var objectProto$b = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */

  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag$1 : _getTag(object),
        othTag = othIsArr ? arrayTag$1 : _getTag(other);
    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false;
      }

      objIsArr = true;
      objIsObj = false;
    }

    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack());
      return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }

    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new _Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }

    if (!isSameTag) {
      return false;
    }

    stack || (stack = new _Stack());
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */

  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
      return value !== value && other !== other;
    }

    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;
  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */

  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }

    object = Object(object);

    while (index--) {
      var data = matchData[index];

      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }

    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack();

        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }

        if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
          return false;
        }
      }
    }

    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */

  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */

  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];
      result[length] = [key, value, _isStrictComparable(value)];
    }

    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function (object) {
      if (object == null) {
        return false;
      }

      return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatches(source) {
    var matchData = _getMatchData(source);

    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }

    return function (object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /** `Object#toString` result references. */

  var symbolTag$1 = '[object Symbol]';
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
    return _typeof(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1;
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */

  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */

  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
      return true;
    }

    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  var _isKey = isKey;

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */

  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function memoized() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || _MapCache)();
    return memoized;
  } // Expose `MapCache`.


  memoize.Cache = _MapCache;
  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */

  var MAX_MEMOIZE_SIZE = 500;
  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */

  function memoizeCapped(func) {
    var result = memoize_1(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }

      return key;
    });
    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */

  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar = /\\(\\)?/g;
  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */

  var stringToPath = _memoizeCapped(function (string) {
    var result = [];

    if (string.charCodeAt(0) === 46
    /* . */
    ) {
        result.push('');
      }

    string.replace(rePropName, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });
  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */

  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }

    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */

  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */

  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }

    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */

  var INFINITY$1 = 1 / 0;
  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */

  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */

  function baseGet(object, path) {
    path = _castPath(path, object);
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }

    return index && index == length ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */

  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */

  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);
    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);

      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }

      object = object[key];
    }

    if (result || ++index != length) {
      return result;
    }

    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */

  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;
  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }

    return function (object) {
      var objValue = get_1(object, path);
      return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function basePropertyDeep(path) {
    return function (object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */

  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */

  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }

    if (value == null) {
      return identity_1;
    }

    if (_typeof(value) == 'object') {
      return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
    }

    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /**
   * Creates a function like `_.groupBy`.
   *
   * @private
   * @param {Function} setter The function to set accumulator values.
   * @param {Function} [initializer] The accumulator object initializer.
   * @returns {Function} Returns the new aggregator function.
   */

  function createAggregator(setter, initializer) {
    return function (collection, iteratee) {
      var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator,
          accumulator = initializer ? initializer() : {};
      return func(collection, setter, _baseIteratee(iteratee), accumulator);
    };
  }

  var _createAggregator = createAggregator;

  /** Used for built-in method references. */

  var objectProto$c = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` thru `iteratee`. The order of grouped values
   * is determined by the order they occur in `collection`. The corresponding
   * value of each key is an array of elements responsible for generating the
   * key. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([6.1, 4.2, 6.3], Math.floor);
   * // => { '4': [4.2], '6': [6.1, 6.3] }
   *
   * // The `_.property` iteratee shorthand.
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */

  var groupBy = _createAggregator(function (result, value, key) {
    if (hasOwnProperty$9.call(result, key)) {
      result[key].push(value);
    } else {
      _baseAssignValue(result, key, [value]);
    }
  });
  var groupBy_1 = groupBy;

  var defaultOpenFolders = function defaultOpenFolders() {
    return [{
      id: null,
      name: 'Home'
    }];
  };

  var state = {
    isOpen: false,
    loadingMedia: true,
    loadingFolders: true,
    limit: 0,
    pickerId: null,
    acceptedExtensions: [],
    media: {},
    selectedMedia: {},
    focusedMediaIds: [],
    folders: [],
    focusedFolderIds: [],
    openFolders: defaultOpenFolders(),
    mediaEditorIsOpen: false,
    mediaEditorItem: null,
    folderManagerIsOpen: false,
    folderManagerItem: false,
    mediaMoverIsOpen: false,
    confirmationIsOpen: false,
    icons: {
      'file-image': ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg'],
      'file-pdf': ['pdf'],
      'file-word': ['doc', 'docx'],
      'file-excel': ['xls', 'xlsx'],
      'file-video': ['mp4', 'mov'],
      'file-audio': ['mp3'],
      'file-archive': ['zip'],
      'file-power-point': ['ppt', 'pptx']
    },
    imageExtensions: ['bmp', 'gif', 'jpg', 'jpeg', 'png']
  };
  var getters = {
    isOpen: function isOpen(state) {
      return state.isOpen;
    },
    isLoadingFolders: function isLoadingFolders(state) {
      return state.loadingFolders;
    },
    isLoading: function isLoading(state) {
      return state.loadingMedia || state.loadingFolders;
    },
    limit: function limit(state) {
      return state.limit;
    },
    pickerId: function pickerId(state) {
      return state.pickerId;
    },
    acceptedExtensions: function acceptedExtensions(state) {
      return state.acceptedExtensions;
    },
    allMedia: function allMedia(state) {
      return state.media;
    },
    currentMedia: function currentMedia(state, getters) {
      var currentMedia = state.media.hasOwnProperty(getters.activeFolderId) ? state.media[getters.activeFolderId] : [];
      return currentMedia;
    },
    selectableMediaIds: function selectableMediaIds(state, getters) {
      if (state.acceptedExtensions.length) {
        return getters.currentMedia.filter(function (_ref) {
          var extension = _ref.extension;
          return state.acceptedExtensions.includes(extension);
        }).map(function (_ref2) {
          var id = _ref2.id;
          return id;
        });
      }

      return getters.currentMedia.map(function (_ref3) {
        var id = _ref3.id;
        return id;
      });
    },
    focusedMediaIds: function focusedMediaIds(state) {
      return state.focusedMediaIds;
    },
    selectedMedia: function selectedMedia(state) {
      return function (pickerId) {
        pickerId || state.pickerId;
        return pickerId && state.selectedMedia.hasOwnProperty(pickerId) ? state.selectedMedia[pickerId] : [];
      };
    },
    selectedMediaIds: function selectedMediaIds(state, getters) {
      var selectedMedia = getters.selectedMedia(state.pickerId);
      return selectedMedia && selectedMedia.length ? selectedMedia.map(function (_ref4) {
        var id = _ref4.id;
        return id;
      }) : [];
    },
    allFolders: function allFolders(state) {
      return state.folders;
    },
    groupedFolders: function groupedFolders(state) {
      return groupBy_1(state.folders, function (folder) {
        return folder.parent_id;
      });
    },
    currentFolders: function currentFolders(state, getters) {
      return getters.groupedFolders.hasOwnProperty(getters.activeFolderId) ? getters.groupedFolders[getters.activeFolderId] : [];
    },
    activeFolderId: function activeFolderId(state) {
      return state.openFolders[state.openFolders.length - 1].id;
    },
    focusedFolderIds: function focusedFolderIds(state) {
      return state.focusedFolderIds;
    },
    openFolders: function openFolders(state) {
      return state.openFolders;
    },
    mediaEditorIsOpen: function mediaEditorIsOpen(state) {
      return state.mediaEditorIsOpen;
    },
    mediaEditorItem: function mediaEditorItem(state) {
      return state.mediaEditorItem;
    },
    folderManagerIsOpen: function folderManagerIsOpen(state) {
      return state.folderManagerIsOpen;
    },
    folderManagerItem: function folderManagerItem(state) {
      return state.folderManagerItem;
    },
    mediaMoverIsOpen: function mediaMoverIsOpen(state) {
      return state.mediaMoverIsOpen;
    },
    confirmationIsOpen: function confirmationIsOpen(state) {
      return state.confirmationIsOpen;
    },
    getIcon: function getIcon(state) {
      return function (extension) {
        var icon = 'file-alt';
        Object.keys(state.icons).some(function (key) {
          if (state.icons[key].includes(extension)) {
            return icon = key;
          }
        });
        return icon;
      };
    },
    imageExtensions: function imageExtensions(state) {
      return state.imageExtensions;
    },
    isImage: function isImage(state) {
      return function (extension) {
        return state.imageExtensions.includes(extension);
      };
    }
  };
  var mutations = {
    open: function open(state) {
      state.isOpen = true;
    },
    close: function close(state) {
      state.isOpen = false;
    },
    startLoadingMedia: function startLoadingMedia(state) {
      state.loadingMedia = true;
    },
    stopLoadingMedia: function stopLoadingMedia(state) {
      state.loadingMedia = false;
    },
    stopLoadingFolders: function stopLoadingFolders(state) {
      state.loadingFolders = false;
    },
    setLimit: function setLimit(state, limit) {
      state.limit = limit;
    },
    setPickerId: function setPickerId(state, pickerId) {
      state.pickerId = pickerId;
    },
    setAcceptedExtensions: function setAcceptedExtensions(state, extensions) {
      state.acceptedExtensions = extensions;
    },
    setMedia: function setMedia(state, _ref5) {
      var folderId = _ref5.folderId,
          media = _ref5.media;
      Vue.set(state.media, folderId, media);
    },
    setPickerMedia: function setPickerMedia(state, _ref6) {
      var pickerId = _ref6.pickerId,
          media = _ref6.media;
      Vue.set(state.selectedMedia, pickerId, media);
    },
    addPickerMedia: function addPickerMedia(state, media) {
      state.selectedMedia[state.pickerId] = state.selectedMedia[state.pickerId].concat(media);
    },
    removePickerMediaItem: function removePickerMediaItem(state, _ref7) {
      var pickerId = _ref7.pickerId,
          id = _ref7.id;
      state.selectedMedia[pickerId] = state.selectedMedia[pickerId].filter(function (media) {
        return media.id !== id;
      });
    },
    clearPickerMedia: function clearPickerMedia(state, pickerId) {
      pickerId || state.pickerId;

      if (state.selectedMedia.hasOwnProperty(pickerId)) {
        delete state.selectedMedia[pickerId];
      }
    },
    addMedia: function addMedia(state, _ref8) {
      var folderId = _ref8.folderId,
          media = _ref8.media;

      if (state.media.hasOwnProperty(folderId)) {
        state.media[folderId] = state.media[folderId].concat(media);
      } else {
        Vue.set(state.media, folderId, media);
      }
    },
    updateMediaItem: function updateMediaItem(state, _ref9) {
      var folder = _ref9.folder,
          id = _ref9.id,
          properties = _ref9.properties;

      if (state.media.hasOwnProperty(folder)) {
        state.media[folder].map(function (media) {
          if (media.id === id) {
            Object.entries(properties).forEach(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
                  key = _ref11[0],
                  value = _ref11[1];

              media[key] = value;
            });
          }
        });
      }
    },
    updateSelectedMediaItem: function updateSelectedMediaItem(state, _ref12) {
      var id = _ref12.id,
          properties = _ref12.properties;
      Object.keys(state.selectedMedia).forEach(function (pickerId) {
        state.selectedMedia[pickerId].map(function (media) {
          if (media.id === id) {
            Object.entries(properties).forEach(function (_ref13) {
              var _ref14 = _slicedToArray(_ref13, 2),
                  key = _ref14[0],
                  value = _ref14[1];

              media[key] = value;
            });
          }
        });
      });
    },
    removeSelectedMedia: function removeSelectedMedia(state, mediaIds) {
      Object.keys(state.selectedMedia).forEach(function (pickerId) {
        state.selectedMedia[pickerId] = state.selectedMedia[pickerId].filter(function (_ref15) {
          var id = _ref15.id;
          return !mediaIds.includes(id);
        });
      });
    },
    addMediaItem: function addMediaItem(state, _ref16) {
      var folder = _ref16.folder,
          media = _ref16.media;

      if (state.media.hasOwnProperty(folder)) {
        state.media[folder].push(media);
      }
    },
    removeMedia: function removeMedia(state, _ref17) {
      var folderId = _ref17.folderId,
          mediaIds = _ref17.mediaIds;

      if (state.media.hasOwnProperty(folderId)) {
        state.media[folderId] = state.media[folderId].filter(function (_ref18) {
          var id = _ref18.id;
          return !mediaIds.includes(id);
        });
      }
    },
    focusMedia: function focusMedia(state, mediaId) {
      if (!state.focusedMediaIds.includes(mediaId)) {
        state.focusedMediaIds.push(mediaId);
      } else {
        state.focusedMediaIds = state.focusedMediaIds.filter(function (id) {
          return id !== mediaId;
        });
      }
    },
    clearFocusedMediaIds: function clearFocusedMediaIds(state) {
      state.focusedMediaIds = [];
    },
    setFolders: function setFolders(state, folders) {
      state.folders = folders;
    },
    addFolder: function addFolder(state, folder) {
      state.folders.push(folder);
    },
    updateFolder: function updateFolder(state, _ref19) {
      var id = _ref19.id,
          properties = _ref19.properties;
      state.folders.forEach(function (folder) {
        if (folder.id === id) {
          Object.entries(properties).forEach(function (_ref20) {
            var _ref21 = _slicedToArray(_ref20, 2),
                key = _ref21[0],
                value = _ref21[1];

            folder[key] = value;
          });
        }
      });
    },
    moveFoldersTo: function moveFoldersTo(state, _ref22) {
      var parentId = _ref22.parentId,
          folderIds = _ref22.folderIds;
      state.folders.forEach(function (folder) {
        if (folderIds.includes(folder.id)) {
          folder.parent_id = parentId;
        }
      });
    },
    removeFolders: function removeFolders(state, folderIds) {
      state.folders = state.folders.filter(function (_ref23) {
        var id = _ref23.id;
        return !folderIds.includes(id);
      });
    },
    focusFolder: function focusFolder(state, folderId) {
      if (!state.focusedFolderIds.includes(folderId)) {
        state.focusedFolderIds.push(folderId);
      } else {
        state.focusedFolderIds = state.focusedFolderIds.filter(function (id) {
          return id !== folderId;
        });
      }
    },
    clearFocusedFolderIds: function clearFocusedFolderIds(state) {
      state.focusedFolderIds = [];
    },
    resetOpenFolders: function resetOpenFolders(state) {
      state.openFolders = defaultOpenFolders();
    },
    openFolder: function openFolder(state, folder) {
      var openFolderIds = state.openFolders.map(function (folder) {
        return folder.id;
      });

      if (openFolderIds.includes(folder.id)) {
        state.openFolders.splice(openFolderIds.findIndex(function (id) {
          return id === folder.id;
        }) + 1);
      } else {
        state.openFolders.push(folder);
      }
    },
    openMediaEditor: function openMediaEditor(state) {
      state.mediaEditorIsOpen = true;
    },
    setMediaEditorItem: function setMediaEditorItem(state, item) {
      state.mediaEditorItem = item;
    },
    closeMediaEditor: function closeMediaEditor(state) {
      state.mediaEditorIsOpen = false;
    },
    openFolderManager: function openFolderManager(state) {
      state.folderManagerIsOpen = true;
    },
    setFolderManagerItem: function setFolderManagerItem(state, item) {
      state.folderManagerItem = item;
    },
    closeFolderManager: function closeFolderManager(state) {
      state.folderManagerIsOpen = false;
    },
    openMediaMover: function openMediaMover(state) {
      state.mediaMoverIsOpen = true;
    },
    closeMediaMover: function closeMediaMover(state) {
      state.mediaMoverIsOpen = false;
    },
    openConfirmation: function openConfirmation(state) {
      state.confirmationIsOpen = true;
    },
    closeConfirmation: function closeConfirmation(state) {
      state.confirmationIsOpen = false;
    }
  };
  var actions = {
    open: function open(_ref24) {
      var commit = _ref24.commit,
          dispatch = _ref24.dispatch;

      var _ref25 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          pickerId = _ref25.pickerId,
          limit = _ref25.limit,
          acceptedExtensions = _ref25.acceptedExtensions;

      commit('setPickerId', pickerId !== undefined ? pickerId : null);
      commit('setLimit', limit !== undefined ? limit : 0);
      commit('setAcceptedExtensions', Array.isArray(acceptedExtensions) ? acceptedExtensions : []);
      commit('open');
      dispatch('fetchMedia');
      dispatch('fetchFolders');
    },
    setPickerMedia: function setPickerMedia(_ref26, _ref27) {
      var commit = _ref26.commit;
      var pickerId = _ref27.pickerId,
          media = _ref27.media;
      commit('setPickerMedia', {
        pickerId: pickerId,
        media: media
      });
    },
    removePickerMediaItem: function removePickerMediaItem(_ref28, _ref29) {
      var commit = _ref28.commit;
      var pickerId = _ref29.pickerId,
          id = _ref29.id;
      commit('removePickerMediaItem', {
        pickerId: pickerId,
        id: id
      });
    },
    clearPickerMedia: function clearPickerMedia(_ref30, pickerId) {
      var commit = _ref30.commit;
      commit('clearPickerMedia', pickerId);
    },
    fetchMedia: function fetchMedia(_ref31) {
      var commit = _ref31.commit,
          getters = _ref31.getters;

      if (!getters.allMedia.hasOwnProperty(getters.activeFolderId)) {
        commit('startLoadingMedia');
        axios.get('/admin/api/media', {
          params: {
            folder: getters.activeFolderId || 'root'
          }
        }).then(function (response) {
          commit('setMedia', {
            folderId: getters.activeFolderId,
            media: response.data.data
          });
          commit('stopLoadingMedia');
        });
      } else {
        commit('stopLoadingMedia');
      }
    },
    fetchFolders: function fetchFolders(_ref32) {
      var commit = _ref32.commit,
          getters = _ref32.getters;

      if (getters.isLoadingFolders) {
        axios.get('/admin/api/media-folders').then(function (response) {
          commit('setFolders', response.data.data);
          commit('stopLoadingFolders');
        });
      }
    },
    selectMedia: function selectMedia(_ref33) {
      var commit = _ref33.commit,
          getters = _ref33.getters;
      var newlySelectedMedia = getters.focusedMediaIds.filter(function (id) {
        return !getters.selectedMediaIds.includes(id) && getters.selectableMediaIds.includes(id);
      });

      if (newlySelectedMedia.length) {
        var media = getters.currentMedia.filter(function (_ref34) {
          var id = _ref34.id;
          return newlySelectedMedia.includes(id);
        });
        commit('addPickerMedia', media);
      }

      commit('clearFocusedMediaIds');
    },
    openMediaEditor: function openMediaEditor(_ref35, item) {
      var commit = _ref35.commit;
      commit('setMediaEditorItem', item);
      commit('openMediaEditor');
    },
    openFolderManager: function openFolderManager(_ref36) {
      var commit = _ref36.commit;
      var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      commit('setFolderManagerItem', item);
      commit('openFolderManager');
    },
    moveMediaTo: function moveMediaTo(_ref37, _ref38) {
      var commit = _ref37.commit,
          getters = _ref37.getters;
      var folderId = _ref38.folderId,
          mediaIds = _ref38.mediaIds;

      if (folderId !== getters.activeFolderId) {
        var movedMedia = getters.currentMedia.filter(function (_ref39) {
          var id = _ref39.id;
          return getters.focusedMediaIds.includes(id);
        });
        commit('addMedia', {
          folderId: folderId,
          media: movedMedia
        });
        commit('removeMedia', {
          folderId: getters.activeFolderId,
          mediaIds: mediaIds
        });
      }
    },
    moveFoldersTo: function moveFoldersTo(_ref40, _ref41) {
      var commit = _ref40.commit;
      var parentId = _ref41.parentId,
          folderIds = _ref41.folderIds;
      commit('moveFoldersTo', {
        parentId: parentId,
        folderIds: folderIds
      });
    },
    deleteFocusedItems: function deleteFocusedItems(_ref42) {
      var commit = _ref42.commit,
          dispatch = _ref42.dispatch,
          getters = _ref42.getters;
      var focusedMediaIds = getters.focusedMediaIds;
      var focusedFolderIds = getters.focusedFolderIds;
      commit('removeMedia', {
        folderId: getters.activeFolderId,
        mediaIds: getters.focusedMediaIds
      });
      focusedFolderIds.forEach(function (folderId) {
        dispatch('removeSelectedMediaInFolder', folderId);
      });
      commit('removeSelectedMedia', getters.focusedMediaIds);
      commit('removeFolders', getters.focusedFolderIds);
      commit('clearFocusedMediaIds');
      commit('clearFocusedFolderIds');

      if (focusedMediaIds.length) {
        focusedMediaIds.forEach(function (mediaId) {
          axios.delete('/admin/api/media/' + mediaId);
        });
      }

      if (focusedFolderIds.length) {
        focusedFolderIds.forEach(function (folderId) {
          axios.delete('/admin/api/media-folders/' + folderId);
        });
      }
    },
    removeSelectedMediaInFolder: function removeSelectedMediaInFolder(_ref43, folderId) {
      var commit = _ref43.commit,
          dispatch = _ref43.dispatch,
          getters = _ref43.getters;
      var folder = getters.allFolders.find(function (_ref44) {
        var id = _ref44.id;
        return id === folderId;
      });

      if (folder) {
        if (getters.allMedia.hasOwnProperty(folder.id)) {
          var mediaIds = getters.allMedia[folder.id].map(function (_ref45) {
            var id = _ref45.id;
            return id;
          });

          if (mediaIds.length) {
            commit('removeSelectedMedia', mediaIds);
          }
        }

        if (getters.groupedFolders.hasOwnProperty(folder.id)) {
          getters.groupedFolders[folder.id].forEach(function (_ref46) {
            var id = _ref46.id;
            dispatch('removeSelectedMediaInFolder', id);
          });
        }
      }
    },
    reset: function reset(_ref47) {
      var commit = _ref47.commit;
      commit('setPickerId', null);
      commit('clearFocusedMediaIds');
      commit('clearFocusedFolderIds');
      commit('resetOpenFolders');
    },
    close: function close(_ref48) {
      var commit = _ref48.commit;
      commit('close');
    }
  };
  var store = {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty$2(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit$1(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var noop = function noop() {};

  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var DEFAULT_FAMILY_PREFIX = 'fa';
  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';

  var PRODUCTION = function () {
    try {
      return process.env.NODE_ENV === 'production';
    } catch (e) {
      return false;
    }
  }();
  var initial = WINDOW.FontAwesomeConfig || {};

  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');

    if (element) {
      return element.getAttribute(attr);
    }
  }

  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    // For example <script data-search-pseudo-elements src="..."></script>
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }

  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(function (_ref) {
      var _ref2 = _slicedToArray$1(_ref, 2),
          attr = _ref2[0],
          key = _ref2[1];

      var val = coerce(getAttrConfig(attr));

      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }

  var _default = {
    familyPrefix: DEFAULT_FAMILY_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  };

  var _config = _objectSpread({}, _default, initial);

  if (!_config.autoReplaceSvg) _config.observeMutations = false;

  var config = _objectSpread({}, _config);

  WINDOW.FontAwesomeConfig = config;
  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];
  var functions = [];

  var listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };

  var loaded = false;

  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }

  var isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';
  var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };
  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var styles = namespace.styles,
      shims = namespace.shims;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};

  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }

      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      var ligatures = icon[2];
      acc[iconName] = iconName;
      ligatures.forEach(function (ligature) {
        acc[ligature] = iconName;
      });
      return acc;
    });
    var hasRegular = 'far' in styles;
    _byOldName = reduce(shims, function (acc, shim) {
      var oldName = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      acc[oldName] = {
        prefix: prefix,
        iconName: iconName
      };
      return acc;
    }, {});
  };

  build();

  var styles$1 = namespace.styles;

  function MissingIcon(error) {
    this.name = 'MissingIcon';
    this.message = error || 'Icon unavailable';
    this.stack = new Error().stack;
  }

  MissingIcon.prototype = Object.create(Error.prototype);
  MissingIcon.prototype.constructor = MissingIcon;
  var FILL = {
    fill: 'currentColor'
  };
  var ANIMATION_BASE = {
    attributeType: 'XML',
    repeatCount: 'indefinite',
    dur: '2s'
  };
  var RING = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
    })
  };

  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {
    attributeName: 'opacity'
  });

  var DOT = {
    tag: 'circle',
    attributes: _objectSpread({}, FILL, {
      cx: '256',
      cy: '364',
      r: '28'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, ANIMATION_BASE, {
        attributeName: 'r',
        values: '28;14;28;28;14;28;'
      })
    }, {
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '1;0;1;1;0;1;'
      })
    }]
  };
  var QUESTION = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      opacity: '1',
      d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '1;0;0;0;0;1;'
      })
    }]
  };
  var EXCLAMATION = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      opacity: '0',
      d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '0;0;1;1;0;0;'
      })
    }]
  };
  var styles$2 = namespace.styles;

  var styles$3 = namespace.styles;

  var Library =
  /*#__PURE__*/
  function () {
    function Library() {
      _classCallCheck(this, Library);

      this.definitions = {};
    }

    _createClass(Library, [{
      key: "add",
      value: function add() {
        var _this = this;

        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }

        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
          _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
          defineIcons(key, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
          var _normalized$key = normalized[key],
              prefix = _normalized$key.prefix,
              iconName = _normalized$key.iconName,
              icon = _normalized$key.icon;
          if (!additions[prefix]) additions[prefix] = {};
          additions[prefix][iconName] = icon;
        });
        return additions;
      }
    }]);

    return Library;
  }();

  var library = new Library();

  var faClock = {
    prefix: 'far',
    iconName: 'clock',
    icon: [512, 512, [], "f017", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"]
  };
  var faTimesCircle = {
    prefix: 'far',
    iconName: 'times-circle',
    icon: [512, 512, [], "f057", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"]
  };

  var faAngleRight={prefix:'fas',iconName:'angle-right',icon:[256,512,[],"f105","M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"]};var faAngleUp={prefix:'fas',iconName:'angle-up',icon:[320,512,[],"f106","M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"]};var faArrowLeft={prefix:'fas',iconName:'arrow-left',icon:[448,512,[],"f060","M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"]};var faCheck={prefix:'fas',iconName:'check',icon:[512,512,[],"f00c","M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"]};var faCrosshairs={prefix:'fas',iconName:'crosshairs',icon:[512,512,[],"f05b","M500 224h-30.364C455.724 130.325 381.675 56.276 288 42.364V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v30.364C130.325 56.276 56.276 130.325 42.364 224H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h30.364C56.276 381.675 130.325 455.724 224 469.636V500c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-30.364C381.675 455.724 455.724 381.675 469.636 288H500c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12zM288 404.634V364c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40.634C165.826 392.232 119.783 346.243 107.366 288H148c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-40.634C119.768 165.826 165.757 119.783 224 107.366V148c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40.634C346.174 119.768 392.217 165.757 404.634 224H364c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40.634C392.232 346.174 346.243 392.217 288 404.634zM288 256c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"]};var faEllipsisH={prefix:'fas',iconName:'ellipsis-h',icon:[512,512,[],"f141","M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"]};var faExclamationTriangle={prefix:'fas',iconName:'exclamation-triangle',icon:[576,512,[],"f071","M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"]};var faFileAlt={prefix:'fas',iconName:'file-alt',icon:[384,512,[],"f15c","M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"]};var faFileArchive={prefix:'fas',iconName:'file-archive',icon:[384,512,[],"f1c6","M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zM128.4 336c-17.9 0-32.4 12.1-32.4 27 0 15 14.6 27 32.5 27s32.4-12.1 32.4-27-14.6-27-32.5-27zM224 136V0h-63.6v32h-32V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM95.9 32h32v32h-32zm32.3 384c-33.2 0-58-30.4-51.4-62.9L96.4 256v-32h32v-32h-32v-32h32v-32h-32V96h32V64h32v32h-32v32h32v32h-32v32h32v32h-32v32h22.1c5.7 0 10.7 4.1 11.8 9.7l17.3 87.7c6.4 32.4-18.4 62.6-51.4 62.6z"]};var faFileAudio={prefix:'fas',iconName:'file-audio',icon:[384,512,[],"f1c7","M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-64 268c0 10.7-12.9 16-20.5 8.5L104 376H76c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h28l35.5-36.5c7.6-7.6 20.5-2.2 20.5 8.5v136zm33.2-47.6c9.1-9.3 9.1-24.1 0-33.4-22.1-22.8 12.2-56.2 34.4-33.5 27.2 27.9 27.2 72.4 0 100.4-21.8 22.3-56.9-10.4-34.4-33.5zm86-117.1c54.4 55.9 54.4 144.8 0 200.8-21.8 22.4-57-10.3-34.4-33.5 36.2-37.2 36.3-96.5 0-133.8-22.1-22.8 12.3-56.3 34.4-33.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"]};var faFileExcel={prefix:'fas',iconName:'file-excel',icon:[384,512,[],"f1c3","M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"]};var faFileImage={prefix:'fas',iconName:'file-image',icon:[384,512,[],"f1c5","M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002 0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545 328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686 16.971 0L320.545 304v112z"]};var faFilePdf={prefix:'fas',iconName:'file-pdf',icon:[384,512,[],"f1c1","M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"]};var faFilePowerpoint={prefix:'fas',iconName:'file-powerpoint',icon:[384,512,[],"f1c4","M193.7 271.2c8.8 0 15.5 2.7 20.3 8.1 9.6 10.9 9.8 32.7-.2 44.1-4.9 5.6-11.9 8.5-21.1 8.5h-26.9v-60.7h27.9zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm53 165.2c0 90.3-88.8 77.6-111.1 77.6V436c0 6.6-5.4 12-12 12h-30.8c-6.6 0-12-5.4-12-12V236.2c0-6.6 5.4-12 12-12h81c44.5 0 72.9 32.8 72.9 77z"]};var faFileVideo={prefix:'fas',iconName:'file-video',icon:[384,512,[],"f1c8","M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM224 136V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248c-13.2 0-24-10.8-24-24zm96 144.016v111.963c0 21.445-25.943 31.998-40.971 16.971L224 353.941V392c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V280c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v38.059l55.029-55.013c15.011-15.01 40.971-4.491 40.971 16.97z"]};var faFileWord={prefix:'fas',iconName:'file-word',icon:[384,512,[],"f1c2","M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm57.1 120H305c7.7 0 13.4 7.1 11.7 14.7l-38 168c-1.2 5.5-6.1 9.3-11.7 9.3h-38c-5.5 0-10.3-3.8-11.6-9.1-25.8-103.5-20.8-81.2-25.6-110.5h-.5c-1.1 14.3-2.4 17.4-25.6 110.5-1.3 5.3-6.1 9.1-11.6 9.1H117c-5.6 0-10.5-3.9-11.7-9.4l-37.8-168c-1.7-7.5 4-14.6 11.7-14.6h24.5c5.7 0 10.7 4 11.8 9.7 15.6 78 20.1 109.5 21 122.2 1.6-10.2 7.3-32.7 29.4-122.7 1.3-5.4 6.1-9.1 11.7-9.1h29.1c5.6 0 10.4 3.8 11.7 9.2 24 100.4 28.8 124 29.6 129.4-.2-11.2-2.6-17.8 21.6-129.2 1-5.6 5.9-9.5 11.5-9.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"]};var faFolder={prefix:'fas',iconName:'folder',icon:[512,512,[],"f07b","M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"]};var faInfoCircle={prefix:'fas',iconName:'info-circle',icon:[512,512,[],"f05a","M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"]};var faMinus={prefix:'fas',iconName:'minus',icon:[448,512,[],"f068","M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"]};var faPencilAlt={prefix:'fas',iconName:'pencil-alt',icon:[512,512,[],"f303","M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"]};var faPlus={prefix:'fas',iconName:'plus',icon:[448,512,[],"f067","M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"]};var faReply={prefix:'fas',iconName:'reply',icon:[512,512,[],"f3e5","M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"]};var faSpinner={prefix:'fas',iconName:'spinner',icon:[512,512,[],"f110","M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"]};var faTimes={prefix:'fas',iconName:'times',icon:[352,512,[],"f00d","M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"]};var faTrash={prefix:'fas',iconName:'trash',icon:[448,512,[],"f1f8","M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"]};var faUpload={prefix:'fas',iconName:'upload',icon:[512,512,[],"f093","M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"]};

  var icons = {
    register: function register() {
      library.add(faAngleUp, faAngleRight, faArrowLeft, faCheck, faClock, faCrosshairs, faEllipsisH, faExclamationTriangle, faFileAlt, faFileArchive, faFileAudio, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileVideo, faFileWord, faFolder, faInfoCircle, faMinus, faPencilAlt, faPlus, faReply, faSpinner, faTimes, faTimesCircle, faTrash, faUpload);
    }
  };

  var script = {
    computed: _objectSpread2({}, vuex.mapGetters({
      openFolders: 'mediaManager/openFolders',
      activeFolderId: 'mediaManager/activeFolderId'
    })),
    methods: _objectSpread2({}, vuex.mapMutations({
      openFolder: 'mediaManager/openFolder'
    }))
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("ul", {
      staticClass: "mm-breadcrumb"
    }, _vm._l(_vm.openFolders, function (folder) {
      return _c("li", {
        key: folder.id,
        class: {
          active: folder.id === _vm.activeFolderId
        }
      }, [_c("a", {
        on: {
          click: function click($event) {
            return _vm.openFolder(folder);
          }
        }
      }, [_vm._v(_vm._s(folder.name))])]);
    }), 0);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  var Breadcrumb = normalizeComponent_1({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$1 = {
    props: {
      active: {
        type: Boolean,
        required: true
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("transition", {
      attrs: {
        name: "mm-modal-fade"
      }
    }, [_vm.active ? _c("div", {
      staticClass: "mm-modal active"
    }, [_c("div", {
      staticClass: "mm-modal-overlay",
      on: {
        click: function click($event) {
          return _vm.$emit("close");
        }
      }
    }), _vm._v(" "), _vm._t("default")], 2) : _vm._e()]);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  var Modal = normalizeComponent_1({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

  var script$2 = {
    components: {
      Modal: Modal
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      isOpen: 'mediaManager/confirmationIsOpen',
      focusedMediaIds: 'mediaManager/focusedMediaIds',
      focusedFolderIds: 'mediaManager/focusedFolderIds'
    }), {
      mediaCount: function mediaCount() {
        return this.focusedMediaIds.length;
      },
      folderCount: function folderCount() {
        return this.focusedFolderIds.length;
      }
    }),
    methods: _objectSpread2({}, vuex.mapActions({
      deleteFocusedItems: 'mediaManager/deleteFocusedItems'
    }), {}, vuex.mapMutations({
      close: 'mediaManager/closeConfirmation'
    }), {
      confirm: function confirm() {
        this.deleteFocusedItems();
        this.close();
      }
    })
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("modal", {
      attrs: {
        active: _vm.isOpen
      },
      on: {
        close: _vm.close
      }
    }, [_c("div", {
      staticClass: "mm-modal-wrap is-confirmation"
    }, [_c("div", {
      staticClass: "mm-confirmation-content"
    }, [_vm._v("\n            Are you sure you want to delete\n\n            "), _vm.folderCount ? _c("strong", [_vm._v("\n                " + _vm._s(_vm.folderCount) + " folder" + _vm._s(_vm.folderCount > 1 ? "s" : null) + "\n            ")]) : _vm._e(), _vm._v(" "), _vm.folderCount && _vm.mediaCount ? [_vm._v("\n                and\n            ")] : _vm._e(), _vm._v(" "), _vm.mediaCount ? _c("strong", [_vm._v("\n                " + _vm._s(_vm.mediaCount) + " media item" + _vm._s(_vm.mediaCount > 1 ? "s" : null) + "\n            ")]) : _vm._e()], 2), _vm._v(" "), _c("div", {
      staticClass: "mm-confirmation-buttons"
    }, [_c("a", {
      staticClass: "mm-button is-danger",
      on: {
        click: _vm.confirm
      }
    }, [_vm._v("\n                Delete\n            ")]), _vm._v(" "), _c("a", {
      staticClass: "mm-button",
      on: {
        click: _vm.close
      }
    }, [_vm._v("\n                Cancel\n            ")])])])]);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = undefined;
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject */

  /* style inject SSR */

  var Confirmation = normalizeComponent_1({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$3 = {
    data: function data() {
      return {
        isOpen: false
      };
    },
    created: function created() {
      var _this = this;

      ['click', 'touchstart'].forEach(function (action) {
        document.addEventListener(action, _this.close);
      });
    },
    destroyed: function destroyed() {
      var _this2 = this;

      ['click', 'touchstart'].forEach(function (action) {
        document.removeEventListener(action, _this2.close);
      });
    },
    methods: {
      close: function close(event) {
        if (this.isOpen && this.$refs.dropdown !== event.target && !this.$refs.dropdown.contains(event.target)) {
          this.isOpen = false;
        }
      }
    }
  };

  /* script */
  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      ref: "dropdown",
      staticClass: "mm-dropdown",
      class: {
        open: _vm.isOpen
      }
    }, [_c("div", {
      staticClass: "mm-dropdown-trigger",
      on: {
        click: function click($event) {
          _vm.isOpen = !_vm.isOpen;
        }
      }
    }, [_vm._t("button", null, {
      isOpen: _vm.isOpen
    })], 2), _vm._v(" "), _c("div", {
      staticClass: "mm-dropdown-menu max-w-xs",
      on: {
        click: function click($event) {
          _vm.isOpen = false;
        }
      }
    }, [_c("div", {
      staticClass: "mm-dropdown-scroll"
    }, [_c("div", {
      staticClass: "mm-dropdown-content"
    }, [_vm._t("default")], 2)])])]);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  var Dropdown = normalizeComponent_1({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

  var script$4 = {
    computed: _objectSpread2({}, vuex.mapGetters({
      currentFolders: 'mediaManager/currentFolders',
      focusedFolderIds: 'mediaManager/focusedFolderIds'
    })),
    methods: _objectSpread2({}, vuex.mapMutations({
      focusFolder: 'mediaManager/focusFolder',
      openFolder: 'mediaManager/openFolder'
    }))
  };

  /* script */
  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.currentFolders.length ? _c("div", [_c("h2", {
      staticClass: "mm-title"
    }, [_vm._v("\n        Folders\n    ")]), _vm._v(" "), _c("div", {
      staticClass: "mm-folders"
    }, _vm._l(_vm.currentFolders, function (folder) {
      return _c("div", {
        key: folder.id,
        staticClass: "mm-folder",
        class: {
          focused: _vm.focusedFolderIds.includes(folder.id)
        }
      }, [_c("a", {
        staticClass: "mm-folder-detail",
        attrs: {
          title: "Open folder"
        },
        on: {
          click: function click($event) {
            return _vm.openFolder(folder);
          }
        }
      }, [_c("span", {
        staticClass: "mm-icon"
      }, [_c("icon", {
        attrs: {
          icon: "folder",
          size: "lg"
        }
      })], 1), _vm._v(" "), _c("span", [_vm._v(_vm._s(folder.name))])]), _vm._v(" "), _c("a", {
        staticClass: "mm-folder-select",
        attrs: {
          title: "Select folder"
        },
        on: {
          click: function click($event) {
            $event.stopPropagation();
            return _vm.focusFolder(folder.id);
          }
        }
      }, [_c("span", {
        staticClass: "mm-icon"
      }, [_c("icon", {
        attrs: {
          icon: "crosshairs"
        }
      })], 1)])]);
    }), 0)]) : _vm._e();
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  var __vue_inject_styles__$4 = undefined;
  /* scoped */

  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject */

  /* style inject SSR */

  var Folders = normalizeComponent_1({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

  var script$5 = {
    computed: _objectSpread2({}, vuex.mapGetters({
      getIcon: 'mediaManager/getIcon',
      isImage: 'mediaManager/isImage',
      currentMedia: 'mediaManager/currentMedia',
      focusedMediaIds: 'mediaManager/focusedMediaIds',
      selectedMediaIds: 'mediaManager/selectedMediaIds',
      acceptedExtensions: 'mediaManager/acceptedExtensions'
    })),
    methods: _objectSpread2({}, vuex.mapMutations({
      focusMedia: 'mediaManager/focusMedia'
    }), {
      isSelectable: function isSelectable(extension) {
        if (!this.acceptedExtensions.length) {
          return true;
        }

        return this.acceptedExtensions.includes(extension);
      }
    })
  };

  /* script */
  var __vue_script__$5 = script$5;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_vm.currentMedia.length ? _c("div", [_c("h2", {
      staticClass: "mm-title"
    }, [_vm._v("\n            Media\n        ")]), _vm._v(" "), _c("div", {
      staticClass: "mm-media"
    }, _vm._l(_vm.currentMedia, function (media) {
      return _c("div", {
        key: media.id,
        staticClass: "mm-media-item",
        class: {
          focused: _vm.focusedMediaIds.includes(media.id),
          selected: _vm.selectedMediaIds.includes(media.id),
          "not-selectable": !_vm.isSelectable(media.extension)
        },
        on: {
          click: function click($event) {
            $event.stopPropagation();
            return _vm.focusMedia(media.id);
          }
        }
      }, [_c("div", {
        staticClass: "mm-card"
      }, [_vm.isImage(media.extension) ? _c("figure", {
        staticClass: "mm-card-image"
      }, [_c("img", {
        attrs: {
          src: media.thumbnail_url,
          alt: media.name,
          title: media.name
        }
      })]) : _c("div", {
        staticClass: "mm-card-other"
      }, [_c("div", {
        staticClass: "mm-icon"
      }, [_c("icon", {
        attrs: {
          icon: _vm.getIcon(media.extension),
          size: "4x"
        }
      })], 1)]), _vm._v(" "), _c("div", {
        staticClass: "mm-card-content"
      }, [_vm._v("\n                        " + _vm._s(media.name) + "\n                    ")])])]);
    }), 0)]) : _c("div", {
      staticClass: "mm-notification"
    }, [_vm._v("\n        No media, add new media by clicking the "), _c("strong", [_vm._v("New")]), _vm._v(" button below.\n    ")])]);
  };

  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;
  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject */

  /* style inject SSR */

  var Media = normalizeComponent_1({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

  var formMixin = {
    data: function data() {
      return {
        errors: {},
        isProcessing: false
      };
    },
    computed: {
      anyErrors: function anyErrors() {
        return Object.keys(this.errors).length > 0;
      }
    },
    methods: {
      submit: function submit() {
        var _this = this;

        this.errors = {};
        this.isProcessing = true;
        axios[this.method](this.action, this.form).then(function (response) {
          _this.onSuccess(response);
        }).catch(function (error) {
          if (error.response.status === 422) {
            _this.errors = error.response.data.errors;
          } else {
            _this.errors = {
              error: ['An unexpected error occured.']
            };
          }

          _this.onError(error);
        }).finally(function () {
          _this.isProcessing = false;

          _this.onFinally();
        });
      },
      onSuccess: function onSuccess() {//
      },
      onError: function onError() {//
      },
      onFinally: function onFinally() {//
      }
    }
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$6 = {
    props: {
      errors: {
        type: Object,
        default: function _default() {}
      }
    }
  };

  /* script */
  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "mm-errors"
    }, [_c("ul", [_vm._l(_vm.errors, function (errorGroup) {
      return _vm._l(errorGroup, function (error, index) {
        return _c("li", {
          key: index
        }, [_vm._v("\n                " + _vm._s(error) + "\n            ")]);
      });
    })], 2)]);
  };

  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;
  /* style */

  var __vue_inject_styles__$6 = undefined;
  /* scoped */

  var __vue_scope_id__$6 = undefined;
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject */

  /* style inject SSR */

  var Errors = normalizeComponent_1({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

  var initialValues = function initialValues() {
    return {
      id: null,
      parent_id: null,
      name: ''
    };
  };

  var script$7 = {
    components: {
      Errors: Errors,
      Modal: Modal
    },
    mixins: [formMixin],
    data: function data() {
      return {
        form: initialValues()
      };
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      isOpen: 'mediaManager/folderManagerIsOpen',
      folder: 'mediaManager/folderManagerItem',
      activeFolderId: 'mediaManager/activeFolderId'
    }), {
      isEditing: function isEditing() {
        return !!this.folder;
      },
      title: function title() {
        return this.isEditing ? 'Edit Folder' : 'Create Folder';
      },
      method: function method() {
        return this.isEditing ? 'patch' : 'post';
      },
      action: function action() {
        return this.isEditing ? '/admin/api/media-folders/' + this.form.id : '/admin/api/media-folders';
      }
    }),
    watch: {
      isOpen: function isOpen(_isOpen) {
        var _this = this;

        if (_isOpen) {
          this.form = {
            id: this.folder ? this.folder.id : null,
            parent_id: this.activeFolderId,
            name: this.folder ? this.folder.name : ''
          };
          this.$nextTick(function () {
            return _this.$refs.name.focus();
          });
        } else {
          this.form = initialValues();
        }
      }
    },
    methods: _objectSpread2({}, vuex.mapMutations({
      close: 'mediaManager/closeFolderManager',
      addFolder: 'mediaManager/addFolder',
      updateFolder: 'mediaManager/updateFolder'
    }), {
      onSuccess: function onSuccess(response) {
        if (this.isEditing) {
          this.updateFolder({
            id: this.form.id,
            properties: {
              name: this.form.name
            }
          });
        } else {
          this.addFolder(response.data.data);
        }

        this.close();
      }
    })
  };

  /* script */
  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("modal", {
      attrs: {
        active: _vm.isOpen
      },
      on: {
        close: _vm.close
      }
    }, [_c("div", {
      staticClass: "mm-modal-wrap is-folder-manager"
    }, [_c("header", {
      staticClass: "mm-modal-header"
    }, [_c("h4", {
      staticClass: "mm-title"
    }, [_vm._v("\n                " + _vm._s(_vm.title) + "\n            ")]), _vm._v(" "), _c("a", {
      staticClass: "mm-icon",
      on: {
        click: _vm.close
      }
    }, [_c("icon", {
      attrs: {
        icon: "times",
        size: "lg"
      }
    })], 1)]), _vm._v(" "), _c("section", {
      staticClass: "mm-modal-content"
    }, [_vm.anyErrors ? _c("errors", {
      attrs: {
        errors: _vm.errors
      }
    }) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "mm-field"
    }, [_c("label", {
      staticClass: "mm-label",
      attrs: {
        for: "mm_folder_name"
      }
    }, [_vm._v("Folder Name *")]), _vm._v(" "), _c("div", {
      staticClass: "mm-control"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.form.name,
        expression: "form.name"
      }],
      ref: "name",
      staticClass: "mm-input",
      attrs: {
        id: "mm_folder_name",
        type: "text",
        required: "",
        disabled: _vm.form.processing
      },
      domProps: {
        value: _vm.form.name
      },
      on: {
        keydown: function keydown($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          $event.preventDefault();
          return _vm.submit($event);
        },
        input: function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.form, "name", $event.target.value);
        }
      }
    })])])], 1), _vm._v(" "), _c("footer", {
      staticClass: "mm-modal-footer"
    }, [_c("div", {
      staticClass: "mm-button-group"
    }, [_c("a", {
      staticClass: "mm-button",
      on: {
        click: _vm.close
      }
    }, [_vm._v("Cancel")]), _vm._v(" "), _c("a", {
      staticClass: "mm-button is-confirm",
      class: {
        loading: _vm.isProcessing
      },
      attrs: {
        disabled: _vm.isProcessing
      },
      on: {
        click: _vm.submit
      }
    }, [_vm._v("Save")])])])])]);
  };

  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;
  /* style */

  var __vue_inject_styles__$7 = undefined;
  /* scoped */

  var __vue_scope_id__$7 = undefined;
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject */

  /* style inject SSR */

  var FolderManager = normalizeComponent_1({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

  var initialValues$1 = function initialValues() {
    return {
      id: null,
      name: ''
    };
  };

  var script$8 = {
    components: {
      Errors: Errors,
      Modal: Modal
    },
    mixins: [formMixin],
    data: function data() {
      return {
        method: 'patch',
        form: initialValues$1()
      };
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      isOpen: 'mediaManager/mediaEditorIsOpen',
      isImage: 'mediaManager/isImage',
      media: 'mediaManager/mediaEditorItem',
      activeFolderId: 'mediaManager/activeFolderId'
    }), {
      action: function action() {
        return '/admin/api/media/' + this.form.id;
      }
    }),
    watch: {
      isOpen: function isOpen(_isOpen) {
        var _this = this;

        if (_isOpen) {
          this.form = {
            id: this.media.id,
            name: this.media.name
          };
          this.$nextTick(function () {
            return _this.$refs.name.focus();
          });
        } else {
          this.form = initialValues$1();
        }
      }
    },
    methods: _objectSpread2({}, vuex.mapMutations({
      close: 'mediaManager/closeMediaEditor',
      updateMedia: 'mediaManager/updateMediaItem',
      updateSelectedMedia: 'mediaManager/updateSelectedMediaItem'
    }), {
      onSuccess: function onSuccess() {
        var properties = {
          name: this.form.name
        };
        this.updateMedia({
          folder: this.activeFolderId,
          id: this.form.id,
          properties: properties
        });
        this.updateSelectedMedia({
          id: this.form.id,
          properties: properties
        });
        this.close();
      }
    })
  };

  /* script */
  var __vue_script__$8 = script$8;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("modal", {
      attrs: {
        active: _vm.isOpen
      },
      on: {
        close: _vm.close
      }
    }, [_c("div", {
      staticClass: "mm-modal-wrap is-media-editor"
    }, [_c("header", {
      staticClass: "mm-modal-header"
    }, [_c("h4", {
      staticClass: "mm-title"
    }, [_vm._v("\n                Media Properties\n            ")]), _vm._v(" "), _c("a", {
      staticClass: "mm-icon",
      on: {
        click: _vm.close
      }
    }, [_c("icon", {
      attrs: {
        icon: "times",
        size: "lg"
      }
    })], 1)]), _vm._v(" "), _c("section", {
      staticClass: "mm-modal-content"
    }, [_vm.anyErrors ? _c("errors", {
      attrs: {
        errors: _vm.errors
      }
    }) : _vm._e(), _vm._v(" "), _vm.media ? [_vm.isImage(_vm.media.extension) ? _c("div", {
      staticClass: "mm-media-editor-layout"
    }, [_c("div", {
      staticClass: "mm-media-editor-image"
    }, [_c("img", {
      attrs: {
        src: _vm.media.thumbnail_url,
        alt: _vm.media.name
      }
    })]), _vm._v(" "), _c("div", {
      staticClass: "mm-media-editor-fields"
    }, [_c("div", {
      staticClass: "mm-field"
    }, [_c("label", {
      staticClass: "mm-label",
      attrs: {
        for: "mm_media_name"
      }
    }, [_vm._v("Media Name *")]), _vm._v(" "), _c("div", {
      staticClass: "mm-control"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.form.name,
        expression: "form.name"
      }],
      ref: "name",
      staticClass: "mm-input",
      attrs: {
        id: "mm_media_name",
        type: "text",
        required: "",
        disabled: _vm.form.processing
      },
      domProps: {
        value: _vm.form.name
      },
      on: {
        keydown: function keydown($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          $event.preventDefault();
          return _vm.submit($event);
        },
        input: function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.form, "name", $event.target.value);
        }
      }
    })])])])]) : [_c("div", {
      staticClass: "mm-field"
    }, [_c("label", {
      staticClass: "mm-label",
      attrs: {
        for: "mm_media_name"
      }
    }, [_vm._v("Media Name *")]), _vm._v(" "), _c("div", {
      staticClass: "mm-control"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.form.name,
        expression: "form.name"
      }],
      ref: "name",
      staticClass: "mm-input",
      attrs: {
        id: "mm_media_name",
        type: "text",
        required: "",
        disabled: _vm.form.processing
      },
      domProps: {
        value: _vm.form.name
      },
      on: {
        keydown: function keydown($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          $event.preventDefault();
          return _vm.submit($event);
        },
        input: function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.form, "name", $event.target.value);
        }
      }
    })])])]] : _vm._e()], 2), _vm._v(" "), _c("footer", {
      staticClass: "mm-modal-footer"
    }, [_c("div", {
      staticClass: "mm-button-group"
    }, [_c("a", {
      staticClass: "mm-button",
      on: {
        click: _vm.close
      }
    }, [_vm._v("Cancel")]), _vm._v(" "), _c("a", {
      staticClass: "mm-button is-confirm",
      class: {
        loading: _vm.isProcessing
      },
      attrs: {
        disabled: _vm.isProcessing
      },
      on: {
        click: _vm.submit
      }
    }, [_vm._v("Save")])])])])]);
  };

  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;
  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* style inject */

  /* style inject SSR */

  var MediaEditor = normalizeComponent_1({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

  var rootFolder = function rootFolder() {
    return {
      id: null,
      parent_id: null,
      name: 'Home'
    };
  };

  var script$9 = {
    components: {
      Modal: Modal
    },
    data: function data() {
      return {
        isProcessing: false,
        activeFolder: rootFolder(),
        selectedFolderId: null
      };
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      isOpen: 'mediaManager/mediaMoverIsOpen',
      allFolders: 'mediaManager/allFolders',
      focusedMediaIds: 'mediaManager/focusedMediaIds',
      focusedFolderIds: 'mediaManager/focusedFolderIds'
    }), {
      groupedFolders: function groupedFolders() {
        var _this = this;

        var folders = this.allFolders.filter(function (_ref) {
          var id = _ref.id;
          return !_this.focusedFolderIds.includes(id);
        });
        return groupBy_1(folders, function (folder) {
          return folder.parent_id;
        });
      },
      currentFolders: function currentFolders() {
        return this.groupedFolders.hasOwnProperty(this.activeFolder.id) ? this.groupedFolders[this.activeFolder.id] : [];
      }
    }),
    methods: _objectSpread2({}, vuex.mapActions({
      moveMediaTo: 'mediaManager/moveMediaTo',
      moveFoldersTo: 'mediaManager/moveFoldersTo'
    }), {}, vuex.mapMutations({
      close: 'mediaManager/closeMediaMover',
      clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
      clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds'
    }), {
      setActiveFolder: function setActiveFolder(folderId) {
        if (folderId) {
          this.activeFolder = this.allFolders.find(function (_ref2) {
            var id = _ref2.id;
            return id === folderId;
          });
        } else {
          this.activeFolder = rootFolder();
        }

        this.selectedFolderId = null;
      },
      toggleSelectFolder: function toggleSelectFolder(folderId) {
        this.selectedFolderId = this.selectedFolderId === folderId ? this.activeFolder.id : folderId;
      },
      move: function move() {
        var _this2 = this;

        var requests = [];
        var parentId = this.selectedFolderId || this.activeFolder.id;
        this.isProcessing = true;

        if (this.focusedMediaIds.length) {
          this.focusedMediaIds.forEach(function (mediaId) {
            requests.push(axios.patch('/admin/api/media/' + mediaId, {
              folder_id: parentId
            }));
          });
        }

        if (this.focusedFolderIds.length) {
          this.focusedFolderIds.forEach(function (folderId) {
            requests.push(axios.patch('/admin/api/media-folders/' + folderId, {
              parent_id: parentId
            }));
          });
        }

        axios.all(requests).then(function () {
          if (_this2.focusedMediaIds.length) {
            _this2.moveMediaTo({
              folderId: parentId,
              mediaIds: _this2.focusedMediaIds
            });

            _this2.clearFocusedMediaIds();
          }

          if (_this2.focusedFolderIds.length) {
            _this2.moveFoldersTo({
              parentId: parentId,
              folderIds: _this2.focusedFolderIds
            });

            _this2.clearFocusedFolderIds();
          }
        });
        this.close();
        this.selectedFolderId = null;
        this.activeFolder = rootFolder();
        this.isProcessing = false;
      }
    })
  };

  /* script */
  var __vue_script__$9 = script$9;
  /* template */

  var __vue_render__$9 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("modal", {
      attrs: {
        active: _vm.isOpen
      },
      on: {
        close: _vm.close
      }
    }, [_c("div", {
      staticClass: "mm-modal-wrap is-media-mover"
    }, [_c("header", {
      staticClass: "mm-modal-header"
    }, [_c("div", {
      staticClass: "mm-media-mover-header"
    }, [_vm.activeFolder.id ? _c("a", {
      staticClass: "mm-icon",
      on: {
        click: function click($event) {
          return _vm.setActiveFolder(_vm.activeFolder.parent_id);
        }
      }
    }, [_c("icon", {
      attrs: {
        icon: "arrow-left",
        size: "lg"
      }
    })], 1) : _vm._e(), _vm._v(" "), _c("h4", {
      staticClass: "mm-title"
    }, [_vm._v("\n                    " + _vm._s(_vm.activeFolder.name) + "\n                ")])]), _vm._v(" "), _c("a", {
      staticClass: "mm-icon",
      on: {
        click: _vm.close
      }
    }, [_c("icon", {
      attrs: {
        icon: "times",
        size: "lg"
      }
    })], 1)]), _vm._v(" "), _c("section", {
      staticClass: "mm-modal-content is-media-mover"
    }, [_vm.currentFolders.length ? _c("ul", {
      staticClass: "mm-media-mover-folder-list"
    }, _vm._l(_vm.currentFolders, function (folder) {
      return _c("li", {
        key: folder.id,
        class: {
          selected: _vm.selectedFolderId === folder.id
        }
      }, [_c("a", {
        on: {
          click: function click($event) {
            return _vm.toggleSelectFolder(folder.id);
          }
        }
      }, [_c("span", {
        staticClass: "mm-media-mover-folder-details"
      }, [_c("span", {
        staticClass: "mm-icon"
      }, [_c("icon", {
        attrs: {
          icon: "folder"
        }
      })], 1), _vm._v(" "), _c("span", [_vm._v(_vm._s(folder.name))])]), _vm._v(" "), _c("span", {
        staticClass: "mm-icon",
        on: {
          click: function click($event) {
            return _vm.setActiveFolder(folder.id);
          }
        }
      }, [_c("icon", {
        attrs: {
          icon: "angle-right"
        }
      })], 1)])]);
    }), 0) : _c("div", {
      staticClass: "mm-media-mover-notification"
    }, [_vm._v("\n                This folder is empty\n            ")])]), _vm._v(" "), _c("footer", {
      staticClass: "mm-modal-footer"
    }, [_c("a", {
      staticClass: "mm-button full is-confirm",
      on: {
        click: _vm.move
      }
    }, [_vm._v("Move")])])])]);
  };

  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;
  /* style */

  var __vue_inject_styles__$9 = undefined;
  /* scoped */

  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* style inject */

  /* style inject SSR */

  var MediaMover = normalizeComponent_1({
    render: __vue_render__$9,
    staticRenderFns: __vue_staticRenderFns__$9
  }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

  var script$a = {
    components: {
      Errors: Errors
    },
    data: function data() {
      return {
        isActive: false,
        error: {
          active: false,
          messages: null
        },
        files: []
      };
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      activeFolderId: 'mediaManager/activeFolderId'
    }), {
      isComplete: function isComplete() {
        return !this.files.filter(function (file) {
          return !file.complete && !file.error;
        }).length;
      },
      title: function title() {
        return this.isComplete ? 'Uploading Complete' : 'Uploading Media…';
      }
    }),
    methods: _objectSpread2({}, vuex.mapMutations({
      addMedia: 'mediaManager/addMediaItem'
    }), {
      focus: function focus() {
        this.$refs.file.click();
      },
      upload: function upload(event) {
        var _this = this;

        this.isLoading = true;
        this.isActive = true;
        Array.from(event.target.files).forEach(function (file) {
          var data = new FormData();

          var uuid = _this.generateUuid();

          if (_this.activeFolderId) {
            data.append('folder_id', _this.activeFolderId);
          }

          _this.files.push({
            uuid: uuid,
            id: null,
            name: file.name,
            progress: 0,
            uploading: false,
            complete: false,
            errors: false,
            cancel: null
          });

          data.append('file', file);
          axios.post('/admin/api/media', data, {
            cancelToken: new axios$1.CancelToken(function (cancel) {
              _this.updateFile(uuid, {
                cancel: cancel
              });
            }),
            onUploadProgress: function onUploadProgress(progressEvent) {
              _this.updateFile(uuid, {
                uploading: true,
                progress: Math.round(progressEvent.loaded * 100 / progressEvent.total)
              });
            }
          }).then(function (response) {
            _this.updateFile(uuid, {
              id: response.data.data.id,
              uploading: false,
              complete: true
            });

            _this.addMedia({
              folder: response.data.data.folder_id,
              media: response.data.data
            });
          }).catch(function (error) {
            _this.updateFile(uuid, {
              uploading: false,
              errors: error.response.data.errors
            });
          });
        });
        this.$refs.file.value = '';
      },
      generateUuid: function generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      },
      closePreview: function closePreview() {
        if (this.isComplete || confirm('Are you sure you want to cancel all uploads?')) {
          this.files.forEach(function (file) {
            if (file.uploading) {
              file.cancel();
            }
          });
          this.files = [];
          this.isActive = false;
        }
      },
      updateFile: function updateFile(uuid, properties) {
        if (this.isActive) {
          this.files.map(function (file) {
            if (file.uuid === uuid) {
              Object.entries(properties).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                file[key] = value;
              });
            }
          });
        }
      },
      fileIcon: function fileIcon(file) {
        if (file.errors) {
          return {
            icon: 'exclamation-triangle',
            class: 'text-red',
            spin: false
          };
        } else if (!file.uploading && !file.complete) {
          return {
            icon: ['far', 'clock'],
            class: null,
            spin: false
          };
        } else if (file.uploading && !file.errors) {
          return {
            icon: 'spinner',
            class: 'text-blue',
            spin: true
          };
        } else if (file.complete) {
          return {
            icon: 'check',
            class: 'text-green',
            spin: false
          };
        }
      },
      showError: function showError(messages) {
        if (messages) {
          this.error.messages = messages;
          this.error.active = true;
        }
      },
      remove: function remove(uuid) {
        var index = this.files.findIndex(function (file) {
          return file.uuid === uuid;
        });
        this.error.active = false;
        this.files[index].cancel();
        this.files = this.files.filter(function (file) {
          return file.uuid !== uuid;
        });
      }
    })
  };

  /* script */
  var __vue_script__$a = script$a;
  /* template */

  var __vue_render__$a = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.files.length,
        expression: "files.length"
      }],
      staticClass: "mm-upload"
    }, [_vm.error.active ? _c("errors", {
      staticClass: "mm-upload-errors",
      attrs: {
        errors: _vm.error.messages
      }
    }) : _vm._e(), _vm._v(" "), _c("div", {
      staticClass: "mm-upload-wrap"
    }, [_c("header", {
      staticClass: "mm-upload-header"
    }, [_c("div", {
      staticClass: "mm-upload-header-content"
    }, [!_vm.isActive && !_vm.isComplete ? _c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "spinner",
        spin: ""
      }
    })], 1) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c("a", {
      staticClass: "mm-icon",
      on: {
        click: _vm.closePreview
      }
    }, [_c("icon", {
      attrs: {
        icon: "times"
      }
    })], 1)]), _vm._v(" "), _vm.isActive ? _c("div", {
      staticClass: "mm-upload-items"
    }, _vm._l(_vm.files, function (file) {
      return _c("div", {
        key: file.uuid,
        staticClass: "mm-upload-item",
        on: {
          mouseover: function mouseover($event) {
            return _vm.showError(file.errors);
          },
          mouseleave: function mouseleave($event) {
            _vm.error.active = false;
          }
        }
      }, [_c("span", {
        staticClass: "mm-icon"
      }, [_c("icon", {
        class: _vm.fileIcon(file).class,
        attrs: {
          icon: _vm.fileIcon(file).icon,
          spin: _vm.fileIcon(file).spin
        }
      })], 1), _vm._v(" "), _c("span", {
        staticClass: "mm-upload-item-name"
      }, [_vm._v(_vm._s(file.name))]), _vm._v(" "), !file.complete ? _c("a", {
        staticClass: "mm-icon",
        on: {
          click: function click($event) {
            return _vm.remove(file.uuid);
          }
        }
      }, [_c("icon", {
        attrs: {
          icon: ["far", "times-circle"]
        }
      })], 1) : _vm._e(), _vm._v(" "), file.uploading ? _c("progress", {
        staticClass: "mm-upload-progress",
        attrs: {
          max: "100"
        },
        domProps: {
          value: file.progress
        }
      }, [_vm._v("\n                    " + _vm._s(file.progress) + "%\n                ")]) : _vm._e()]);
    }), 0) : _vm._e()]), _vm._v(" "), _c("input", {
      ref: "file",
      staticClass: "mm-upload-input",
      attrs: {
        type: "file",
        multiple: ""
      },
      on: {
        change: _vm.upload
      }
    })], 1);
  };

  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;
  /* style */

  var __vue_inject_styles__$a = undefined;
  /* scoped */

  var __vue_scope_id__$a = undefined;
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* style inject */

  /* style inject SSR */

  var MediaUploader = normalizeComponent_1({
    render: __vue_render__$a,
    staticRenderFns: __vue_staticRenderFns__$a
  }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

  var script$b = {
    components: {
      Breadcrumb: Breadcrumb,
      Confirmation: Confirmation,
      Dropdown: Dropdown,
      Modal: Modal,
      Folders: Folders,
      Media: Media,
      FolderManager: FolderManager,
      MediaEditor: MediaEditor,
      MediaMover: MediaMover,
      MediaUploader: MediaUploader
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      isOpen: 'mediaManager/isOpen',
      isLoading: 'mediaManager/isLoading',
      limit: 'mediaManager/limit',
      pickerId: 'mediaManager/pickerId',
      currentMedia: 'mediaManager/currentMedia',
      selectableMediaIds: 'mediaManager/selectableMediaIds',
      focusedMediaIds: 'mediaManager/focusedMediaIds',
      getSelectedMedia: 'mediaManager/selectedMedia',
      selectedMediaIds: 'mediaManager/selectedMediaIds',
      activeFolderId: 'mediaManager/activeFolderId',
      currentFolders: 'mediaManager/currentFolders',
      focusedFolderIds: 'mediaManager/focusedFolderIds',
      acceptedExtensions: 'mediaManager/acceptedExtensions'
    }), {
      focusedItemCount: function focusedItemCount() {
        return this.focusedFolderIds.length + this.focusedMediaIds.length;
      },
      selectedMedia: function selectedMedia() {
        return this.pickerId ? this.getSelectedMedia(this.pickerId) : [];
      },
      selectedMediaCount: function selectedMediaCount() {
        return this.selectedMedia.length;
      },
      selectedMediaLabel: function selectedMediaLabel() {
        if (this.limit) {
          return this.selectedMediaCount + ' of ' + this.limit + ' file' + (this.limit !== 1 ? 's' : '') + ' selected';
        }

        return this.selectedMediaCount + ' file' + (this.selectedMediaCount !== 1 ? 's' : '') + ' selected';
      },
      newlySelectedMedia: function newlySelectedMedia() {
        var _this = this;

        return this.focusedMediaIds.filter(function (id) {
          return !_this.selectedMediaIds.includes(id) && _this.selectableMediaIds.includes(id);
        });
      },
      limitIsExceeded: function limitIsExceeded() {
        if (this.limit) {
          return this.selectedMediaCount + this.newlySelectedMedia.length > this.limit;
        }

        return false;
      },
      insertIsDisabled: function insertIsDisabled() {
        return this.limitIsExceeded || !(this.newlySelectedMedia.length || this.selectedMediaCount);
      }
    }),
    watch: {
      activeFolderId: function activeFolderId() {
        this.clearAllFocusedIds();
        this.fetchMedia();
      }
    },
    methods: _objectSpread2({}, vuex.mapActions({
      reset: 'mediaManager/reset',
      close: 'mediaManager/close',
      fetchMedia: 'mediaManager/fetchMedia',
      selectMedia: 'mediaManager/selectMedia',
      removePickerMediaItem: 'mediaManager/removePickerMediaItem',
      openMediaEditor: 'mediaManager/openMediaEditor',
      openFolderManager: 'mediaManager/openFolderManager'
    }), {}, vuex.mapMutations({
      close: 'mediaManager/close',
      clearPickerMedia: 'mediaManager/clearPickerMedia',
      clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
      clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
      openMediaMover: 'mediaManager/openMediaMover',
      openConfirmation: 'mediaManager/openConfirmation'
    }), {
      editFocusedItem: function editFocusedItem() {
        var _this2 = this;

        if (this.focusedItemCount === 1) {
          if (this.focusedMediaIds.length) {
            var media = this.currentMedia.find(function (_ref) {
              var id = _ref.id;
              return id === _this2.focusedMediaIds[0];
            });
            this.openMediaEditor(media);
          } else {
            var folder = this.currentFolders.find(function (_ref2) {
              var id = _ref2.id;
              return id === _this2.focusedFolderIds[0];
            });
            this.openFolderManager(folder);
          }
        }
      },
      clearAllFocusedIds: function clearAllFocusedIds() {
        this.clearFocusedMediaIds();
        this.clearFocusedFolderIds();
      },
      confirm: function confirm() {
        if (!this.insertIsDisabled) {
          this.selectMedia();
          this.reset();
          this.close();
        }
      },
      cancel: function cancel() {
        this.clearAllFocusedIds();
        this.close();
      }
    })
  };

  /* script */
  var __vue_script__$b = script$b;
  /* template */

  var __vue_render__$b = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("modal", {
      staticClass: "mm-reset",
      attrs: {
        active: _vm.isOpen
      },
      on: {
        close: _vm.close
      }
    }, [_c("div", {
      staticClass: "mm-modal-wrap is-media-manager"
    }, [_c("header", {
      staticClass: "mm-modal-header"
    }, [_c("breadcrumb"), _vm._v(" "), _c("dropdown", {
      staticClass: "right",
      class: {
        "mm-manger-actions-disabled": !_vm.focusedItemCount
      }
    }, [_c("a", {
      staticClass: "mm-icon",
      attrs: {
        slot: "button"
      },
      slot: "button"
    }, [_c("icon", {
      attrs: {
        icon: "ellipsis-h",
        size: "lg"
      }
    })], 1), _vm._v(" "), _vm.focusedItemCount === 1 ? _c("a", {
      staticClass: "mm-dropdown-item",
      on: {
        click: _vm.editFocusedItem
      }
    }, [_c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "info-circle"
      }
    })], 1), _vm._v(" "), _c("span", [_vm._v("Properties")])]) : _vm._e(), _vm._v(" "), _c("a", {
      staticClass: "mm-dropdown-item",
      on: {
        click: _vm.openMediaMover
      }
    }, [_c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "reply"
      }
    })], 1), _vm._v(" "), _c("span", [_vm._v("Move")])]), _vm._v(" "), _c("div", {
      staticClass: "mm-dropdown-divider"
    }), _vm._v(" "), _c("a", {
      staticClass: "mm-dropdown-item mm-text-danger",
      on: {
        click: _vm.openConfirmation
      }
    }, [_c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "trash"
      }
    })], 1), _vm._v(" "), _c("span", [_vm._v("Delete")])])])], 1), _vm._v(" "), _c("section", {
      staticClass: "mm-modal-content is-media-manager",
      class: {
        loading: _vm.isLoading
      },
      on: {
        click: _vm.clearAllFocusedIds
      }
    }, [_c("folders"), _vm._v(" "), _c("media")], 1), _vm._v(" "), _c("footer", {
      staticClass: "mm-modal-footer"
    }, [_c("div", {
      staticClass: "mm-button-group"
    }, [_c("dropdown", {
      staticClass: "up"
    }, [_c("a", {
      staticClass: "mm-button",
      attrs: {
        slot: "button"
      },
      slot: "button"
    }, [_c("span", [_vm._v("New")]), _vm._v(" "), _c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "angle-up"
      }
    })], 1)]), _vm._v(" "), _c("a", {
      staticClass: "mm-dropdown-item",
      on: {
        click: function click($event) {
          return _vm.openFolderManager();
        }
      }
    }, [_vm._v("New Folder")]), _vm._v(" "), _c("a", {
      staticClass: "mm-dropdown-item",
      on: {
        click: function click($event) {
          return _vm.$refs.upload.focus();
        }
      }
    }, [_vm._v("Upload Media")])]), _vm._v(" "), _vm.selectedMedia.length ? _c("dropdown", {
      staticClass: "up"
    }, [_c("span", {
      staticClass: "mm-button is-selected-items",
      attrs: {
        slot: "button"
      },
      slot: "button"
    }, [_c("span", [_vm._v(_vm._s(_vm.selectedMediaLabel))]), _vm._v(" "), _c("span", {
      staticClass: "icon"
    }, [_c("icon", {
      attrs: {
        icon: "angle-up"
      }
    })], 1)]), _vm._v(" "), _vm._l(_vm.selectedMedia, function (file) {
      return _c("a", {
        key: file.id,
        staticClass: "mm-dropdown-item"
      }, [_c("span", [_vm._v(_vm._s(file.name))]), _vm._v(" "), _c("a", {
        staticClass: "mm-icon",
        on: {
          click: function click($event) {
            $event.stopPropagation();
            return _vm.removePickerMediaItem({
              pickerId: _vm.pickerId,
              id: file.id
            });
          }
        }
      }, [_c("icon", {
        attrs: {
          icon: ["far", "times-circle"]
        }
      })], 1)]);
    }), _vm._v(" "), _vm.selectedMedia.length ? _c("div", {
      staticClass: "mm-dropdown-divider"
    }) : _vm._e(), _vm._v(" "), _c("a", {
      staticClass: "mm-dropdown-item",
      on: {
        click: function click($event) {
          return _vm.clearPickerMedia(_vm.pickerId);
        }
      }
    }, [_vm._v("\n                        Clear all selected files\n                    ")])], 2) : _c("span", {
      staticClass: "mm-button is-selected-info"
    }, [_vm._v("\n                    " + _vm._s(_vm.selectedMediaLabel) + "\n                ")])], 1), _vm._v(" "), _c("div", {
      staticClass: "mm-button-group"
    }, [_vm.limit !== 0 ? _c("a", {
      staticClass: "mm-button is-confirm",
      attrs: {
        disabled: _vm.insertIsDisabled
      },
      on: {
        click: _vm.confirm
      }
    }, [_vm._v("Insert")]) : _vm._e(), _vm._v(" "), _c("a", {
      staticClass: "mm-button",
      on: {
        click: _vm.cancel
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.limit === 0 ? "Close" : "Cancel") + "\n                ")])]), _vm._v(" "), _c("media-uploader", {
      ref: "upload"
    })], 1)]), _vm._v(" "), _c("media-editor"), _vm._v(" "), _c("folder-manager"), _vm._v(" "), _c("media-mover"), _vm._v(" "), _c("confirmation")], 1);
  };

  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;
  /* style */

  var __vue_inject_styles__$b = undefined;
  /* scoped */

  var __vue_scope_id__$b = undefined;
  /* module identifier */

  var __vue_module_identifier__$b = undefined;
  /* functional template */

  var __vue_is_functional_template__$b = false;
  /* style inject */

  /* style inject SSR */

  var MediaManager = normalizeComponent_1({
    render: __vue_render__$b,
    staticRenderFns: __vue_staticRenderFns__$b
  }, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */

  function isEqual(value, other) {
    return _baseIsEqual(value, other);
  }

  var isEqual_1 = isEqual;

  var script$c = {
    props: {
      value: {
        type: [Array, Number],
        default: null
      },
      id: {
        type: String,
        required: true
      },
      media: {
        type: [Array, Object],
        default: function _default() {
          return [];
        }
      },
      acceptedExtensions: {
        type: [Array, String],
        default: null
      },
      limit: {
        type: Number,
        default: 1
      },
      preview: {
        type: Boolean,
        default: false
      }
    },
    computed: _objectSpread2({}, vuex.mapGetters({
      getIcon: 'mediaManager/getIcon',
      getPickerMedia: 'mediaManager/selectedMedia',
      imageExtensions: 'mediaManager/imageExtensions'
    }), {
      pickerMedia: function pickerMedia() {
        return this.getPickerMedia(this.id);
      },
      firstMedia: function firstMedia() {
        return this.pickerMedia.length ? this.pickerMedia[0] : null;
      },
      limitMet: function limitMet() {
        return this.limit === this.pickerMedia.length;
      },
      hasPreview: function hasPreview() {
        return this.limit === 1 && this.preview && this.firstMedia;
      }
    }),
    watch: {
      media: function media(value, oldValue) {
        if (!isEqual_1(value, oldValue)) {
          this.setPickerMedia({
            pickerId: this.id,
            media: this.formatMedia(this.media)
          });
        }
      },
      pickerMedia: function pickerMedia() {
        var selectedIds = this.pickerMedia.map(function (_ref) {
          var id = _ref.id;
          return id;
        });

        if (this.limit === 1) {
          return this.$emit('input', selectedIds.length ? selectedIds[0] : null);
        }

        return this.$emit('input', selectedIds);
      }
    },
    created: function created() {
      this.setPickerMedia({
        pickerId: this.id,
        media: this.formatMedia(this.media)
      });
    },
    beforeDestroy: function beforeDestroy() {
      this.clearPickerMedia(this.id);
    },
    methods: _objectSpread2({}, vuex.mapActions({
      openManager: 'mediaManager/open',
      setPickerMedia: 'mediaManager/setPickerMedia',
      clearPickerMedia: 'mediaManager/clearPickerMedia',
      removePickerMediaItem: 'mediaManager/removePickerMediaItem'
    }), {
      removeMedia: function removeMedia(id) {
        this.removePickerMediaItem({
          pickerId: this.id,
          id: id
        });
      },
      formatMedia: function formatMedia(media) {
        if (!media) {
          return [];
        }

        if (Array.isArray(media)) {
          return media;
        }

        return [media];
      },
      open: function open() {
        this.openManager({
          pickerId: this.id,
          limit: this.limit,
          acceptedExtensions: this.acceptedExtensions ? this.setAcceptedExtensions(this.acceptedExtensions) : null
        });
      },
      setAcceptedExtensions: function setAcceptedExtensions(acceptedExtensions) {
        if (acceptedExtensions === 'image') {
          return this.imageExtensions;
        }

        return Array.isArray(acceptedExtensions) ? acceptedExtensions : [acceptedExtensions];
      }
    })
  };

  /* script */
  var __vue_script__$c = script$c;
  /* template */

  var __vue_render__$c = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "mm-reset"
    }, [_vm.pickerMedia.length ? _c("div", [_vm.hasPreview ? _c("div", {
      staticClass: "mm-picker-preview"
    }, [_c("img", {
      attrs: {
        src: _vm.firstMedia.thumbnail_url
      }
    }), _vm._v(" "), _c("a", {
      staticClass: "mm-icon",
      on: {
        click: function click($event) {
          return _vm.removeMedia(_vm.firstMedia.id);
        }
      }
    }, [_c("icon", {
      attrs: {
        icon: "times"
      }
    })], 1)]) : _c("div", {
      staticClass: "mm-picker-items"
    }, _vm._l(_vm.pickerMedia, function (selectedMedia) {
      return _c("div", {
        key: selectedMedia.id,
        staticClass: "mm-picker-item"
      }, [_c("div", {
        staticClass: "mm-icon mm-icon-md"
      }, [_c("icon", {
        attrs: {
          icon: _vm.getIcon(selectedMedia.extension),
          size: "2x"
        }
      })], 1), _vm._v(" "), _c("div", {
        staticClass: "mm-picker-item-body"
      }, [_vm._v("\n                    " + _vm._s(selectedMedia.name) + "\n                ")]), _vm._v(" "), _c("a", {
        staticClass: "mm-icon",
        on: {
          click: function click($event) {
            return _vm.removeMedia(selectedMedia.id);
          }
        }
      }, [_c("icon", {
        attrs: {
          icon: "times"
        }
      })], 1)]);
    }), 0)]) : _vm._e(), _vm._v(" "), !_vm.limitMet ? _c("div", {
      staticClass: "mm-button is-picker",
      on: {
        click: _vm.open
      }
    }, [_c("span", {
      staticClass: "mm-icon"
    }, [_c("icon", {
      attrs: {
        icon: "upload"
      }
    })], 1), _vm._v(" "), _c("span", [_vm._v("Choose media…")])]) : _vm._e()]);
  };

  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;
  /* style */

  var __vue_inject_styles__$c = undefined;
  /* scoped */

  var __vue_scope_id__$c = undefined;
  /* module identifier */

  var __vue_module_identifier__$c = undefined;
  /* functional template */

  var __vue_is_functional_template__$c = false;
  /* style inject */

  /* style inject SSR */

  var MediaPicker = normalizeComponent_1({
    render: __vue_render__$c,
    staticRenderFns: __vue_staticRenderFns__$c
  }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

  // <media-manager></media-manager>
  // <media-picker></media-picker> props: value Number/Array, accept [], limit Number, preview Boolean
  // mention plugin is dependant on @optimuscms/ui

  function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!options.hasOwnProperty('store')) {
      throw new Error('Please provide vuex store.');
    }

    options.store.registerModule('mediaManager', store);
    icons.register(); // Register components

    Vue.component('media-manager', MediaManager);
    Vue.component('media-picker', MediaPicker);
  }

  exports.default = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
