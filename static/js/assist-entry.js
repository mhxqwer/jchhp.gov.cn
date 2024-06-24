(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AssistEntry = factory());
})(this, (function () { 'use strict';

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _regeneratorRuntime() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

    _regeneratorRuntime = function () {
      return exports;
    };

    var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }

    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");

          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }

          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);

            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }

            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    exports.wrap = wrap;
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if ("throw" !== record.type) {
          var result = record.arg,
              value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }

        reject(record.arg);
      }

      var previousPromise;

      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

            return next.value = undefined, next.done = !0, next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }

    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];

      for (var key in object) keys.push(key);

      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }

        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;

        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
              record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line es-x/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var functionBindNative = !fails(function () {
    // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var call$2 = Function.prototype.call;

  var functionCall = functionBindNative ? call$2.bind(call$2) : function () {
    return call$2.apply(call$2, arguments);
  };

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$7 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$4(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$7
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var FunctionPrototype$3 = Function.prototype;
  var bind$2 = FunctionPrototype$3.bind;
  var call$1 = FunctionPrototype$3.call;
  var uncurryThis = functionBindNative && bind$2.bind(call$1, call$1);

  var functionUncurryThis = functionBindNative ? function (fn) {
    return fn && uncurryThis(fn);
  } : function (fn) {
    return fn && function () {
      return call$1.apply(fn, arguments);
    };
  };

  var toString$1 = functionUncurryThis({}.toString);
  var stringSlice$b = functionUncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice$b(toString$1(it), 8, -1);
  };

  var $Object$4 = Object;
  var split$3 = functionUncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split$3(it, '') : $Object$4(it);
  } : $Object$4;

  var $TypeError$g = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw $TypeError$g("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument == 'function';
  };

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process$3 = global_1.process;
  var Deno$1 = global_1.Deno;
  var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es-x/no-symbol -- required for testing */



  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  /* eslint-disable es-x/no-symbol -- required for testing */


  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var $Object$3 = Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, $Object$3(it));
  };

  var $String$4 = String;

  var tryToString = function (argument) {
    try {
      return $String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var $TypeError$f = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw $TypeError$f(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var $TypeError$e = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw $TypeError$e("Can't convert object to primitive value");
  };

  var isPure = false;

  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty$7 = Object.defineProperty;

  var defineGlobalProperty = function (key, value) {
    try {
      defineProperty$7(global_1, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global_1[SHARED] || defineGlobalProperty(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.24.1',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  });

  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return $Object$2(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es-x/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();
  var toString = functionUncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (useSymbolAsUid && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var $TypeError$d = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw $TypeError$d("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var document$3 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject(document$3) && isObject(document$3.createElement);

  var documentCreateElement = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$6 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$6
  };

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = descriptors && fails(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var $String$3 = String;
  var $TypeError$c = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw $TypeError$c($String$3(argument) + ' is not an object');
  };

  var $TypeError$b = TypeError;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$5 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$5
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var FunctionPrototype$2 = Function.prototype;
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwnProperty_1(FunctionPrototype$2, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$2, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var functionToString$1 = functionUncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString$1(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

  var keys$1 = shared('keys');

  var sharedKey = function (key) {
    return keys$1[key] || (keys$1[key] = uid(key));
  };

  var hiddenKeys$1 = {};

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$4 = global_1.TypeError;
  var WeakMap = global_1.WeakMap;
  var set$1, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
    var wmget = functionUncurryThis(store.get);
    var wmhas = functionUncurryThis(store.has);
    var wmset = functionUncurryThis(store.set);
    set$1 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var makeBuiltIn_1 = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;



  var enforceInternalState = internalState.enforce;
  var getInternalState = internalState.get;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  var CONFIGURABLE_LENGTH = descriptors && !fails(function () {
    return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn = module.exports = function (value, name, options) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      if (descriptors) defineProperty(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwnProperty_1(options, 'arity') && value.length !== options.arity) {
      defineProperty(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwnProperty_1(options, 'constructor') && options.constructor) {
        if (descriptors) defineProperty(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwnProperty_1(state, 'source')) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
  }, 'toString');
  });

  var defineBuiltIn = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn_1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else objectDefineProperty.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var ceil = Math.ceil;
  var floor$5 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es-x/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$5 : ceil)(n);
  };

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : mathTrunc(number);
  };

  var max$4 = Math.max;
  var min$5 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max$4(integer + length, 0) : min$5(integer, length);
  };

  var min$4 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min$4(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var indexOf$2 = arrayIncludes.indexOf;


  var push$7 = functionUncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$7(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf$2(result, key) || push$7(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
  	f: f$4
  };

  // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
  var f$3 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$3
  };

  var concat$2 = functionUncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable(detection) ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$3(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      defineBuiltIn(target, key, sourceProperty, options);
    }
  };

  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var $Object$1 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  var $String$2 = String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$2(argument);
  };

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global_1.RegExp;

  var UNSUPPORTED_Y$3 = fails(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

  var BROKEN_CARET = UNSUPPORTED_Y$3 || fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY$1,
    UNSUPPORTED_Y: UNSUPPORTED_Y$3
  };

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es-x/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es-x/no-object-defineproperties -- safe
  var f$2 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
    return O;
  };

  var objectDefineProperties = {
  	f: f$2
  };

  var html = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */








  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es-x/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
  };

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global_1.RegExp;

  var regexpUnsupportedDotAll = fails(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global_1.RegExp;

  var regexpUnsupportedNcg = fails(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' ||
      'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */







  var getInternalState$2 = internalState.get;



  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$7 = functionUncurryThis(''.charAt);
  var indexOf$1 = functionUncurryThis(''.indexOf);
  var replace$7 = functionUncurryThis(''.replace);
  var stringSlice$a = functionUncurryThis(''.slice);

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    functionCall(nativeExec, re1, 'a');
    functionCall(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$2 = regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$2(re);
      var str = toString_1(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = functionCall(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = functionCall(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$7(flags, 'y', '');
        if (indexOf$1(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$a(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$7(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = functionCall(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$a(match.input, charsAdded);
          match[0] = stringSlice$a(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        functionCall(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = objectCreate(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points








  var SPECIES$5 = wellKnownSymbol('species');
  var RegExpPrototype$3 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$5] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      FORCED
    ) {
      var uncurriedNativeRegExpMethod = functionUncurryThis(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = functionUncurryThis(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec || $exec === RegExpPrototype$3.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
          }
          return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
        }
        return { done: false };
      });

      defineBuiltIn(String.prototype, KEY, methods[0]);
      defineBuiltIn(RegExpPrototype$3, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype$3[SYMBOL], 'sham', true);
  };

  var charAt$6 = functionUncurryThis(''.charAt);
  var charCodeAt$1 = functionUncurryThis(''.charCodeAt);
  var stringSlice$9 = functionUncurryThis(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$6(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$9(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$5 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$5(S, index).length : 1);
  };

  var $TypeError$a = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable(exec)) {
      var result = functionCall(exec, R, S);
      if (result !== null) anObject(result);
      return result;
    }
    if (classofRaw(R) === 'RegExp') return functionCall(regexpExec, R, S);
    throw $TypeError$a('RegExp#exec called on incompatible receiver');
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
        return matcher ? functionCall(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString_1(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = toString_1(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var bind$1 = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind$1(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es-x/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$4 = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$4(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var SPECIES$4 = wellKnownSymbol('species');
  var $Array$2 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === $Array$2 || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    } return C === undefined ? $Array$2 : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push$6 = functionUncurryThis([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$6(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$6(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$3] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $map = arrayIteration.map;


  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  /*
  ie10 不支持 location.origin，以下是hack方法
  */
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var replace$6 = functionUncurryThis(''.replace);
  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString_1(requireObjectCoercible($this));
      if (TYPE & 1) string = replace$6(string, ltrim, '');
      if (TYPE & 2) string = replace$6(string, rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };

  var PROPER_FUNCTION_NAME$2 = functionName.PROPER;



  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]()
        || non[METHOD_NAME]() !== non
        || (PROPER_FUNCTION_NAME$2 && whitespaces[METHOD_NAME].name !== METHOD_NAME);
    });
  };

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var iteratorClose = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject(iterator);
    try {
      innerResult = getMethod(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = functionCall(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject(innerResult);
    return value;
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var iterators = {};

  var ITERATOR$7 = wellKnownSymbol('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$7] === it);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var ITERATOR$6 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$6)
      || getMethod(it, '@@iterator')
      || iterators[classof(it)];
  };

  var $TypeError$9 = TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw $TypeError$9(tryToString(argument) + ' is not iterable');
  };

  var $Array$1 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$1 && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = functionCall(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$1(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$5] = function () {
      return this;
    };
    // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$5] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es-x/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es-x/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter ? $Object.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object ? ObjectPrototype : null;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es-x/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype$2[ITERATOR$4])) {
    defineBuiltIn(IteratorPrototype$2, ITERATOR$4, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$6 = objectDefineProperty.f;



  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$1)) {
      defineProperty$6(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $String$1 = String;
  var $TypeError$8 = TypeError;

  var aPossiblePrototype = function (argument) {
    if (typeof argument == 'object' || isCallable(argument)) return argument;
    throw $TypeError$8("Can't set " + $String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */




  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es-x/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
      setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$3 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$3]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$3])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR$3, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return functionCall(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$3] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR$3, defaultIterator, { name: DEFAULT });
    }
    iterators[NAME] = defaultIterator;

    return methods;
  };

  var charAt$4 = stringMultibyte.charAt;




  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$5 = internalState.set;
  var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$5(this, {
      type: STRING_ITERATOR,
      string: toString_1(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt$4(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var $TypeError$7 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$7('Maximum allowed index exceeded');
    return it;
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          doesNotExceedSafeInteger(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger(n + 1);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var defineProperty$5 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    defineProperty$5(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var defineProperty$4 = objectDefineProperty.f;




  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = internalState.set;
  var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if (descriptors && values.name !== 'values') try {
    defineProperty$4(values, 'name', { value: 'values' });
  } catch (error) { /* empty */ }

  var $Array = Array;
  var max$3 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = $Array(max$3(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  };

  /* eslint-disable es-x/no-object-getownpropertynames -- safe */


  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;


  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySliceSimple(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$1 = function getOwnPropertyNames(it) {
    return windowNames && classofRaw(it) == 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$1
  };

  // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it


  var arrayBufferNonExtensible = fails(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8);
      // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe
      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
    }
  });

  // eslint-disable-next-line es-x/no-object-isextensible -- safe
  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

  // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible
  var objectIsExtensible = (FAILS_ON_PRIMITIVES || arrayBufferNonExtensible) ? function isExtensible(it) {
    if (!isObject(it)) return false;
    if (arrayBufferNonExtensible && classofRaw(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var freezing = !fails(function () {
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;






  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + id++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwnProperty_1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!objectIsExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && REQUIRED && objectIsExtensible(it) && !hasOwnProperty_1(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () { /* empty */ };
    REQUIRED = true;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;
    var splice = functionUncurryThis([].splice);
    var test = {};
    test[METADATA] = 1;

    // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      objectGetOwnPropertyNames.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        } return result;
      };

      _export({ target: 'Object', stat: true, forced: true }, {
        getOwnPropertyNames: objectGetOwnPropertyNamesExternal.f
      });
    }
  };

  var meta = module.exports = {
    enable: enable,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys$1[METADATA] = true;
  });
  internalMetadata.enable;
  internalMetadata.fastKey;
  internalMetadata.getWeakData;
  internalMetadata.onFreeze;

  var $TypeError$6 = TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_RECORD = !!(options && options.IS_RECORD);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_RECORD) {
      iterator = iterable.iterator;
    } else if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw $TypeError$6(tryToString(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = IS_RECORD ? iterable.next : iterator.next;
    while (!(step = functionCall(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var $TypeError$5 = TypeError;

  var anInstance = function (it, Prototype) {
    if (objectIsPrototypeOf(Prototype, it)) return it;
    throw $TypeError$5('Incorrect invocation');
  };

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      isCallable(NewTarget = dummy.constructor) &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global_1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = functionUncurryThis(NativePrototype[KEY]);
      defineBuiltIn(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          uncurriedNativeMethod(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced_1(
      CONSTRUCTOR_NAME,
      !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.enable();
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, NativePrototype);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineBuiltIns = function (target, src, options) {
    for (var key in src) defineBuiltIn(target, key, src[key], options);
    return target;
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty$3 = objectDefineProperty.f;








  var fastKey = internalMetadata.fastKey;


  var setInternalState$3 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState$3(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var Prototype = Constructor.prototype;

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      defineBuiltIns(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      defineBuiltIns(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty$3(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$3(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };
  collectionStrong.getConstructor;
  collectionStrong.setStrong;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    defineBuiltIn(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  var handlePrototype$1 = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME$1 in domIterables) {
    handlePrototype$1(global_1[COLLECTION_NAME$1] && global_1[COLLECTION_NAME$1].prototype, COLLECTION_NAME$1);
  }

  handlePrototype$1(domTokenListPrototype, 'DOMTokenList');

  var FunctionPrototype$1 = Function.prototype;
  var apply = FunctionPrototype$1.apply;
  var call = FunctionPrototype$1.call;

  // eslint-disable-next-line es-x/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call.bind(apply) : function () {
    return call.apply(apply, arguments);
  });

  var arraySlice = functionUncurryThis([].slice);

  var $TypeError$4 = TypeError;

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw $TypeError$4('Not enough arguments');
    return passed;
  };

  var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check
  var Function$2 = global_1.Function;

  var wrap = function (scheduler) {
    return MSIE ? function (handler, timeout /* , ...arguments */) {
      var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
      var fn = isCallable(handler) ? handler : Function$2(handler);
      var args = boundArgs ? arraySlice(arguments, 2) : undefined;
      return scheduler(boundArgs ? function () {
        functionApply(fn, this, args);
      } : fn, timeout);
    } : scheduler;
  };

  // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
  var schedulersFix = {
    // `setTimeout` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    setTimeout: wrap(global_1.setTimeout),
    // `setInterval` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    setInterval: wrap(global_1.setInterval)
  };

  var setInterval = schedulersFix.setInterval;

  // ie9- setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  _export({ global: true, bind: true, forced: global_1.setInterval !== setInterval }, {
    setInterval: setInterval
  });

  var setTimeout$1 = schedulersFix.setTimeout;

  // ie9- setTimeout additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  _export({ global: true, bind: true, forced: global_1.setTimeout !== setTimeout$1 }, {
    setTimeout: setTimeout$1
  });

  var $includes = arrayIncludes.includes;



  // FF99+ bug
  var BROKEN_ON_SPARSE = fails(function () {
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var MATCH$2 = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var $TypeError$3 = TypeError;

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw $TypeError$3("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  var stringIndexOf$3 = functionUncurryThis(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf$3(
        toString_1(requireObjectCoercible(this)),
        toString_1(notARegexp(searchString)),
        arguments.length > 1 ? arguments[1] : undefined
      );
    }
  });

  var FUNCTION_NAME_EXISTS = functionName.EXISTS;

  var defineProperty$2 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var functionToString = functionUncurryThis(FunctionPrototype.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = functionUncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (descriptors && !FUNCTION_NAME_EXISTS) {
    defineProperty$2(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var RegExpPrototype$2 = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwnProperty_1(R, 'flags') && objectIsPrototypeOf(RegExpPrototype$2, R)
      ? functionCall(regexpFlags, R) : flags;
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;






  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var n$ToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var pattern = toString_1(R.source);
      var flags = toString_1(regexpGetFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  var $TypeError$2 = TypeError;

  var deletePropertyOrThrow = function (O, P) {
    if (!delete O[P]) throw $TypeError$2('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  };

  var floor$4 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$4(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(
      array,
      mergeSort(arraySliceSimple(array, 0, middle), comparefn),
      mergeSort(arraySliceSimple(array, middle), comparefn),
      comparefn
    );
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    } return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    } return array;
  };

  var arraySort = mergeSort;

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

  var engineFfVersion = !!firefox && +firefox[1];

  var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

  var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

  var engineWebkitVersion = !!webkit && +webkit[1];

  var test = [];
  var un$Sort = functionUncurryThis(test.sort);
  var push$5 = functionUncurryThis(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$2 = arrayMethodIsStrict('sort');

  var STABLE_SORT = !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (engineV8Version) return engineV8Version < 70;
    if (engineFfVersion && engineFfVersion > 3) return;
    if (engineIsIeOrEdge) return true;
    if (engineWebkitVersion) return engineWebkitVersion < 603;

    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66: case 69: case 70: case 72: value = 3; break;
        case 68: case 71: value = 4; break;
        default: value = 2;
      }

      for (index = 0; index < 47; index++) {
        test.push({ k: chr + index, v: value });
      }
    }

    test.sort(function (a, b) { return b.v - a.v; });

    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });

  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$2 || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString_1(x) > toString_1(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export({ target: 'Array', proto: true, forced: FORCED$1 }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable(comparefn);

      var array = toObject(this);

      if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

      var items = [];
      var arrayLength = lengthOfArrayLike(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push$5(items, array[index]);
      }

      arraySort(items, getSortCompare(comparefn));

      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow(array, index++);

      return array;
    }
  });

  var floor$3 = Math.floor;
  var charAt$3 = functionUncurryThis(''.charAt);
  var replace$5 = functionUncurryThis(''.replace);
  var stringSlice$8 = functionUncurryThis(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace$5(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$3(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$8(str, 0, position);
        case "'": return stringSlice$8(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$8(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$3(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var REPLACE$1 = wellKnownSymbol('replace');
  var max$2 = Math.max;
  var min$3 = Math.min;
  var concat$1 = functionUncurryThis([].concat);
  var push$4 = functionUncurryThis([].push);
  var stringIndexOf$2 = functionUncurryThis(''.indexOf);
  var stringSlice$7 = functionUncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE$1]) {
      return /./[REPLACE$1]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE$1);
        return replacer
          ? functionCall(replacer, searchValue, O, replaceValue)
          : functionCall(nativeReplace, toString_1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString_1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf$2(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString_1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          push$4(results, result);
          if (!global) break;

          var matchStr = toString_1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString_1(result[0]);
          var position = max$2(min$3(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$4(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat$1([matched], captures, position, S);
            if (namedCaptures !== undefined) push$4(replacerArgs, namedCaptures);
            var replacement = toString_1(functionApply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice$7(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice$7(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var REPLACE = wellKnownSymbol('replace');
  var $TypeError$1 = TypeError;
  var indexOf = functionUncurryThis(''.indexOf);
  functionUncurryThis(''.replace);
  var stringSlice$6 = functionUncurryThis(''.slice);
  var max$1 = Math.max;

  var stringIndexOf$1 = function (string, searchValue, fromIndex) {
    if (fromIndex > string.length) return -1;
    if (searchValue === '') return fromIndex;
    return indexOf(string, searchValue, fromIndex);
  };

  // `String.prototype.replaceAll` method
  // https://tc39.es/ecma262/#sec-string.prototype.replaceall
  _export({ target: 'String', proto: true }, {
    replaceAll: function replaceAll(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
      var position = 0;
      var endOfLastMatch = 0;
      var result = '';
      if (searchValue != null) {
        IS_REG_EXP = isRegexp(searchValue);
        if (IS_REG_EXP) {
          flags = toString_1(requireObjectCoercible(regexpGetFlags(searchValue)));
          if (!~indexOf(flags, 'g')) throw $TypeError$1('`.replaceAll` does not allow non-global regexes');
        }
        replacer = getMethod(searchValue, REPLACE);
        if (replacer) {
          return functionCall(replacer, searchValue, O, replaceValue);
        }
      }
      string = toString_1(O);
      searchString = toString_1(searchValue);
      functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString_1(replaceValue);
      searchLength = searchString.length;
      advanceBy = max$1(1, searchLength);
      position = stringIndexOf$1(string, searchString, 0);
      while (position !== -1) {
        replacement = functionalReplace
          ? toString_1(replaceValue(searchString, position, string))
          : getSubstitution(searchString, string, position, [], undefined, replaceValue);
        result += stringSlice$6(string, endOfLastMatch, position) + replacement;
        endOfLastMatch = position + searchLength;
        position = stringIndexOf$1(string, searchString, position + advanceBy);
      }
      if (endOfLastMatch < string.length) {
        result += stringSlice$6(string, endOfLastMatch);
      }
      return result;
    }
  });

  var $forEach = arrayIteration.forEach;


  var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
  } : [].forEach;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  };

  for (var COLLECTION_NAME in domIterables) {
    if (domIterables[COLLECTION_NAME]) {
      handlePrototype(global_1[COLLECTION_NAME] && global_1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(domTokenListPrototype);

  var un$Join = functionUncurryThis([].join);

  var ES3_STRINGS = indexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var $TypeError = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw $TypeError(tryToString(argument) + ' is not a constructor');
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$2 = Math.min;
  var $push = [].push;
  var exec$3 = functionUncurryThis(/./.exec);
  var push$3 = functionUncurryThis($push);
  var stringSlice$5 = functionUncurryThis(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString_1(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return functionCall(nativeSplit, string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = functionCall(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            push$3(output, stringSlice$5(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) functionApply($push, output, arraySliceSimple(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !exec$3(separatorCopy, '')) push$3(output, '');
        } else push$3(output, stringSlice$5(string, lastLastIndex));
        return output.length > lim ? arraySliceSimple(output, 0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : functionCall(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
        return splitter
          ? functionCall(splitter, separator, O, limit)
          : functionCall(internalSplit, toString_1(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y$1 ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
          var z = regexpExecAbstract(splitter, UNSUPPORTED_Y$1 ? stringSlice$5(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$2(toLength(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            push$3(A, stringSlice$5(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$3(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$3(A, stringSlice$5(S, p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(engineUserAgent);

  var set = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process$2 = global_1.process;
  var Dispatch = global_1.Dispatch;
  var Function$1 = global_1.Function;
  var MessageChannel = global_1.MessageChannel;
  var String$1 = global_1.String;
  var counter = 0;
  var queue$1 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location$1, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location$1 = global_1.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    if (hasOwnProperty_1(queue$1, id)) {
      var fn = queue$1[id];
      delete queue$1[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(String$1(id), location$1.protocol + '//' + location$1.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable(handler) ? handler : Function$1(handler);
      var args = arraySlice(arguments, 1);
      queue$1[++counter] = function () {
        functionApply(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue$1[id];
    };
    // Node.js 0.8-
    if (engineIsNode) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global_1.addEventListener &&
      isCallable(global_1.postMessage) &&
      !global_1.importScripts &&
      location$1 && location$1.protocol !== 'file:' &&
      !fails(post)
    ) {
      defer = post;
      global_1.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(engineUserAgent) && global_1.Pebble !== undefined;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;





  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var document$2 = global_1.document;
  var process$1 = global_1.process;
  var Promise$1 = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (engineIsNode && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!engineIsIosPebble && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = functionBindContext(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (engineIsNode) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
    } else {
      // strange IE + webpack dev server bug - use .bind(global)
      macrotask = functionBindContext(macrotask, global_1);
      notify$1 = function () {
        macrotask(flush);
      };
    }
  }

  var microtask = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var hostReportErrors = function (a, b) {
    var console = global_1.console;
    if (console && console.error) {
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var Queue = function () {
    this.head = null;
    this.tail = null;
  };

  Queue.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      if (this.head) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        this.head = entry.next;
        if (this.tail === entry) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue = Queue;

  var promiseNativeConstructor = global_1.Promise;

  /* global Deno -- Deno case */
  var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

  var engineIsBrowser = !engineIsDeno && !engineIsNode
    && typeof window == 'object'
    && typeof document == 'object';

  promiseNativeConstructor && promiseNativeConstructor.prototype;
  var SPECIES = wellKnownSymbol('species');
  var SUBCLASSING = false;
  var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable(global_1.PromiseRejectionEvent);

  var FORCED_PROMISE_CONSTRUCTOR$5 = isForced_1('Promise', function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(promiseNativeConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(promiseNativeConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && engineV8Version === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (!engineV8Version || engineV8Version < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
      // Detect correctness of subclassing with @@species support
      var promise = new promiseNativeConstructor(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    } return !GLOBAL_CORE_JS_PROMISE && (engineIsBrowser || engineIsDeno) && !NATIVE_PROMISE_REJECTION_EVENT$1;
  });

  var promiseConstructorDetection = {
    CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
    REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
    SUBCLASSING: SUBCLASSING
  };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable(resolve);
    this.reject = aCallable(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  var f = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability$1 = {
  	f: f
  };

  var task = task$1.set;









  var PROMISE = 'Promise';
  var FORCED_PROMISE_CONSTRUCTOR$4 = promiseConstructorDetection.CONSTRUCTOR;
  var NATIVE_PROMISE_REJECTION_EVENT = promiseConstructorDetection.REJECTION_EVENT;
  var NATIVE_PROMISE_SUBCLASSING = promiseConstructorDetection.SUBCLASSING;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var setInternalState$2 = internalState.set;
  var NativePromisePrototype$1 = promiseNativeConstructor && promiseNativeConstructor.prototype;
  var PromiseConstructor = promiseNativeConstructor;
  var PromisePrototype = NativePromisePrototype$1;
  var TypeError$3 = global_1.TypeError;
  var document$1 = global_1.document;
  var process = global_1.process;
  var newPromiseCapability = newPromiseCapability$1.f;
  var newGenericPromiseCapability = newPromiseCapability;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global_1.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && isCallable(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(TypeError$3('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          functionCall(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    functionCall(task, global_1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (engineIsNode) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    functionCall(task, global_1, function () {
      var promise = state.facade;
      if (engineIsNode) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$3("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            functionCall(then, value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED_PROMISE_CONSTRUCTOR$4) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromisePrototype);
      aCallable(executor);
      functionCall(Internal, this);
      var state = getInternalPromiseState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype;

    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$2(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new queue(),
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };

    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = engineIsNode ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    });

    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalPromiseState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };

    newPromiseCapability$1.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable(promiseNativeConstructor) && NativePromisePrototype$1 !== Object.prototype) {
      nativeThen = NativePromisePrototype$1.then;

      if (!NATIVE_PROMISE_SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        defineBuiltIn(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            functionCall(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype$1.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (objectSetPrototypeOf) {
        objectSetPrototypeOf(NativePromisePrototype$1, PromisePrototype);
      }
    }
  }

  _export({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

  var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
    promiseNativeConstructor.all(iterable).then(undefined, function () { /* empty */ });
  });

  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  _export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability$1.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          functionCall($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;





  var NativePromisePrototype = promiseNativeConstructor && promiseNativeConstructor.prototype;

  // `Promise.prototype.catch` method
  // https://tc39.es/ecma262/#sec-promise.prototype.catch
  _export({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
  if (isCallable(promiseNativeConstructor)) {
    var method = getBuiltIn('Promise').prototype['catch'];
    if (NativePromisePrototype['catch'] !== method) {
      defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
    }
  }

  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  _export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability$1.f(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate(iterable, function (promise) {
          functionCall($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  _export({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
    reject: function reject(r) {
      var capability = newPromiseCapability$1.f(this);
      functionCall(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;


  getBuiltIn('Promise');

  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  _export({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  var js_cookie = createCommonjsModule(function (module, exports) {
  (function (factory) {
  	var registeredInModuleLoader;
  	{
  		module.exports = factory();
  		registeredInModuleLoader = true;
  	}
  	if (!registeredInModuleLoader) {
  		var OldCookies = window.Cookies;
  		var api = window.Cookies = factory();
  		api.noConflict = function () {
  			window.Cookies = OldCookies;
  			return api;
  		};
  	}
  }(function () {
  	function extend () {
  		var i = 0;
  		var result = {};
  		for (; i < arguments.length; i++) {
  			var attributes = arguments[ i ];
  			for (var key in attributes) {
  				result[key] = attributes[key];
  			}
  		}
  		return result;
  	}

  	function decode (s) {
  		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  	}

  	function init (converter) {
  		function api() {}

  		function set (key, value, attributes) {
  			if (typeof document === 'undefined') {
  				return;
  			}

  			attributes = extend({
  				path: '/'
  			}, api.defaults, attributes);

  			if (typeof attributes.expires === 'number') {
  				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
  			}

  			// We're using "expires" because "max-age" is not supported by IE
  			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

  			try {
  				var result = JSON.stringify(value);
  				if (/^[\{\[]/.test(result)) {
  					value = result;
  				}
  			} catch (e) {}

  			value = converter.write ?
  				converter.write(value, key) :
  				encodeURIComponent(String(value))
  					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

  			key = encodeURIComponent(String(key))
  				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
  				.replace(/[\(\)]/g, escape);

  			var stringifiedAttributes = '';
  			for (var attributeName in attributes) {
  				if (!attributes[attributeName]) {
  					continue;
  				}
  				stringifiedAttributes += '; ' + attributeName;
  				if (attributes[attributeName] === true) {
  					continue;
  				}

  				// Considers RFC 6265 section 5.2:
  				// ...
  				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
  				//     character:
  				// Consume the characters of the unparsed-attributes up to,
  				// not including, the first %x3B (";") character.
  				// ...
  				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
  			}

  			return (document.cookie = key + '=' + value + stringifiedAttributes);
  		}

  		function get (key, json) {
  			if (typeof document === 'undefined') {
  				return;
  			}

  			var jar = {};
  			// To prevent the for loop in the first place assign an empty array
  			// in case there are no cookies at all.
  			var cookies = document.cookie ? document.cookie.split('; ') : [];
  			var i = 0;

  			for (; i < cookies.length; i++) {
  				var parts = cookies[i].split('=');
  				var cookie = parts.slice(1).join('=');

  				if (!json && cookie.charAt(0) === '"') {
  					cookie = cookie.slice(1, -1);
  				}

  				try {
  					var name = decode(parts[0]);
  					cookie = (converter.read || converter)(cookie, name) ||
  						decode(cookie);

  					if (json) {
  						try {
  							cookie = JSON.parse(cookie);
  						} catch (e) {}
  					}

  					jar[name] = cookie;

  					if (key === name) {
  						break;
  					}
  				} catch (e) {}
  			}

  			return key ? jar[key] : jar;
  		}

  		api.set = set;
  		api.get = function (key) {
  			return get(key, false /* read as raw */);
  		};
  		api.getJSON = function (key) {
  			return get(key, true /* read as json */);
  		};
  		api.remove = function (key, attributes) {
  			set(key, '', extend(attributes, {
  				expires: -1
  			}));
  		};

  		api.defaults = {};

  		api.withConverter = init;

  		return api;
  	}

  	return init(function () {});
  }));
  });

  var namespace = "keenbow-barrier-free";
  var domain = "";
  var url = "//tts.baidu.com/text2audio";
  var config = {
  	namespace: namespace,
  	domain: domain,
  	url: url
  };

  var $find = arrayIteration.find;


  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var defineProperty$1 = objectDefineProperty.f;

  var proxyAccessor = function (Target, Source, key) {
    key in Target || defineProperty$1(Target, key, {
      configurable: true,
      get: function () { return Source[key]; },
      set: function (it) { Source[key] = it; }
    });
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;









  var enforceInternalState = internalState.enforce;





  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global_1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype;
  var SyntaxError = global_1.SyntaxError;
  var exec$2 = functionUncurryThis(RegExpPrototype.exec);
  var charAt$2 = functionUncurryThis(''.charAt);
  var replace$4 = functionUncurryThis(''.replace);
  var stringIndexOf = functionUncurryThis(''.indexOf);
  var stringSlice$4 = functionUncurryThis(''.slice);
  // TODO: Use only proper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
  var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;

  var BASE_FORCED = descriptors &&
    (!CORRECT_NEW || MISSED_STICKY || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails(function () {
      re2[MATCH] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt$2(string, index);
      if (chr === '\\') {
        result += chr + charAt$2(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt$2(string, index);
      if (chr === '\\') {
        chr = chr + charAt$2(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (exec$2(IS_NCG, stringSlice$4(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwnProperty_1(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced_1('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = objectIsPrototypeOf(RegExpPrototype, this);
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || objectIsPrototypeOf(RegExpPrototype, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = regexpGetFlags(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString_1(pattern);
      flags = flags === undefined ? '' : toString_1(flags);
      rawPattern = pattern;

      if (regexpUnsupportedDotAll && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf(flags, 's') > -1;
        if (dotAll) flags = replace$4(flags, /s/g, '');
      }

      rawFlags = flags;

      if (MISSED_STICKY && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf(flags, 'y') > -1;
        if (sticky && UNSUPPORTED_Y) flags = replace$4(flags, /y/g, '');
      }

      if (regexpUnsupportedNcg) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
      proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
    }

    RegExpPrototype.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype;
    defineBuiltIn(global_1, 'RegExp', RegExpWrapper, { constructor: true });
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var SelfHosted = true;
  var DisableRole = false;
  var IdOfWebsignLanguage = 'div_websignLanguage';
  var audioTabText = {
    pointeread: '已开启指读模式',
    bigtextOpen: '大字幕已开启',
    bigtextClose: '大字幕已关闭',
    pointerFollowOpen: '十字线已开启',
    pointerFollowClose: '十字线已关闭',
    cursorAutoOpen: '大鼠标已开启',
    cursorAutoClose: '大鼠标已关闭',
    zoomOut: '页面已放大',
    zoomOutEnd: '页面已放到最大',
    zoomMin: '页面已缩小',
    zoomMinEnd: '页面已缩至最小',
    speedQuick: '语速已加快',
    speedMiddle: '语速已正常',
    speedSlow: '语速已减缓',
    audioOpen: '声音已开启',
    audioClose: '声音关闭',
    reset: '已重置',
    openMenu: '打开菜单'
  };
  var symbolsReg = new RegExp("[]");
  var utilLabel = {
    BtnReset$title: '重新设置',
    audioBtn$ontitle: '当前声音已开启，点击关闭',
    audioBtn$offtitle: '当前声音已关闭，点击开启',
    speedTab$mode0title: '当前语速正常',
    speedTab$mode1title: '当前语速快',
    speedTab$mode2title: '当前语速慢',
    BtnReadMode$mode0title: '当前为指读模式',
    BtnReadMode$mode1title: '当前为连读模式',
    BtnReadMode$mode0hint: '已开启指读模式',
    BtnReadMode$mode1hint: '已开启连读模式',
    BtnChangeColor$mode0title: '当前为原始配色',
    BtnChangeColor$mode1title: '当前配色为白底黑字',
    BtnChangeColor$mode2title: '当前配色为蓝底黄字',
    BtnChangeColor$mode3title: '当前配色为黄底黑字',
    BtnChangeColor$mode4title: '当前配色为黑底黄字',
    BtnChangeColor$mode0hint: '还原为原始配色',
    BtnChangeColor$mode1hint: '调整为白底黑字',
    BtnChangeColor$mode2hint: '调整为蓝底黄字',
    BtnChangeColor$mode3hint: '调整为黄底黑字',
    BtnChangeColor$mode4hint: '调整为黑底黄字',
    BtnCursor$ontitle: '当前大鼠标已开启',
    BtnCursor$offtitle: '当前大鼠标已关闭',
    //BtnCursor$onhint: '大鼠标已开启',
    //BtnCursor$offhint: '大鼠标已关闭',
    BtnCross$ontitle: '当前十字光标已开启',
    BtnCross$offtitle: '当前十字光标已关闭'
  };
  function GetUtilElements(namespace) {
    return {
      BtnClose: document.getElementById("".concat(namespace, "-close")),
      BtnClose2: document.getElementById("".concat(namespace, "-close2")),
      BtnClose3: document.getElementById("".concat(namespace, "-close3")),
      BtnReset: document.getElementById("".concat(namespace, "-reset")),
      BtnReset2: document.getElementById("".concat(namespace, "-reset2")),
      BtnReset3: document.getElementById("".concat(namespace, "-reset3")),
      BtnChangeColor: document.getElementById("".concat(namespace, "-change-color")),
      BtnReadScreen: document.getElementById("".concat(namespace, "-read-screen")),
      BtnReadScreen2: document.getElementById("".concat(namespace, "-read-screen2")),
      BtnSign: document.getElementById("".concat(namespace, "-sign")),
      BtnReturnmain: document.getElementById("".concat(namespace, "-returnmain")),
      BtnSignSpeed: document.getElementById("".concat(namespace, "-sign-speed")),
      BtnRepeat: document.getElementById("".concat(namespace, "-repeat")),
      BtnHelp: document.getElementById("".concat(namespace, "-help")),
      BtnHelp2: document.getElementById("".concat(namespace, "-help2")),
      BtnHelp3: document.getElementById("".concat(namespace, "-help3")),
      BtnFix: document.getElementById("".concat(namespace, "-fixed")),
      BtnFix2: document.getElementById("".concat(namespace, "-fixed2")),
      BtnFix3: document.getElementById("".concat(namespace, "-fixed3")),
      BtnShortcut: document.getElementById("".concat(namespace, "-shortcut")),
      BtnAudioTab: document.getElementById("".concat(namespace, "-audio")),
      BtnAudioTab2: document.getElementById("".concat(namespace, "-audio2")),
      BtnSpeedTab: document.getElementById("".concat(namespace, "-audio-speed")),
      BtnReadMode: document.getElementById("".concat(namespace, "-read-mode")),
      BtnFullscreen: document.getElementById("".concat(namespace, "-fullscreen")),
      PanelSign: document.getElementById("".concat(namespace, "-topbar-html-content-3"))
    };
  }

  var styles$5 = ".bigtext-html {\n  z-index: 99999999999;\n  height: 150px;\n  text-align: center;\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  border-top: 1px solid #505050;\n  /*&-content {\n      height: 100%;\n      background-color: #FFFFFF;\n      font-size: 53px;\n      color: #333 !important;\n      text-align: center;\n      font-weight: bold;\n  }*/\n  display: flex;\n}\n.bigtext-html ul {\n  list-style: none;\n}\n.bigtext-html a {\n  color: white;\n  text-decoration: none;\n  display: block;\n  line-height: 30px;\n  font-size: 18px;\n  letter-spacing: 5px;\n  width: auto;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 5px;\n  text-align: center;\n  clear: left;\n  margin: 0 0 10px 0;\n  cursor: pointer;\n  font-style: normal;\n  background: #199352;\n}\n.bigtext-html br {\n  display: block; /* makes it have a width */\n  content: \"\"; /* clears default height */\n  margin-top: 0; /* change this to whatever height you want it */\n}";

  var BigTextHtml$1 = function BigTextHtml(namespace) {
    return "<audio autoplay id='".concat(namespace, "-audio-media'>\n               <source src='' id='").concat(namespace, "-audio-source'>\n               <embed height=\"0\" width=\"0\"  src='' id='").concat(namespace, "-audio-embed'>\n        </audio>\n        ");
  };

  var styles$4 = ".bigtext-html {\n  z-index: 99999999999;\n  height: 150px;\n  text-align: center;\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  border-top: 1px solid #797F8D;\n  background: #484a4a;\n}\n.bigtext-html-content {\n  overflow: auto;\n  background-color: #dee0e0;\n  font-size: 45px !important;\n  line-height: 1.5;\n  padding: 0 10px;\n  text-align: left;\n  color: #333 !important;\n  width: 100%;\n  border: 4px solid;\n  border-radius: 9px;\n  margin: 0 auto;\n}\n.bigtext-html-btn {\n  width: 20px;\n  height: 20px;\n  background-color: red;\n  position: absolute;\n  right: 20px;\n  top: 20px;\n  border-radius: 10px;\n  color: #FFFFFF;\n  cursor: pointer;\n}\n.bigtext-html-bone {\n  width: 100%;\n  height: 151px;\n}\n.bigtext-html ul {\n  margin: 16px 8px;\n}\n.bigtext-html .panel-button {\n  width: 80px;\n  font-size: 18px !important;\n  background: rgba(0, 39, 102, 0.4);\n}\n.bigtext-html .pinyin-li {\n  list-style: none;\n}\n.bigtext-html .pinyin-li .pinyin {\n  font-size: inherit !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-bottom: 0 !important;\n  float: left;\n  line-height: 36%;\n  color: #000;\n  font-weight: 600 !important;\n  margin-left: 5px !important;\n}\n.bigtext-html .pinyin-li .pinyin b {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  flex-flow: column;\n  font-weight: 400;\n  font-style: normal;\n  padding: 0 5px 0 0;\n  position: relative;\n  z-index: 2;\n}\n.bigtext-html .pinyin-li .pinyin b > i:last-child::before {\n  content: \"\";\n  position: absolute;\n  width: 37px;\n  height: 1px;\n  z-index: 1;\n  left: 0;\n  bottom: 17.5px;\n  border-top: dashed 1px #a9a9a9;\n}\n.bigtext-html .pinyin-li .pinyin b > i:last-child::after {\n  content: \"\";\n  position: absolute;\n  width: 1px;\n  height: 37px;\n  z-index: 1;\n  left: 19px;\n  bottom: 0;\n  border-left: dashed 1px #a9a9a9;\n}\n.bigtext-html .pinyin-li .pinyin i {\n  text-align: center;\n  font-style: normal;\n}\n.bigtext-html .pinyin-li .pinyin b > i:first-child {\n  letter-spacing: 0.5px;\n  color: #000 !important;\n  font-size: 14pt !important;\n  font-weight: 400;\n  margin: 10px 0 2px 0;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.bigtext-html .pinyin-li .pinyin b > i:last-child {\n  margin: auto;\n  width: 37px;\n  height: 37px;\n  line-height: 37px;\n  font-size: 28pt !important;\n  position: relative;\n  z-index: 2;\n  border: solid 1px #a9a9a9 !important;\n  color: #000 !important;\n  font-family: \"fangsong\", KT, \"LiHei Pro Medium\";\n  font-weight: 600;\n}\n\n.bigtext-html-close {\n  font-style: normal;\n  user-select: none;\n}";

  var BigTextHtml = function BigTextHtml(namespace) {
    return "<div id='".concat(namespace, "-bigtext-html' class='bigtext-html'>\n           <div>\n               <ul>\n                   <li>\n                       <a class=\"panel-button\" id='").concat(namespace, "-fanti'>\u7E41\u4F53</a>\n                       <a class=\"panel-button\" id='").concat(namespace, "-pinyin'>\u62FC\u97F3</a>\n                       <a class=\"panel-button\" id='").concat(namespace, "-bigtext-close'>\u5173\u95ED</a>\n                   </li>\n               </ul>\n           </div>\n           <div id='").concat(namespace, "-bigtext-content' class='bigtext-html-content'></div>\n        </div>");
  };

  var BigTextBone = function BigTextBone() {
    return "<div class='bigtext-html-bone'></div>";
  };

  var BigText = {
    init: function init(core) {
      var namespace = core.config.namespace;
      this.body = document.body;
      this.namespace = namespace;
      core.creatStyle('bigtext-style', styles$4);
      core.creatHtml('bigtext-html', BigTextHtml);
      core.creatHtml('bigtext-bone', BigTextBone);
      this.isFantiOn = false;
      this.isPinyinOn = false;
      var script = document.createElement('script'); // script.src = 'https://keenbow.com/dl/target/js/pinyin-pro.js'

      script.src = 'https://cdn.bootcdn.net/ajax/libs/pinyin-pro/3.13.2/index.js';
      document.body.appendChild(script);
    },
    setEvents: function setEvents(core) {
      var _this = this;

      var namespace = core.config.namespace;
      addEvent(window, 'DOMContentLoaded', function () {
        if (cookie.get('bigtext', namespace)) {
          _this.show(core);
        }
      });
      this.toggleBigText(core, namespace);
    },
    addEventMove: function addEventMove() {
      addEvent(this.body, 'mouseover', this.mouseOver);
    },
    removeEventMove: function removeEventMove() {
      removeEvent(this.body, 'mouseover', this.mouseOver);
    },
    toggleBigText: function toggleBigText(core, namespace) {
      var _this2 = this;

      var tabBarBtn = document.getElementById("".concat(namespace, "-bigtext"));
      var tabBarBtnClose = document.getElementById("".concat(namespace, "-bigtext-close"));

      var fn = function fn() {
        var activeBtn = document.getElementById("".concat(namespace, "-bigtext-html"));

        if (activeBtn.style.display == 'block') {
          _this2.reset(core);

          Audio$1.playAudio(audioTabText.bigtextClose);
        } else {
          _this2.show(core);

          Audio$1.playAudio(audioTabText.bigtextOpen);
        }
      };

      tabBarBtn.onclick = function () {
        fn();
      };

      var tabBarBtn2 = document.getElementById("".concat(namespace, "-bigtext2"));

      tabBarBtn2.onclick = function () {
        fn();
      };

      document.body.addHotKey(["Control", "alt", "b"], function (el) {
        return fn();
      });

      tabBarBtnClose.onclick = function () {
        _this2.reset(core);

        Audio$1.playAudio(audioTabText.bigtextClose);
      };

      var btnFantiOn = document.getElementById("".concat(namespace, "-fanti"));

      btnFantiOn.onclick = function () {
        _this2.isFantiOn = !_this2.isFantiOn; //console.log('set isFantiOn', this.isFantiOn);
      };

      var btnPinyinOn = document.getElementById("".concat(namespace, "-pinyin"));

      btnPinyinOn.onclick = function () {
        _this2.isPinyinOn = !_this2.isPinyinOn;
      };
    },
    mouseOver: function mouseOver(event) {
      LOG.debug('------ ignoreMouse', Audio$1.core.ignoreMouse);

      if (Audio$1.core.ignoreMouse) {
        return;
      }

      var event = window.event || event;
      var target = event.target || event.srcElement;

      if (target && target.id == 'keenbow-barrier-free-bigtext-content') {
        return;
      }

      var isValidEl = false;

      try {
        var validOrNot = function validOrNot() {
          //console.log('parentElement', target, target.parentElement)
          if (['a'].includes(target.parentElement.tagName.toLowerCase())) {
            target = target.parentElement;
            isValidEl = true;
            return;
          } // LOG.debug('nodeType', target, target.tagName, target.childNodes[0])
          // console.log('getAttribute', target.getAttribute, target.getAttribute('aria-label'))


          if (['img', 'a'].includes(target.tagName.toLowerCase()) || target.getAttribute && target.getAttribute('aria-label')) {
            isValidEl = true;
          } else {
            // LOG.debug('nodeType childNodes 0', target.childNodes[0].nodeType)
            if (target.childNodes && target.childNodes[0] && 3 === target.childNodes[0].nodeType) {
              var _text = target.childNodes[0].textContent;
              _text = _text.trim();
              LOG.debug('[a] text', _text, _text.length);

              if (_text.length > 0 && _text.length < 50000) {
                // console.log('== set target', target)
                target = target.childNodes[0]; // console.log('== set target', target)

                isValidEl = true;
              }
            }
          }
        }; //validOrNot()


        target = Tools.getValidEl(target); //console.log('validOrNot', isValidEl, target)
      } catch (e) {
      } // if (!isValidEl) {


      if (!target) {
        return;
      }

      var namespace = BigText.namespace;
      var __parentNodeId = target.parentNode.id;

      var __isAssist = __parentNodeId.indexOf(namespace) > -1;

      var activeBtn = document.getElementById("".concat(namespace, "-bigtext-content"));
      var text = parseTagText(target).replace(symbolsReg, '');
      text = text.replace(/\s*/g, "");

      if (text == '' || text == '文本：') {
        return;
      }

      var isFantiOn = BigText.isFantiOn,
          isPinyinOn = BigText.isPinyinOn; //console.log('isFantiOn', isFantiOn);

      if (isFantiOn) {
        text = Tools.toTraditionalChinese(text);
      }

      var genePinyinHtml = function genePinyinHtml(arr) {
        var content = arr.map(function (item) {
          return "<div class=\"pinyin\"><b><i>".concat(item.yin, "</i><i>").concat(item.zi, "</i></b></div>");
        }).join('');
        return "<li class=\"pinyin-li\" >".concat(content, "</li>");
      };

      if (isPinyinOn) {
        var yinArr = window.pinyinPro.pinyin(text, {
          type: 'array'
        });
        var arr = text.split('').map(function (zi, index) {
          return {
            yin: yinArr[index],
            zi: zi
          };
        });
        LOG.debug('set panel text ', yinArr, text.length, text); //console.log('demo ', '问 本', pinyin('问 本', {type: 'array'}));
        //activeBtn.innerText = text;

        text = genePinyinHtml(arr);
      }

      activeBtn.innerHTML = text;

      if (__isAssist || activeBtn.innerText == '文本：') {
        //activeBtn.innerText = ''
        LOG.debug('innerText clear', __isAssist, activeBtn.innerText == '文本：');
        return;
      }
    },
    mouseOverTarget: function mouseOverTarget(target) {
      //console.log('----------big mouseOverTarget', target);
      var namespace = BigText.namespace;
      var __parentNodeId = target.parentNode.id;

      var __isAssist = __parentNodeId.indexOf(namespace) > -1;

      var activeBtn = document.getElementById("".concat(namespace, "-bigtext-content"));
      var text = parseTagText(target).replace(symbolsReg, '');
      text = text.replace(/\s*/g, "");
      var isFantiOn = BigText.isFantiOn,
          isPinyinOn = BigText.isPinyinOn; //console.log('isFantiOn', isFantiOn);

      if (isFantiOn) {
        text = Tools.toTraditionalChinese(text);
      }

      var genePinyinHtml = function genePinyinHtml(arr) {
        var content = arr.map(function (item) {
          return "<div class=\"pinyin\"><b><i>".concat(item.yin, "</i><i>").concat(item.zi, "</i></b></div>");
        }).join('');
        return "<li class=\"pinyin-li\" >".concat(content, "</li>");
      };

      if (isPinyinOn) {
        var yinArr = window.pinyinPro.pinyin(text, {
          type: 'array'
        });
        var arr = text.split('').map(function (zi, index) {
          return {
            yin: yinArr[index],
            zi: zi
          };
        });
        LOG.debug('set panel text ', yinArr, text.length, text); //console.log('demo ', '问 本', pinyin('问 本', {type: 'array'}));
        //activeBtn.innerText = text;

        text = genePinyinHtml(arr);
      }

      activeBtn.innerHTML = text;

      if (__isAssist || activeBtn.innerText == '文本') {
        //activeBtn.innerText = ''
        LOG.debug('innerText clear', __isAssist, activeBtn.innerText == '文本');
        return;
      }
    },
    show: function show(core) {
      var namespace = core.config.namespace;
      var activeBtn = document.getElementById("".concat(namespace, "-bigtext-html"));
      var tabBar = document.getElementById("".concat(namespace, "-bigtext-bone"));
      activeBtn.style.display = 'block';
      tabBar.style.display = 'block';
      this.addEventMove();
      cookie.set('bigtext', true, namespace);
      core.message.publish('bigTextState', true);
    },
    reset: function reset(core) {
      var namespace = core.config.namespace;
      var activeBtn = document.getElementById("".concat(namespace, "-bigtext-html"));
      var tabBar = document.getElementById("".concat(namespace, "-bigtext-bone"));
      activeBtn.style.display = 'none';
      tabBar.style.display = 'none';
      this.removeEventMove();
      cookie.set('bigtext', false, namespace);
      core.message.publish('bigTextState', false);
    }
  };

  var quot = /"/g;
  var replace$3 = functionUncurryThis(''.replace);

  // `CreateHTML` abstract operation
  // https://tc39.es/ecma262/#sec-createhtml
  var createHtml = function (string, tag, attribute, value) {
    var S = toString_1(requireObjectCoercible(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + replace$3(toString_1(value), quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };

  // check the existence of a method, lowercase
  // of a tag and escaping quotes in arguments
  var stringHtmlForced = function (METHOD_NAME) {
    return fails(function () {
      var test = ''[METHOD_NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    });
  };

  // `String.prototype.fixed` method
  // https://tc39.es/ecma262/#sec-string.prototype.fixed
  _export({ target: 'String', proto: true, forced: stringHtmlForced('fixed') }, {
    fixed: function fixed() {
      return createHtml(this, 'tt', '', '');
    }
  });

  var $RangeError$2 = RangeError;

  // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  var stringRepeat = function repeat(count) {
    var str = toString_1(requireObjectCoercible(this));
    var result = '';
    var n = toIntegerOrInfinity(count);
    if (n < 0 || n == Infinity) throw $RangeError$2('Wrong number of repetitions');
    for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
    return result;
  };

  // `String.prototype.repeat` method
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  _export({ target: 'String', proto: true }, {
    repeat: stringRepeat
  });

  var stylesSH = ".topbar-html {\n  width: 100%;\n  overflow: hidden;\n  z-index: 2147483645;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n}\n.topbar-html-mright {\n  margin-right: 50px !important;\n}\n.topbar-html-margin0 {\n  margin: 0 !important;\n}\n.topbar-html-content {\n  width: 100%;\n  height: 100px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: center;\n}\n.topbar-html-content-item {\n  cursor: pointer;\n  margin: 0 6px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.topbar-html-content-item span {\n  height: 30px;\n  line-height: 30px;\n  color: #FFFFFF;\n  font-size: 16px;\n  font-weight: 500;\n  font-family: PingFangSC-Medium;\n}\n.topbar-html-content-item img {\n  height: 52px;\n  width: 52px;\n  border-radius: 5px;\n  display: block;\n}\n\n.util-bar {\n  text-align: center;\n}\n.util-bar ul {\n  padding-top: 12px;\n  padding-bottom: 10px;\n  display: inline-block;\n}\n.util-bar li:first-child {\n  border-style: none;\n}\n.util-bar li {\n  list-style: none;\n  float: left;\n  border: 0px #64ace7;\n  border-style: none none none solid;\n  user-select: none;\n  background-repeat: no-repeat;\n  width: 62px;\n  height: 74px;\n  margin-left: 4px;\n  margin-right: 4px;\n}\n.util-bar li:hover {\n  cursor: pointer;\n}\n.util-bar img {\n  height: 32px;\n  width: 1px;\n  margin-bottom: 6px;\n}\n.util-bar span {\n  display: block;\n  color: white;\n  padding-top: 47px;\n}\n\n.util-bar2 {\n  display: none;\n  width: 100%;\n  position: absolute;\n}\n.util-bar2 .textSpan {\n  float: left;\n  margin-left: 6px;\n  cursor: pointer;\n  padding-top: 5px;\n}\n.util-bar2 .textSpan span {\n  margin: 0px;\n  float: none;\n  vertical-align: middle;\n}\n.util-bar2 .textStr {\n  letter-spacing: 1px;\n  /* display: block; */\n  cursor: pointer;\n  line-height: 45px;\n  overflow: hidden;\n  height: 35px;\n  font-weight: bold;\n  font-size: 15px !important;\n  clear: both;\n  margin-top: -10px !important;\n}\n.util-bar2 .textNum {\n  color: #ff9027;\n  font-size: 15px !important;\n  font-weight: 600;\n  font-family: \"SourceHanSansCN-Regular\";\n}\n.util-bar2 .textKey {\n  cursor: pointer;\n  display: block;\n  font-size: 18px !important;\n  line-height: 10px;\n  height: 21px;\n  clear: both;\n  padding-top: 8px;\n  font-family: Microsoft YaHei !important;\n}\n.util-bar2 .util-bar2-ul span {\n  display: inline;\n}\n.util-bar2 .util-bar2-ul li {\n  padding-top: 0;\n  padding-bottom: 0;\n  border: none;\n}\n.util-bar2 .util-bar2-ul li:hover {\n  background: unset;\n}\n\n.util-bar3 {\n  display: none;\n  width: 100%;\n  position: absolute;\n}\n\ntitle {\n  background: yellow;\n}\n\n#keenbow-barrier-free * {\n  font-size: 14px;\n}\n#keenbow-barrier-free * .bigtext-html-content {\n  font-size: 32pt;\n  line-height: 39pt;\n}\n\n.barrier-free .barrier-free-active {\n  outline: rgba(255, 0, 0, 0.84) solid 2px;\n  outline-offset: 0;\n  border-radius: 2px;\n}";

  var img = "data:image/png;base64,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zqfSS//Ml/aP1qv035r7PPbUcXv2mevvtdvP5awx199rt9+jctZUvfqRjmPuadpmnfSv7KlZ+Vf21Mt2xqv91k/Op9JL/8yX9o/Wq/Tfmvs89tRxe/aZ6++128/lrDHX32u336Ny1lS9+pGOY+5p2mad9K/sqVn5V/bUy3bGq/3WT86n0kv/zJf2j9ar9N+a+zz21HF79pnr77Xbz+WsMdffa7cf5TqBvsr5r//673/WQ/+zI+Yd9Z9//jlfMF1X+Z5NOo6Rv+vvjc8cV+ulfrZ38+3GXz2e1Kvau+Pfjc/xXa2X+tnezbcbf/V4Uq9q745/Nz7Hd7Ve6md7N99u/NXjSb2qvTv+3fgc39V6qZ/t3Xy78VePJ/Wq9u74d+NzfFfrpX62d/Ptxl89ntSr2rvj343P8V2tl/rZ3s23G3/1eFKvau+Ofzc+x3e1XupnezffbvzV40m9qr07/t34HN/Veqmf7d18u/FXjyf1qvbu+Hfjc3xX66V+tnfz7cZfPZ7Uq9q749+Nz/FdrZf62d7Ntxt/9XhSr2rvjn83Psd3tV7qZ3s332781eNJvaq9O/7d+Bzf1Xqpn+3dfLvxV48n9ar27vh343N8V+ulfrZ38+3GXz2e1Kvau+Pfjc/xXa2X+tnezbcbn+NR+3vXzu5pPXvf//nf/+u805XF4Isfbe3c3lRf3dlX/Z3rUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3nUbmqt+r/KK/7V/VW/Z3n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";

  var ImgFiles$1 = {
    box: '/top/box.png',
    boxH: '/top/box-h.png',
    repeat: '/top/repeat.png',
    repeatH: '/top/repeat-h.png',
    signSpeed: '/top/sign-speed.png',
    signSpeedH: '/top/sign-speed-h.png',
    returnmain: '/top/returnmain.png',
    returnmainH: '/top/returnmain-h.png',
    readScreen: '/top/read-screen.png',
    readScreenH: '/top/read-screen-h.png',
    voice: '/top/voice.png',
    voiceH: '/top/voice-h.png',
    voiceOff: '/top/voiceoff.png',
    voiceOffH: '/top/voiceoff-h.png',
    readSpeednormal: '/top/read-speed-normal.png',
    readSpeednormalH: '/top/read-speed-normal-h.png',
    readSpeedhigh: '/top/read-speed-high.png',
    readSpeedhighH: '/top/read-speed-high-h.png',
    readSpeedlow: '/top/read-speed-low.png',
    readSpeedlowH: '/top/read-speed-low-h.png',
    readMode: '/top/read-mode.png',
    readModeH: '/top/read-mode-h.png',
    readMode2: '/top/read-mode2.png',
    readMode2H: '/top/read-mode2-h.png',
    color: '/top/color.png',
    colorH: '/top/color-h.png',
    zoomIn: '/top/zoom-in.png',
    zoomInH: '/top/zoom-in-h.png',
    zoomOut: '/top/zoom-out.png',
    zoomOutH: '/top/zoom-out-h.png',
    cursor: '/top/cursor.png',
    cursorH: '/top/cursor-h.png',
    crossLine: '/top/cross-line.png',
    crossLineH: '/top/cross-line-h.png',
    panel: '/top/panel.png',
    panelH: '/top/panel-h.png',
    sign: '/top/sign.png',
    signH: '/top/sign-h.png',
    reset: '/top/reset.png',
    resetH: '/top/reset-h.png',
    fixed: '/top/fixed.png',
    fixedH: '/top/fixed-h.png',
    help: '/top/help.png',
    helpH: '/top/help-h.png',
    exit: '/top/exit.png',
    exitH: '/top/exit-h.png'
  };
  var Imgs$1 = {
    box: function box() {
      return GVal.baseUrl + ImgFiles$1.box;
    },
    boxH: function boxH() {
      return GVal.baseUrl + ImgFiles$1.boxH;
    },
    repeat: function repeat() {
      return GVal.baseUrl + ImgFiles$1.repeat;
    },
    repeatH: function repeatH() {
      return GVal.baseUrl + ImgFiles$1.repeatH;
    },
    signSpeed: function signSpeed() {
      return GVal.baseUrl + ImgFiles$1.signSpeed;
    },
    signSpeedH: function signSpeedH() {
      return GVal.baseUrl + ImgFiles$1.signSpeedH;
    },
    returnmain: function returnmain() {
      return GVal.baseUrl + ImgFiles$1.returnmain;
    },
    returnmainH: function returnmainH() {
      return GVal.baseUrl + ImgFiles$1.returnmainH;
    },
    readScreen: function readScreen() {
      return GVal.baseUrl + ImgFiles$1.readScreen;
    },
    readScreenH: function readScreenH() {
      return GVal.baseUrl + ImgFiles$1.readScreenH;
    },
    voice: function voice() {
      return GVal.baseUrl + ImgFiles$1.voice;
    },
    voiceH: function voiceH() {
      return GVal.baseUrl + ImgFiles$1.voiceH;
    },
    voiceOff: function voiceOff() {
      return GVal.baseUrl + ImgFiles$1.voiceOff;
    },
    voiceOffH: function voiceOffH() {
      return GVal.baseUrl + ImgFiles$1.voiceOffH;
    },
    readSpeednormal: function readSpeednormal() {
      return GVal.baseUrl + ImgFiles$1.readSpeednormal;
    },
    readSpeednormalH: function readSpeednormalH() {
      return GVal.baseUrl + ImgFiles$1.readSpeednormalH;
    },
    readSpeedhigh: function readSpeedhigh() {
      return GVal.baseUrl + ImgFiles$1.readSpeedhigh;
    },
    readSpeedhighH: function readSpeedhighH() {
      return GVal.baseUrl + ImgFiles$1.readSpeedhighH;
    },
    readSpeedlow: function readSpeedlow() {
      return GVal.baseUrl + ImgFiles$1.readSpeedlow;
    },
    readSpeedlowH: function readSpeedlowH() {
      return GVal.baseUrl + ImgFiles$1.readSpeedlowH;
    },
    readMode: function readMode() {
      return GVal.baseUrl + ImgFiles$1.readMode;
    },
    readModeH: function readModeH() {
      return GVal.baseUrl + ImgFiles$1.readModeH;
    },
    readMode2: function readMode2() {
      return GVal.baseUrl + ImgFiles$1.readMode2;
    },
    readMode2H: function readMode2H() {
      return GVal.baseUrl + ImgFiles$1.readMode2H;
    },
    color: function color() {
      return GVal.baseUrl + ImgFiles$1.color;
    },
    colorH: function colorH() {
      return GVal.baseUrl + ImgFiles$1.colorH;
    },
    zoomIn: function zoomIn() {
      return GVal.baseUrl + ImgFiles$1.zoomIn;
    },
    zoomInH: function zoomInH() {
      return GVal.baseUrl + ImgFiles$1.zoomInH;
    },
    zoomOut: function zoomOut() {
      return GVal.baseUrl + ImgFiles$1.zoomOut;
    },
    zoomOutH: function zoomOutH() {
      return GVal.baseUrl + ImgFiles$1.zoomOutH;
    },
    cursor: function cursor() {
      return GVal.baseUrl + ImgFiles$1.cursor;
    },
    cursorH: function cursorH() {
      return GVal.baseUrl + ImgFiles$1.cursorH;
    },
    crossLine: function crossLine() {
      return GVal.baseUrl + ImgFiles$1.crossLine;
    },
    crossLineH: function crossLineH() {
      return GVal.baseUrl + ImgFiles$1.crossLineH;
    },
    panel: function panel() {
      return GVal.baseUrl + ImgFiles$1.panel;
    },
    panelH: function panelH() {
      return GVal.baseUrl + ImgFiles$1.panelH;
    },
    sign: function sign() {
      return GVal.baseUrl + ImgFiles$1.sign;
    },
    signH: function signH() {
      return GVal.baseUrl + ImgFiles$1.signH;
    },
    reset: function reset() {
      return GVal.baseUrl + ImgFiles$1.reset;
    },
    resetH: function resetH() {
      return GVal.baseUrl + ImgFiles$1.resetH;
    },
    fixed: function fixed() {
      return GVal.baseUrl + ImgFiles$1.fixed;
    },
    fixedH: function fixedH() {
      return GVal.baseUrl + ImgFiles$1.fixedH;
    },
    help: function help() {
      return GVal.baseUrl + ImgFiles$1.help;
    },
    helpH: function helpH() {
      return GVal.baseUrl + ImgFiles$1.helpH;
    },
    exit: function exit() {
      return GVal.baseUrl + ImgFiles$1.exit;
    },
    exitH: function exitH() {
      return GVal.baseUrl + ImgFiles$1.exitH;
    }
  };

  var utilHtml = function utilHtml(namespace) {
    return "\n<div class=\"util-bar\" id='".concat(namespace, "-topbar-html-content'>\n    <div class=\"util-bar2\" id='").concat(namespace, "-topbar-html-content-2'>\n        <ul class=\"util-bar2-ul\">\n            <li data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-window-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u89C6\u7A97\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n            <li title=\"xx\"\n            data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-navigation-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u5BFC\u822A\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n            <li data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-interact-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u4EA4\u4E92\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n            <li data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-service-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u670D\u52A1\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n            <li data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-list-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u5217\u8868\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n            <li data-state=0 data-img-0='").concat(Imgs$1.box(), "' data-img-0-h='").concat(Imgs$1.boxH(), "'>\n                <span class=\"textSpan textShow\" id='").concat(namespace, "-topbar-main-btn'>\n                    <p class=\"textKey textShow\"><span id=\"navNum\" class=\"textNum value\">0</span</p>\n                    <p class=\"textShow\">\n                        <span class=\"textStr textShow\">\u6B63\u6587\u533A</span>\n                    </p>\n                </span>\n                <div style=\"\n                    position: relative;\n                    background: #2e3030a8;\n                    width: 100%;\n                    height: 100%;\n                \"></div>\n            </li>\n        </ul>\n        <ul>\n            <li id='").concat(namespace, "-read-screen2' title=\"\u8BFB\u5C4F\u4E13\u7528\"\n            data-state=0 data-img-0='").concat(Imgs$1.readScreen(), "' data-img-0-h='").concat(Imgs$1.readScreenH(), "'>\n            <span>\u8BFB\u5C4F\u4E13\u7528</span>\n            </li>\n            <li id='").concat(namespace, "-audio2' title='").concat(utilLabel.audioBtn$offtitle, "'\n            data-state=0 data-img-0='").concat(Imgs$1.voice(), "' data-img-0-h='").concat(Imgs$1.voiceH(), "'  data-img-1='").concat(Imgs$1.voiceOff(), "' data-img-1-h='").concat(Imgs$1.voiceOffH(), "' >\n            <span>\u58F0\u97F3\u5F00\u5173</span>\n            </li>\n            <li id='").concat(namespace, "-bigtext2' title=\"\u5207\u6362\u663E\u793A\u5C4F\"\n            data-state=0 data-img-0='").concat(Imgs$1.panel(), "' data-img-0-h='").concat(Imgs$1.panelH(), "'>\n            <span>\u5927\u5B57\u5E55</span>\n            </li>\n            <li id='").concat(namespace, "-reset2' title=\"").concat(utilLabel.BtnReset$title, "\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.reset(), "' data-img-0-h='").concat(Imgs$1.resetH(), "'>\n                <span>\u91CD\u7F6E</span>\n            </li>\n            <li id='").concat(namespace, "-fixed2' title=\"\u56FA\u5B9A\u6216\u8005\u9690\u85CF\u5DE5\u5177\u680F\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.fixed(), "' data-img-0-h='").concat(Imgs$1.fixedH(), "'>\n                <span>\u56FA\u5B9A</span>\n            </li>\n            <li id='").concat(namespace, "-help2' title=\"\u5F00\u542F\u5E2E\u52A9\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.help(), "' data-img-0-h='").concat(Imgs$1.helpH(), "'>\n                <span>\u8BF4\u660E</span>\n            </li>\n            <li id='").concat(namespace, "-close2' title=\"\u5173\u95ED\u8F85\u52A9\u5DE5\u5177\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.exit(), "' data-img-0-h='").concat(Imgs$1.exitH(), "'>\n                <span>\u9000\u51FA\u670D\u52A1</span>\n            </li>\n        </ul>\n    </div>\n\n\n    <div class=\"util-bar3\" id='").concat(namespace, "-topbar-html-content-3'>\n        <ul style=\"margin-left: 560px\">\n            <li id='").concat(namespace, "-repeat' title=\"\u91CD\u64AD\" data-state=0 data-img-0='").concat(Imgs$1.repeat(), "' data-img-0-h='").concat(Imgs$1.repeatH(), "'>\n                <span class=\"sign-ignore\">\u91CD\u64AD</span>\n            </li>\n            <li id='").concat(namespace, "-sign-speed' title=\"\u624B\u901F\" data-state=0 data-img-0='").concat(Imgs$1.signSpeed(), "' data-img-0-h='").concat(Imgs$1.signSpeedH(), "'>\n                <span>\u624B\u901F</span>\n                <span id='").concat(namespace, "-sign-speed-value' style=\"position: relative;font-size: 12px;top: -95px\">1.0</span>\n            </li>\n            <li id='").concat(namespace, "-returnmain' title=\"\u8FD4\u56DE\" data-state=0 data-img-0='").concat(Imgs$1.returnmain(), "' data-img-0-h='").concat(Imgs$1.returnmainH(), "'>\n                <span>\u8FD4\u56DE</span>\n            </li>\n            <li id='").concat(namespace, "-reset3' title=\"").concat(utilLabel.BtnReset$title, "\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.reset(), "' data-img-0-h='").concat(Imgs$1.resetH(), "'>\n                <span>\u91CD\u7F6E</span>\n            </li>\n            <li id='").concat(namespace, "-fixed3' title=\"\u56FA\u5B9A\u6216\u8005\u9690\u85CF\u5DE5\u5177\u680F\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.fixed(), "' data-img-0-h='").concat(Imgs$1.fixedH(), "'>\n                <span>\u56FA\u5B9A</span>\n            </li>\n            <li id='").concat(namespace, "-help3' title=\"\u5F00\u542F\u5E2E\u52A9\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.help(), "' data-img-0-h='").concat(Imgs$1.helpH(), "'>\n                <span>\u8BF4\u660E</span>\n            </li>\n            <li id='").concat(namespace, "-close3' title=\"\u5173\u95ED\u8F85\u52A9\u5DE5\u5177\" data-img-y=\"4px\"\n                data-state=0 data-img-0='").concat(Imgs$1.exit(), "' data-img-0-h='").concat(Imgs$1.exitH(), "'>\n                <span>\u9000\u51FA\u670D\u52A1</span>\n            </li>\n        </ul>\n    </div>\n    <ul id='").concat(namespace, "-topbar-html-content-1'>    \n        <li id='").concat(namespace, "-read-screen' title=\"\u8BFB\u5C4F\u4E13\u7528\"\n            data-state=0 data-img-0='").concat(Imgs$1.readScreen(), "' data-img-0-h='").concat(Imgs$1.readScreenH(), "'>\n            <span>\u8BFB\u5C4F\u4E13\u7528</span>\n        </li>\n        <li id='").concat(namespace, "-audio' title='").concat(utilLabel.audioBtn$offtitle, "'\n            data-state=0 data-img-0='").concat(Imgs$1.voice(), "' data-img-0-h='").concat(Imgs$1.voiceH(), "'  data-img-1='").concat(Imgs$1.voiceOff(), "' data-img-1-h='").concat(Imgs$1.voiceOffH(), "' >\n            <span>\u58F0\u97F3\u5F00\u5173</span>\n        </li>\n        <li id='").concat(namespace, "-audio-speed' title='").concat(utilLabel.speedTab$mode0title, "'\n            data-state=0 data-img-0='").concat(Imgs$1.readSpeednormal(), "' data-img-0-h='").concat(Imgs$1.readSpeednormalH(), "' \n            data-img-1='").concat(Imgs$1.readSpeedhigh(), "' data-img-1-h='").concat(Imgs$1.readSpeedhighH(), "' \n              data-img-2='").concat(Imgs$1.readSpeedlow(), "' data-img-2-h='").concat(Imgs$1.readSpeedlowH(), "' >\n            <span>\u8BED\u901F</span>\n        </li>\n        <li id='").concat(namespace, "-read-mode' title=\"\u5F53\u524D\u4E3A\u6307\u8BFB\u6A21\u5F0F\uFF0C\u5207\u6362\u9605\u8BFB\u65B9\u5F0F\"\n            data-state=0 data-img-0='").concat(Imgs$1.readMode(), "' data-img-0-h='").concat(Imgs$1.readModeH(), "'\n              data-img-1='").concat(Imgs$1.readMode2(), "' data-img-1-h='").concat(Imgs$1.readMode2H(), "'>\n            <span>\u9605\u8BFB\u65B9\u5F0F</span>\n        </li>\n        <li id='").concat(namespace, "-change-color' title=\"\u5207\u6362\u914D\u8272\"\n            data-state=0 data-img-0='").concat(Imgs$1.color(), "' data-img-0-h='").concat(Imgs$1.colorH(), "'\n              data-img-1='").concat(Imgs$1.color(), "' data-img-1-h='").concat(Imgs$1.colorH(), "'>\n            <span>\u914D\u8272</span>\n        </li>\n        <li id='").concat(namespace, "-zoom-out' title=\"\u7F51\u9875\u653E\u5927\"\n            data-state=0 data-img-0='").concat(Imgs$1.zoomIn(), "' data-img-0-h='").concat(Imgs$1.zoomInH(), "'>\n            <span>\u653E\u5927</span>\n        </li>\n        <li id='").concat(namespace, "-zoom-min' title=\"\u7F51\u9875\u7F29\u5C0F\"\n            data-state=0 data-img-0='").concat(Imgs$1.zoomOut(), "' data-img-0-h='").concat(Imgs$1.zoomOutH(), "'>\n            <span>\u7F29\u5C0F</span>\n        </li>\n        <li id='").concat(namespace, "-cursor-auto' title=\"\u5207\u6362\u9F20\u6807\u6837\u5F0F\"\n            data-state=0 data-img-0='").concat(Imgs$1.cursor(), "' data-img-0-h='").concat(Imgs$1.cursorH(), "'>\n            <span>\u9F20\u6807\u6837\u5F0F</span>\n        </li>\n        <li id='").concat(namespace, "-pointer-follow' title=\"\u5F53\u524D\u5341\u5B57\u5149\u6807\u5DF2\u5173\u95ED\uFF0C\u5F00\u542F\u5341\u5B57\u5149\u6807\"\n            data-state=0 data-img-0='").concat(Imgs$1.crossLine(), "' data-img-0-h='").concat(Imgs$1.crossLineH(), "'>\n            <span>\u5341\u5B57\u7EBF</span>\n        </li>\n        <li id='").concat(namespace, "-bigtext' title=\"\u5207\u6362\u663E\u793A\u5C4F\"\n            data-state=0 data-img-0='").concat(Imgs$1.panel(), "' data-img-0-h='").concat(Imgs$1.panelH(), "'>\n            <span>\u5927\u5B57\u5E55</span>\n        </li>\n        <li id='").concat(namespace, "-sign' title=\"\u624B\u8BED\u8BBE\u7F6E\"\n            data-state=0 data-img-0='").concat(Imgs$1.sign(), "' data-img-0-h='").concat(Imgs$1.signH(), "'>\n            <span>\u624B\u8BED\u8BBE\u7F6E</span>\n        </li>\n        <li id='").concat(namespace, "-reset' title=\"").concat(utilLabel.BtnReset$title, "\" data-img-y=\"4px\"\n            data-state=0 data-img-0='").concat(Imgs$1.reset(), "' data-img-0-h='").concat(Imgs$1.resetH(), "'>\n            <span>\u91CD\u7F6E</span>\n        </li>\n        <li id='").concat(namespace, "-fixed' title=\"\u56FA\u5B9A\u6216\u8005\u9690\u85CF\u5DE5\u5177\u680F\" data-img-y=\"4px\"\n            data-state=0 data-img-0='").concat(Imgs$1.fixed(), "' data-img-0-h='").concat(Imgs$1.fixedH(), "' data-img-1='").concat(Imgs$1.fixed(), "' data-img-1-h='").concat(Imgs$1.fixedH(), "'>\n            <span>\u56FA\u5B9A</span>\n        </li>\n        <li id='").concat(namespace, "-help' title=\"\u5F00\u542F\u5E2E\u52A9\" data-img-y=\"4px\"\n            data-state=0 data-img-0='").concat(Imgs$1.help(), "' data-img-0-h='").concat(Imgs$1.helpH(), "'>\n            <span>\u8BF4\u660E</span>\n        </li>\n        <li id='").concat(namespace, "-close' title=\"\u5173\u95ED\u8F85\u52A9\u5DE5\u5177\" data-img-y=\"4px\"\n            data-state=0 data-img-0='").concat(Imgs$1.exit(), "' data-img-0-h='").concat(Imgs$1.exitH(), "'>\n            <span>\u9000\u51FA\u670D\u52A1</span>\n        </li>\n    </ul>\n\n\n</div>\n");
  };

  var DomHandler = {
    init: function init(namespace) {
      this.elems = GetUtilElements(namespace); // this.elems = DomHandler.elements(namespace)
      // console.log('this.elems', this.elems)

      var toolbar = document.getElementById("".concat(namespace, "-topbar-html"));
      toolbar.style.background = 'black';
      toolbar.style.backgroundImage = "url(".concat(img, ")");
      var lis = document.getElementById("".concat(namespace, "-topbar-html-content")).getElementsByTagName('li'); // console.log('lis', [...lis]);

      _toConsumableArray(lis).forEach(function (each) {
        try {
          Tools.setBaseImg(each);

          each.onmouseover = function (e) {
            Tools.setHoverImg(each);
          };

          each.onmouseleave = function (e) {
            Tools.setBaseImg(each);
          };
        } catch (e) {
        }
      });
    },
    offAudio: function offAudio() {
      setBtnImgState(this.elems.BtnAudioTab, '1');
      setBtnImgState(this.elems.BtnAudioTab2, '1'); // Tools.setBtnImgState(this.audioBtn2, 'off');
    },
    onAudio: function onAudio() {
      setBtnImgState(this.elems.BtnAudioTab, '0');
      setBtnImgState(this.elems.BtnAudioTab2, '0'); // Tools.setBtnImgState(this.audioBtn2, 'off');
    },
    normalSpeed: function normalSpeed() {
      setBtnImgState(this.elems.BtnSpeedTab, 0);
      this.elems.BtnSpeedTab.title = utilLabel.speedTab$mode0title;
    },
    highSpeed: function highSpeed() {
      setBtnImgState(this.elems.BtnSpeedTab, 1);
      this.elems.BtnSpeedTab.title = utilLabel.speedTab$mode1title;
    },
    lowSpeed: function lowSpeed() {
      setBtnImgState(this.elems.BtnSpeedTab, 2);
      this.elems.BtnSpeedTab.title = utilLabel.speedTab$mode2title;
    },
    setReadMode0: function setReadMode0() {
      setBtnImgState(this.elems.BtnReadMode, 0);
      this.elems.BtnReadMode.title = utilLabel.BtnReadMode$mode0title;
    },
    setReadMode1: function setReadMode1() {
      setBtnImgState(this.elems.BtnReadMode, 1);
      this.elems.BtnReadMode.title = utilLabel.BtnReadMode$mode1title;
    }
  };

  function setBtnImgState(btn, state) {
    btn.setAttribute("data-state", state); // Tools.setHoverImg(btn);

    Tools.setBaseImg(btn);
  }

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var nativeUrl = !fails(function () {
    // eslint-disable-next-line unicorn/relative-url-style -- required for testing
    var url = new URL('b?a=1&b=2&c=3', 'http://a');
    var searchParams = url.searchParams;
    var result = '';
    url.pathname = 'c%20d';
    searchParams.forEach(function (value, key) {
      searchParams['delete']('b');
      result += key + value;
    });
    return (isPure && !url.toJSON)
      || !searchParams.sort
      || url.href !== 'http://a/c%20d?a=1&c=3'
      || searchParams.get('c') !== '3'
      || String(new URLSearchParams('?a=1')) !== 'a=1'
      || !searchParams[ITERATOR$1]
      // throws in Edge
      || new URL('https://a@b').username !== 'a'
      || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
      // not punycoded in Edge
      || new URL('http://тест').host !== 'xn--e1aybc'
      // not escaped in Chrome 62-
      || new URL('http://a#б').hash !== '#%D0%B1'
      // fails in Chrome 66-
      || result !== 'a1c3'
      // throws in Safari
      || new URL('http://x', undefined).host !== 'x';
  });

  var defineBuiltInAccessor = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn_1(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn_1(descriptor.set, name, { setter: true });
    return objectDefineProperty.f(target, name, descriptor);
  };

  // eslint-disable-next-line es-x/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  var defineProperty = Object.defineProperty;
  var concat = functionUncurryThis([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es-x/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || functionCall(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js


  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  var baseMinusTMin = base - tMin;

  var $RangeError$1 = RangeError;
  var exec$1 = functionUncurryThis(regexSeparators.exec);
  var floor$2 = Math.floor;
  var fromCharCode = String.fromCharCode;
  var charCodeAt = functionUncurryThis(''.charCodeAt);
  var join$2 = functionUncurryThis([].join);
  var push$2 = functionUncurryThis([].push);
  var replace$2 = functionUncurryThis(''.replace);
  var split$2 = functionUncurryThis(''.split);
  var toLowerCase$1 = functionUncurryThis(''.toLowerCase);

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   */
  var ucs2decode = function (string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = charCodeAt(string, counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // It's a high surrogate, and there is a next character.
        var extra = charCodeAt(string, counter++);
        if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
          push$2(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // It's an unmatched surrogate; only append this code unit, in case the
          // next code unit is the high surrogate of a surrogate pair.
          push$2(output, value);
          counter--;
        }
      } else {
        push$2(output, value);
      }
    }
    return output;
  };

  /**
   * Converts a digit/integer into a basic code point.
   */
  var digitToBasic = function (digit) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   */
  var adapt = function (delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$2(delta / damp) : delta >> 1;
    delta += floor$2(delta / numPoints);
    while (delta > baseMinusTMin * tMax >> 1) {
      delta = floor$2(delta / baseMinusTMin);
      k += base;
    }
    return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   */
  var encode = function (input) {
    var output = [];

    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);

    // Cache the length.
    var inputLength = input.length;

    // Initialize the state.
    var n = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;

    // Handle the basic code points.
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < 0x80) {
        push$2(output, fromCharCode(currentValue));
      }
    }

    var basicLength = output.length; // number of basic code points.
    var handledCPCount = basicLength; // number of code points that have been handled;

    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
      push$2(output, delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next larger one:
      var m = maxInt;
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor$2((maxInt - delta) / handledCPCountPlusOne)) {
        throw $RangeError$1(OVERFLOW_ERROR);
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < n && ++delta > maxInt) {
          throw $RangeError$1(OVERFLOW_ERROR);
        }
        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer.
          var q = delta;
          var k = base;
          while (true) {
            var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) break;
            var qMinusT = q - t;
            var baseMinusT = base - t;
            push$2(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
            q = floor$2(qMinusT / baseMinusT);
            k += base;
          }

          push$2(output, fromCharCode(digitToBasic(q)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          handledCPCount++;
        }
      }

      delta++;
      n++;
    }
    return join$2(output, '');
  };

  var stringPunycodeToAscii = function (input) {
    var encoded = [];
    var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
    var i, label;
    for (i = 0; i < labels.length; i++) {
      label = labels[i];
      push$2(encoded, exec$1(regexNonASCII, label) ? 'xn--' + encode(label) : label);
    }
    return join$2(encoded, '.');
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`




























  var ITERATOR = wellKnownSymbol('iterator');
  var URL_SEARCH_PARAMS = 'URLSearchParams';
  var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
  var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);
  // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Avoid NodeJS experimental warning
  var safeGetBuiltIn = function (name) {
    if (!descriptors) return global_1[name];
    var descriptor = getOwnPropertyDescriptor$1(global_1, name);
    return descriptor && descriptor.value;
  };

  var nativeFetch = safeGetBuiltIn('fetch');
  var NativeRequest = safeGetBuiltIn('Request');
  var Headers = safeGetBuiltIn('Headers');
  var RequestPrototype = NativeRequest && NativeRequest.prototype;
  var HeadersPrototype = Headers && Headers.prototype;
  var RegExp$1 = global_1.RegExp;
  var TypeError$2 = global_1.TypeError;
  var decodeURIComponent$1 = global_1.decodeURIComponent;
  var encodeURIComponent$1 = global_1.encodeURIComponent;
  var charAt$1 = functionUncurryThis(''.charAt);
  var join$1 = functionUncurryThis([].join);
  var push$1 = functionUncurryThis([].push);
  var replace$1 = functionUncurryThis(''.replace);
  var shift$1 = functionUncurryThis([].shift);
  var splice = functionUncurryThis([].splice);
  var split$1 = functionUncurryThis(''.split);
  var stringSlice$3 = functionUncurryThis(''.slice);

  var plus = /\+/g;
  var sequences = Array(4);

  var percentSequence = function (bytes) {
    return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
  };

  var percentDecode = function (sequence) {
    try {
      return decodeURIComponent$1(sequence);
    } catch (error) {
      return sequence;
    }
  };

  var deserialize = function (it) {
    var result = replace$1(it, plus, ' ');
    var bytes = 4;
    try {
      return decodeURIComponent$1(result);
    } catch (error) {
      while (bytes) {
        result = replace$1(result, percentSequence(bytes--), percentDecode);
      }
      return result;
    }
  };

  var find = /[!'()~]|%20/g;

  var replacements = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+'
  };

  var replacer = function (match) {
    return replacements[match];
  };

  var serialize = function (it) {
    return replace$1(encodeURIComponent$1(it), find, replacer);
  };

  var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
    setInternalState$1(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      iterator: getIterator(getInternalParamsState(params).entries),
      kind: kind
    });
  }, 'Iterator', function next() {
    var state = getInternalIteratorState(this);
    var kind = state.kind;
    var step = state.iterator.next();
    var entry = step.value;
    if (!step.done) {
      step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
    } return step;
  }, true);

  var URLSearchParamsState = function (init) {
    this.entries = [];
    this.url = null;

    if (init !== undefined) {
      if (isObject(init)) this.parseObject(init);
      else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$3(init, 1) : init : toString_1(init));
    }
  };

  URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function (url) {
      this.url = url;
      this.update();
    },
    parseObject: function (object) {
      var iteratorMethod = getIteratorMethod(object);
      var iterator, next, step, entryIterator, entryNext, first, second;

      if (iteratorMethod) {
        iterator = getIterator(object, iteratorMethod);
        next = iterator.next;
        while (!(step = functionCall(next, iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = functionCall(entryNext, entryIterator)).done ||
            (second = functionCall(entryNext, entryIterator)).done ||
            !functionCall(entryNext, entryIterator).done
          ) throw TypeError$2('Expected sequence with length 2');
          push$1(this.entries, { key: toString_1(first.value), value: toString_1(second.value) });
        }
      } else for (var key in object) if (hasOwnProperty_1(object, key)) {
        push$1(this.entries, { key: key, value: toString_1(object[key]) });
      }
    },
    parseQuery: function (query) {
      if (query) {
        var attributes = split$1(query, '&');
        var index = 0;
        var attribute, entry;
        while (index < attributes.length) {
          attribute = attributes[index++];
          if (attribute.length) {
            entry = split$1(attribute, '=');
            push$1(this.entries, {
              key: deserialize(shift$1(entry)),
              value: deserialize(join$1(entry, '='))
            });
          }
        }
      }
    },
    serialize: function () {
      var entries = this.entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        push$1(result, serialize(entry.key) + '=' + serialize(entry.value));
      } return join$1(result, '&');
    },
    update: function () {
      this.entries.length = 0;
      this.parseQuery(this.url.query);
    },
    updateURL: function () {
      if (this.url) this.url.update();
    }
  };

  // `URLSearchParams` constructor
  // https://url.spec.whatwg.org/#interface-urlsearchparams
  var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
    anInstance(this, URLSearchParamsPrototype);
    var init = arguments.length > 0 ? arguments[0] : undefined;
    setInternalState$1(this, new URLSearchParamsState(init));
  };

  var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  defineBuiltIns(URLSearchParamsPrototype, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
      validateArgumentsLength(arguments.length, 2);
      var state = getInternalParamsState(this);
      push$1(state.entries, { key: toString_1(name), value: toString_1(value) });
      state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    'delete': function (name) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var key = toString_1(name);
      var index = 0;
      while (index < entries.length) {
        if (entries[index].key === key) splice(entries, index, 1);
        else index++;
      }
      state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString_1(name);
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) return entries[index].value;
      }
      return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString_1(name);
      var result = [];
      var index = 0;
      for (; index < entries.length; index++) {
        if (entries[index].key === key) push$1(result, entries[index].value);
      }
      return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has(name) {
      validateArgumentsLength(arguments.length, 1);
      var entries = getInternalParamsState(this).entries;
      var key = toString_1(name);
      var index = 0;
      while (index < entries.length) {
        if (entries[index++].key === key) return true;
      }
      return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set(name, value) {
      validateArgumentsLength(arguments.length, 1);
      var state = getInternalParamsState(this);
      var entries = state.entries;
      var found = false;
      var key = toString_1(name);
      var val = toString_1(value);
      var index = 0;
      var entry;
      for (; index < entries.length; index++) {
        entry = entries[index];
        if (entry.key === key) {
          if (found) splice(entries, index--, 1);
          else {
            found = true;
            entry.value = val;
          }
        }
      }
      if (!found) push$1(entries, { key: key, value: val });
      state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort() {
      var state = getInternalParamsState(this);
      arraySort(state.entries, function (a, b) {
        return a.key > b.key ? 1 : -1;
      });
      state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach(callback /* , thisArg */) {
      var entries = getInternalParamsState(this).entries;
      var boundFunction = functionBindContext(callback, arguments.length > 1 ? arguments[1] : undefined);
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        boundFunction(entry.value, entry.key, this);
      }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys() {
      return new URLSearchParamsIterator(this, 'keys');
    },
    // `URLSearchParams.prototype.values` method
    values: function values() {
      return new URLSearchParamsIterator(this, 'values');
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
      return new URLSearchParamsIterator(this, 'entries');
    }
  }, { enumerable: true });

  // `URLSearchParams.prototype[@@iterator]` method
  defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

  // `URLSearchParams.prototype.toString` method
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
    return getInternalParamsState(this).serialize();
  }, { enumerable: true });

  setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  _export({ global: true, constructor: true, forced: !nativeUrl }, {
    URLSearchParams: URLSearchParamsConstructor
  });

  // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  if (!nativeUrl && isCallable(Headers)) {
    var headersHas = functionUncurryThis(HeadersPrototype.has);
    var headersSet = functionUncurryThis(HeadersPrototype.set);

    var wrapRequestOptions = function (init) {
      if (isObject(init)) {
        var body = init.body;
        var headers;
        if (classof(body) === URL_SEARCH_PARAMS) {
          headers = init.headers ? new Headers(init.headers) : new Headers();
          if (!headersHas(headers, 'content-type')) {
            headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
          return objectCreate(init, {
            body: createPropertyDescriptor(0, toString_1(body)),
            headers: createPropertyDescriptor(0, headers)
          });
        }
      } return init;
    };

    if (isCallable(nativeFetch)) {
      _export({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
        fetch: function fetch(input /* , init */) {
          return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        }
      });
    }

    if (isCallable(NativeRequest)) {
      var RequestConstructor = function Request(input /* , init */) {
        anInstance(this, RequestPrototype);
        return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      };

      RequestPrototype.constructor = RequestConstructor;
      RequestConstructor.prototype = RequestPrototype;

      _export({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
        Request: RequestConstructor
      });
    }
  }

  var web_urlSearchParams_constructor = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
  };

  // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`














  var codeAt = stringMultibyte.codeAt;







  var setInternalState = internalState.set;
  var getInternalURLState = internalState.getterFor('URL');
  var URLSearchParams$1 = web_urlSearchParams_constructor.URLSearchParams;
  var getInternalSearchParamsState = web_urlSearchParams_constructor.getState;

  var NativeURL = global_1.URL;
  var TypeError$1 = global_1.TypeError;
  var parseInt = global_1.parseInt;
  var floor$1 = Math.floor;
  var pow$1 = Math.pow;
  var charAt = functionUncurryThis(''.charAt);
  var exec = functionUncurryThis(/./.exec);
  var join = functionUncurryThis([].join);
  var numberToString = functionUncurryThis(1.0.toString);
  var pop = functionUncurryThis([].pop);
  var push = functionUncurryThis([].push);
  var replace = functionUncurryThis(''.replace);
  var shift = functionUncurryThis([].shift);
  var split = functionUncurryThis(''.split);
  var stringSlice$2 = functionUncurryThis(''.slice);
  var toLowerCase = functionUncurryThis(''.toLowerCase);
  var unshift = functionUncurryThis([].unshift);

  var INVALID_AUTHORITY = 'Invalid authority';
  var INVALID_SCHEME = 'Invalid scheme';
  var INVALID_HOST = 'Invalid host';
  var INVALID_PORT = 'Invalid port';

  var ALPHA = /[a-z]/i;
  // eslint-disable-next-line regexp/no-obscure-range -- safe
  var ALPHANUMERIC = /[\d+-.a-z]/i;
  var DIGIT = /\d/;
  var HEX_START = /^0x/i;
  var OCT = /^[0-7]+$/;
  var DEC = /^\d+$/;
  var HEX = /^[\da-f]+$/i;
  /* eslint-disable regexp/no-control-character -- safe */
  var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
  var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  /* eslint-enable regexp/no-control-character -- safe */
  var EOF;

  // https://url.spec.whatwg.org/#ipv4-number-parser
  var parseIPv4 = function (input) {
    var parts = split(input, '.');
    var partsLength, numbers, index, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] == '') {
      parts.length--;
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index = 0; index < partsLength; index++) {
      part = parts[index];
      if (part == '') return input;
      radix = 10;
      if (part.length > 1 && charAt(part, 0) == '0') {
        radix = exec(HEX_START, part) ? 16 : 8;
        part = stringSlice$2(part, radix == 8 ? 1 : 2);
      }
      if (part === '') {
        number = 0;
      } else {
        if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
        number = parseInt(part, radix);
      }
      push(numbers, number);
    }
    for (index = 0; index < partsLength; index++) {
      number = numbers[index];
      if (index == partsLength - 1) {
        if (number >= pow$1(256, 5 - partsLength)) return null;
      } else if (number > 255) return null;
    }
    ipv4 = pop(numbers);
    for (index = 0; index < numbers.length; index++) {
      ipv4 += numbers[index] * pow$1(256, 3 - index);
    }
    return ipv4;
  };

  // https://url.spec.whatwg.org/#concept-ipv6-parser
  // eslint-disable-next-line max-statements -- TODO
  var parseIPv6 = function (input) {
    var address = [0, 0, 0, 0, 0, 0, 0, 0];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

    var chr = function () {
      return charAt(input, pointer);
    };

    if (chr() == ':') {
      if (charAt(input, 1) != ':') return;
      pointer += 2;
      pieceIndex++;
      compress = pieceIndex;
    }
    while (chr()) {
      if (pieceIndex == 8) return;
      if (chr() == ':') {
        if (compress !== null) return;
        pointer++;
        pieceIndex++;
        compress = pieceIndex;
        continue;
      }
      value = length = 0;
      while (length < 4 && exec(HEX, chr())) {
        value = value * 16 + parseInt(chr(), 16);
        pointer++;
        length++;
      }
      if (chr() == '.') {
        if (length == 0) return;
        pointer -= length;
        if (pieceIndex > 6) return;
        numbersSeen = 0;
        while (chr()) {
          ipv4Piece = null;
          if (numbersSeen > 0) {
            if (chr() == '.' && numbersSeen < 4) pointer++;
            else return;
          }
          if (!exec(DIGIT, chr())) return;
          while (exec(DIGIT, chr())) {
            number = parseInt(chr(), 10);
            if (ipv4Piece === null) ipv4Piece = number;
            else if (ipv4Piece == 0) return;
            else ipv4Piece = ipv4Piece * 10 + number;
            if (ipv4Piece > 255) return;
            pointer++;
          }
          address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
          numbersSeen++;
          if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
        }
        if (numbersSeen != 4) return;
        break;
      } else if (chr() == ':') {
        pointer++;
        if (!chr()) return;
      } else if (chr()) return;
      address[pieceIndex++] = value;
    }
    if (compress !== null) {
      swaps = pieceIndex - compress;
      pieceIndex = 7;
      while (pieceIndex != 0 && swaps > 0) {
        swap = address[pieceIndex];
        address[pieceIndex--] = address[compress + swaps - 1];
        address[compress + --swaps] = swap;
      }
    } else if (pieceIndex != 8) return;
    return address;
  };

  var findLongestZeroSequence = function (ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index = 0;
    for (; index < 8; index++) {
      if (ipv6[index] !== 0) {
        if (currLength > maxLength) {
          maxIndex = currStart;
          maxLength = currLength;
        }
        currStart = null;
        currLength = 0;
      } else {
        if (currStart === null) currStart = index;
        ++currLength;
      }
    }
    if (currLength > maxLength) {
      maxIndex = currStart;
      maxLength = currLength;
    }
    return maxIndex;
  };

  // https://url.spec.whatwg.org/#host-serializing
  var serializeHost = function (host) {
    var result, index, compress, ignore0;
    // ipv4
    if (typeof host == 'number') {
      result = [];
      for (index = 0; index < 4; index++) {
        unshift(result, host % 256);
        host = floor$1(host / 256);
      } return join(result, '.');
    // ipv6
    } else if (typeof host == 'object') {
      result = '';
      compress = findLongestZeroSequence(host);
      for (index = 0; index < 8; index++) {
        if (ignore0 && host[index] === 0) continue;
        if (ignore0) ignore0 = false;
        if (compress === index) {
          result += index ? ':' : '::';
          ignore0 = true;
        } else {
          result += numberToString(host[index], 16);
          if (index < 7) result += ':';
        }
      }
      return '[' + result + ']';
    } return host;
  };

  var C0ControlPercentEncodeSet = {};
  var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
    ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  });
  var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
    '#': 1, '?': 1, '{': 1, '}': 1
  });
  var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
    '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  });

  var percentEncode = function (chr, set) {
    var code = codeAt(chr, 0);
    return code > 0x20 && code < 0x7F && !hasOwnProperty_1(set, chr) ? chr : encodeURIComponent(chr);
  };

  // https://url.spec.whatwg.org/#special-scheme
  var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  };

  // https://url.spec.whatwg.org/#windows-drive-letter
  var isWindowsDriveLetter = function (string, normalized) {
    var second;
    return string.length == 2 && exec(ALPHA, charAt(string, 0))
      && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
  };

  // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
  var startsWithWindowsDriveLetter = function (string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(stringSlice$2(string, 0, 2)) && (
      string.length == 2 ||
      ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
    );
  };

  // https://url.spec.whatwg.org/#single-dot-path-segment
  var isSingleDot = function (segment) {
    return segment === '.' || toLowerCase(segment) === '%2e';
  };

  // https://url.spec.whatwg.org/#double-dot-path-segment
  var isDoubleDot = function (segment) {
    segment = toLowerCase(segment);
    return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  };

  // States:
  var SCHEME_START = {};
  var SCHEME = {};
  var NO_SCHEME = {};
  var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  var PATH_OR_AUTHORITY = {};
  var RELATIVE = {};
  var RELATIVE_SLASH = {};
  var SPECIAL_AUTHORITY_SLASHES = {};
  var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  var AUTHORITY = {};
  var HOST = {};
  var HOSTNAME = {};
  var PORT = {};
  var FILE = {};
  var FILE_SLASH = {};
  var FILE_HOST = {};
  var PATH_START = {};
  var PATH = {};
  var CANNOT_BE_A_BASE_URL_PATH = {};
  var QUERY = {};
  var FRAGMENT = {};

  var URLState = function (url, isBase, base) {
    var urlString = toString_1(url);
    var baseState, failure, searchParams;
    if (isBase) {
      failure = this.parse(urlString);
      if (failure) throw TypeError$1(failure);
      this.searchParams = null;
    } else {
      if (base !== undefined) baseState = new URLState(base, true);
      failure = this.parse(urlString, null, baseState);
      if (failure) throw TypeError$1(failure);
      searchParams = getInternalSearchParamsState(new URLSearchParams$1());
      searchParams.bindURL(this);
      this.searchParams = searchParams;
    }
  };

  URLState.prototype = {
    type: 'URL',
    // https://url.spec.whatwg.org/#url-parsing
    // eslint-disable-next-line max-statements -- TODO
    parse: function (input, stateOverride, base) {
      var url = this;
      var state = stateOverride || SCHEME_START;
      var pointer = 0;
      var buffer = '';
      var seenAt = false;
      var seenBracket = false;
      var seenPasswordToken = false;
      var codePoints, chr, bufferCodePoints, failure;

      input = toString_1(input);

      if (!stateOverride) {
        url.scheme = '';
        url.username = '';
        url.password = '';
        url.host = null;
        url.port = null;
        url.path = [];
        url.query = null;
        url.fragment = null;
        url.cannotBeABaseURL = false;
        input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
      }

      input = replace(input, TAB_AND_NEW_LINE, '');

      codePoints = arrayFrom(input);

      while (pointer <= codePoints.length) {
        chr = codePoints[pointer];
        switch (state) {
          case SCHEME_START:
            if (chr && exec(ALPHA, chr)) {
              buffer += toLowerCase(chr);
              state = SCHEME;
            } else if (!stateOverride) {
              state = NO_SCHEME;
              continue;
            } else return INVALID_SCHEME;
            break;

          case SCHEME:
            if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
              buffer += toLowerCase(chr);
            } else if (chr == ':') {
              if (stateOverride && (
                (url.isSpecial() != hasOwnProperty_1(specialSchemes, buffer)) ||
                (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
                (url.scheme == 'file' && !url.host)
              )) return;
              url.scheme = buffer;
              if (stateOverride) {
                if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
                return;
              }
              buffer = '';
              if (url.scheme == 'file') {
                state = FILE;
              } else if (url.isSpecial() && base && base.scheme == url.scheme) {
                state = SPECIAL_RELATIVE_OR_AUTHORITY;
              } else if (url.isSpecial()) {
                state = SPECIAL_AUTHORITY_SLASHES;
              } else if (codePoints[pointer + 1] == '/') {
                state = PATH_OR_AUTHORITY;
                pointer++;
              } else {
                url.cannotBeABaseURL = true;
                push(url.path, '');
                state = CANNOT_BE_A_BASE_URL_PATH;
              }
            } else if (!stateOverride) {
              buffer = '';
              state = NO_SCHEME;
              pointer = 0;
              continue;
            } else return INVALID_SCHEME;
            break;

          case NO_SCHEME:
            if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
            if (base.cannotBeABaseURL && chr == '#') {
              url.scheme = base.scheme;
              url.path = arraySliceSimple(base.path);
              url.query = base.query;
              url.fragment = '';
              url.cannotBeABaseURL = true;
              state = FRAGMENT;
              break;
            }
            state = base.scheme == 'file' ? FILE : RELATIVE;
            continue;

          case SPECIAL_RELATIVE_OR_AUTHORITY:
            if (chr == '/' && codePoints[pointer + 1] == '/') {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              pointer++;
            } else {
              state = RELATIVE;
              continue;
            } break;

          case PATH_OR_AUTHORITY:
            if (chr == '/') {
              state = AUTHORITY;
              break;
            } else {
              state = PATH;
              continue;
            }

          case RELATIVE:
            url.scheme = base.scheme;
            if (chr == EOF) {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySliceSimple(base.path);
              url.query = base.query;
            } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
              state = RELATIVE_SLASH;
            } else if (chr == '?') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySliceSimple(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySliceSimple(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = arraySliceSimple(base.path);
              url.path.length--;
              state = PATH;
              continue;
            } break;

          case RELATIVE_SLASH:
            if (url.isSpecial() && (chr == '/' || chr == '\\')) {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            } else if (chr == '/') {
              state = AUTHORITY;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              state = PATH;
              continue;
            } break;

          case SPECIAL_AUTHORITY_SLASHES:
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
            pointer++;
            break;

          case SPECIAL_AUTHORITY_IGNORE_SLASHES:
            if (chr != '/' && chr != '\\') {
              state = AUTHORITY;
              continue;
            } break;

          case AUTHORITY:
            if (chr == '@') {
              if (seenAt) buffer = '%40' + buffer;
              seenAt = true;
              bufferCodePoints = arrayFrom(buffer);
              for (var i = 0; i < bufferCodePoints.length; i++) {
                var codePoint = bufferCodePoints[i];
                if (codePoint == ':' && !seenPasswordToken) {
                  seenPasswordToken = true;
                  continue;
                }
                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                if (seenPasswordToken) url.password += encodedCodePoints;
                else url.username += encodedCodePoints;
              }
              buffer = '';
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial())
            ) {
              if (seenAt && buffer == '') return INVALID_AUTHORITY;
              pointer -= arrayFrom(buffer).length + 1;
              buffer = '';
              state = HOST;
            } else buffer += chr;
            break;

          case HOST:
          case HOSTNAME:
            if (stateOverride && url.scheme == 'file') {
              state = FILE_HOST;
              continue;
            } else if (chr == ':' && !seenBracket) {
              if (buffer == '') return INVALID_HOST;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PORT;
              if (stateOverride == HOSTNAME) return;
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial())
            ) {
              if (url.isSpecial() && buffer == '') return INVALID_HOST;
              if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
              failure = url.parseHost(buffer);
              if (failure) return failure;
              buffer = '';
              state = PATH_START;
              if (stateOverride) return;
              continue;
            } else {
              if (chr == '[') seenBracket = true;
              else if (chr == ']') seenBracket = false;
              buffer += chr;
            } break;

          case PORT:
            if (exec(DIGIT, chr)) {
              buffer += chr;
            } else if (
              chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
              (chr == '\\' && url.isSpecial()) ||
              stateOverride
            ) {
              if (buffer != '') {
                var port = parseInt(buffer, 10);
                if (port > 0xFFFF) return INVALID_PORT;
                url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
                buffer = '';
              }
              if (stateOverride) return;
              state = PATH_START;
              continue;
            } else return INVALID_PORT;
            break;

          case FILE:
            url.scheme = 'file';
            if (chr == '/' || chr == '\\') state = FILE_SLASH;
            else if (base && base.scheme == 'file') {
              if (chr == EOF) {
                url.host = base.host;
                url.path = arraySliceSimple(base.path);
                url.query = base.query;
              } else if (chr == '?') {
                url.host = base.host;
                url.path = arraySliceSimple(base.path);
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.host = base.host;
                url.path = arraySliceSimple(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
              } else {
                if (!startsWithWindowsDriveLetter(join(arraySliceSimple(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySliceSimple(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
              }
            } else {
              state = PATH;
              continue;
            } break;

          case FILE_SLASH:
            if (chr == '/' || chr == '\\') {
              state = FILE_HOST;
              break;
            }
            if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySliceSimple(codePoints, pointer), ''))) {
              if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
              else url.host = base.host;
            }
            state = PATH;
            continue;

          case FILE_HOST:
            if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
              if (!stateOverride && isWindowsDriveLetter(buffer)) {
                state = PATH;
              } else if (buffer == '') {
                url.host = '';
                if (stateOverride) return;
                state = PATH_START;
              } else {
                failure = url.parseHost(buffer);
                if (failure) return failure;
                if (url.host == 'localhost') url.host = '';
                if (stateOverride) return;
                buffer = '';
                state = PATH_START;
              } continue;
            } else buffer += chr;
            break;

          case PATH_START:
            if (url.isSpecial()) {
              state = PATH;
              if (chr != '/' && chr != '\\') continue;
            } else if (!stateOverride && chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (!stateOverride && chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              state = PATH;
              if (chr != '/') continue;
            } break;

          case PATH:
            if (
              chr == EOF || chr == '/' ||
              (chr == '\\' && url.isSpecial()) ||
              (!stateOverride && (chr == '?' || chr == '#'))
            ) {
              if (isDoubleDot(buffer)) {
                url.shortenPath();
                if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                  push(url.path, '');
                }
              } else if (isSingleDot(buffer)) {
                if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                  push(url.path, '');
                }
              } else {
                if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                  if (url.host) url.host = '';
                  buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
                }
                push(url.path, buffer);
              }
              buffer = '';
              if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
                while (url.path.length > 1 && url.path[0] === '') {
                  shift(url.path);
                }
              }
              if (chr == '?') {
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.fragment = '';
                state = FRAGMENT;
              }
            } else {
              buffer += percentEncode(chr, pathPercentEncodeSet);
            } break;

          case CANNOT_BE_A_BASE_URL_PATH:
            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case QUERY:
            if (!stateOverride && chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (chr != EOF) {
              if (chr == "'" && url.isSpecial()) url.query += '%27';
              else if (chr == '#') url.query += '%23';
              else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
            } break;

          case FRAGMENT:
            if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
            break;
        }

        pointer++;
      }
    },
    // https://url.spec.whatwg.org/#host-parsing
    parseHost: function (input) {
      var result, codePoints, index;
      if (charAt(input, 0) == '[') {
        if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
        result = parseIPv6(stringSlice$2(input, 1, -1));
        if (!result) return INVALID_HOST;
        this.host = result;
      // opaque host
      } else if (!this.isSpecial()) {
        if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
        result = '';
        codePoints = arrayFrom(input);
        for (index = 0; index < codePoints.length; index++) {
          result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
        }
        this.host = result;
      } else {
        input = stringPunycodeToAscii(input);
        if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
        result = parseIPv4(input);
        if (result === null) return INVALID_HOST;
        this.host = result;
      }
    },
    // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
    cannotHaveUsernamePasswordPort: function () {
      return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
    },
    // https://url.spec.whatwg.org/#include-credentials
    includesCredentials: function () {
      return this.username != '' || this.password != '';
    },
    // https://url.spec.whatwg.org/#is-special
    isSpecial: function () {
      return hasOwnProperty_1(specialSchemes, this.scheme);
    },
    // https://url.spec.whatwg.org/#shorten-a-urls-path
    shortenPath: function () {
      var path = this.path;
      var pathSize = path.length;
      if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
        path.length--;
      }
    },
    // https://url.spec.whatwg.org/#concept-url-serializer
    serialize: function () {
      var url = this;
      var scheme = url.scheme;
      var username = url.username;
      var password = url.password;
      var host = url.host;
      var port = url.port;
      var path = url.path;
      var query = url.query;
      var fragment = url.fragment;
      var output = scheme + ':';
      if (host !== null) {
        output += '//';
        if (url.includesCredentials()) {
          output += username + (password ? ':' + password : '') + '@';
        }
        output += serializeHost(host);
        if (port !== null) output += ':' + port;
      } else if (scheme == 'file') output += '//';
      output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
      if (query !== null) output += '?' + query;
      if (fragment !== null) output += '#' + fragment;
      return output;
    },
    // https://url.spec.whatwg.org/#dom-url-href
    setHref: function (href) {
      var failure = this.parse(href);
      if (failure) throw TypeError$1(failure);
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-origin
    getOrigin: function () {
      var scheme = this.scheme;
      var port = this.port;
      if (scheme == 'blob') try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      }
      if (scheme == 'file' || !this.isSpecial()) return 'null';
      return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
    },
    // https://url.spec.whatwg.org/#dom-url-protocol
    getProtocol: function () {
      return this.scheme + ':';
    },
    setProtocol: function (protocol) {
      this.parse(toString_1(protocol) + ':', SCHEME_START);
    },
    // https://url.spec.whatwg.org/#dom-url-username
    getUsername: function () {
      return this.username;
    },
    setUsername: function (username) {
      var codePoints = arrayFrom(toString_1(username));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-password
    getPassword: function () {
      return this.password;
    },
    setPassword: function (password) {
      var codePoints = arrayFrom(toString_1(password));
      if (this.cannotHaveUsernamePasswordPort()) return;
      this.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    },
    // https://url.spec.whatwg.org/#dom-url-host
    getHost: function () {
      var host = this.host;
      var port = this.port;
      return host === null ? ''
        : port === null ? serializeHost(host)
        : serializeHost(host) + ':' + port;
    },
    setHost: function (host) {
      if (this.cannotBeABaseURL) return;
      this.parse(host, HOST);
    },
    // https://url.spec.whatwg.org/#dom-url-hostname
    getHostname: function () {
      var host = this.host;
      return host === null ? '' : serializeHost(host);
    },
    setHostname: function (hostname) {
      if (this.cannotBeABaseURL) return;
      this.parse(hostname, HOSTNAME);
    },
    // https://url.spec.whatwg.org/#dom-url-port
    getPort: function () {
      var port = this.port;
      return port === null ? '' : toString_1(port);
    },
    setPort: function (port) {
      if (this.cannotHaveUsernamePasswordPort()) return;
      port = toString_1(port);
      if (port == '') this.port = null;
      else this.parse(port, PORT);
    },
    // https://url.spec.whatwg.org/#dom-url-pathname
    getPathname: function () {
      var path = this.path;
      return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    },
    setPathname: function (pathname) {
      if (this.cannotBeABaseURL) return;
      this.path = [];
      this.parse(pathname, PATH_START);
    },
    // https://url.spec.whatwg.org/#dom-url-search
    getSearch: function () {
      var query = this.query;
      return query ? '?' + query : '';
    },
    setSearch: function (search) {
      search = toString_1(search);
      if (search == '') {
        this.query = null;
      } else {
        if ('?' == charAt(search, 0)) search = stringSlice$2(search, 1);
        this.query = '';
        this.parse(search, QUERY);
      }
      this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-searchparams
    getSearchParams: function () {
      return this.searchParams.facade;
    },
    // https://url.spec.whatwg.org/#dom-url-hash
    getHash: function () {
      var fragment = this.fragment;
      return fragment ? '#' + fragment : '';
    },
    setHash: function (hash) {
      hash = toString_1(hash);
      if (hash == '') {
        this.fragment = null;
        return;
      }
      if ('#' == charAt(hash, 0)) hash = stringSlice$2(hash, 1);
      this.fragment = '';
      this.parse(hash, FRAGMENT);
    },
    update: function () {
      this.query = this.searchParams.serialize() || null;
    }
  };

  // `URL` constructor
  // https://url.spec.whatwg.org/#url-class
  var URLConstructor = function URL(url /* , base */) {
    var that = anInstance(this, URLPrototype);
    var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
    var state = setInternalState(that, new URLState(url, false, base));
    if (!descriptors) {
      that.href = state.serialize();
      that.origin = state.getOrigin();
      that.protocol = state.getProtocol();
      that.username = state.getUsername();
      that.password = state.getPassword();
      that.host = state.getHost();
      that.hostname = state.getHostname();
      that.port = state.getPort();
      that.pathname = state.getPathname();
      that.search = state.getSearch();
      that.searchParams = state.getSearchParams();
      that.hash = state.getHash();
    }
  };

  var URLPrototype = URLConstructor.prototype;

  var accessorDescriptor = function (getter, setter) {
    return {
      get: function () {
        return getInternalURLState(this)[getter]();
      },
      set: setter && function (value) {
        return getInternalURLState(this)[setter](value);
      },
      configurable: true,
      enumerable: true
    };
  };

  if (descriptors) {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
  }

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  // `URL.prototype.toString` method
  // https://url.spec.whatwg.org/#URL-stringification-behavior
  defineBuiltIn(URLPrototype, 'toString', function toString() {
    return getInternalURLState(this).serialize();
  }, { enumerable: true });

  if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    // `URL.createObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', functionBindContext(nativeCreateObjectURL, NativeURL));
    // `URL.revokeObjectURL` method
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
    if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', functionBindContext(nativeRevokeObjectURL, NativeURL));
  }

  setToStringTag(URLConstructor, 'URL');

  _export({ global: true, constructor: true, forced: !nativeUrl, sham: !descriptors }, {
    URL: URLConstructor
  });

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;







  // eslint-disable-next-line es-x/no-string-prototype-startswith -- safe
  var un$StartsWith = functionUncurryThis(''.startsWith);
  var stringSlice$1 = functionUncurryThis(''.slice);
  var min$1 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString_1(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$1(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString_1(searchString);
      return un$StartsWith
        ? un$StartsWith(that, search, index)
        : stringSlice$1(that, index, index + search.length) === search;
    }
  });

  var styles$3 = ".barrier-free .barrier-free-active {\n  outline: rgba(255, 0, 0, 0.84) solid 2px !important;\n  outline-offset: -2px !important;\n  border-radius: 2px !important;\n}";

  var stylesTest = "@charset \"UTF-8\";\n.barrier-free.aging-on {\n  /* ======财政预决算和“三公”经费信息公开 ======*/\n  /* ====== 铜官区土地和房屋征收中心 ======*/\n  /* 底部 */\n}\n.barrier-free.aging-on .zddhlist .tit {\n  font-size: 28px;\n}\n.barrier-free.aging-on .fbhlist ul li a {\n  font-size: 30px;\n}\n.barrier-free.aging-on .zddhlist ul li a {\n  font-size: 26px;\n}\n.barrier-free.aging-on .xxgk_phnr ul li span,\n.barrier-free.aging-on .xxgk_phnr ul li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .xxgk_phnr ul li {\n  height: 40px;\n  line-height: 40px;\n}\n.barrier-free.aging-on .newsphbox,\n.barrier-free.aging-on .xxgk_phnr {\n  height: auto;\n}\n.barrier-free.aging-on .newsphbox {\n  padding: 10px;\n}\n.barrier-free.aging-on .fbh_list ul li a {\n  font-size: 26px;\n}\n.barrier-free.aging-on .fbh_list ul li {\n  width: 180px;\n}\n.barrier-free.aging-on .zddh_wz ul li {\n  height: 40px;\n  line-height: 40px;\n  width: calc(25% - 30px);\n}\n.barrier-free.aging-on .zddh_wz ul li a {\n  display: block;\n  font-size: 22px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.barrier-free.aging-on .zddhbox {\n  height: auto;\n}\n.barrier-free.aging-on .zddh_wz {\n  height: auto;\n}\n.barrier-free.aging-on .zcjdbox,\n.barrier-free.aging-on .zwgkxdbox,\n.barrier-free.aging-on .gknewsbox,\n.barrier-free.aging-on .gklmlistbox,\n.barrier-free.aging-on .newsphbox, .barrier-free.aging-on .fbhbox {\n  width: 100%;\n}\n.barrier-free.aging-on .gklmlist ul li {\n  width: 24%;\n  display: inline-block;\n}\n.barrier-free.aging-on .zddhlist .tit {\n  width: 300px;\n}\n.barrier-free.aging-on .zdly-list ul li .img-title,\n.barrier-free.aging-on .gklistw ul li,\n.barrier-free.aging-on .gklistw ul li .date,\n.barrier-free.aging-on .zdly-tab > ul > li,\n.barrier-free.aging-on .hdjlbtn ul li .img_title,\n.barrier-free.aging-on .hygqbtn ul li .img_title,\n.barrier-free.aging-on .zcjdtitlewz ul li .date,\n.barrier-free.aging-on .zcjdtitlewz ul li,\n.barrier-free.aging-on .zdapwz ul li .date,\n.barrier-free.aging-on .zdapwz ul li,\n.barrier-free.aging-on .zwgk_wz ul li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .zcjdtitle ul li a,\n.barrier-free.aging-on .zwgk_list_jdbz ul li a {\n  font-size: 26px;\n}\n.barrier-free.aging-on .gklist ul li .name,\n.barrier-free.aging-on .zcjdtitle ul li.active a {\n  font-size: 26px;\n}\n.barrier-free.aging-on .newgklist ul li a,\n.barrier-free.aging-on .zdly-tit .tit,\n.barrier-free.aging-on .zcjdlist ul li a,\n.barrier-free.aging-on .zwgklist a, .barrier-free.aging-on .zwgklist span {\n  font-size: 30px;\n}\n.barrier-free.aging-on .newgklist {\n  height: 60px;\n}\n.barrier-free.aging-on .newgklist ul li {\n  height: 60px;\n  line-height: 60px;\n  width: auto;\n}\n.barrier-free.aging-on .newgklist ul li a {\n  padding: 0 20px;\n  height: 60px;\n}\n.barrier-free.aging-on .gklist ul li {\n  height: 52px;\n}\n.barrier-free.aging-on .gklist ul li .name {\n  height: 52px;\n  line-height: 52px;\n}\n.barrier-free.aging-on .zwgkxdbox,\n.barrier-free.aging-on .gklmlistbox,\n.barrier-free.aging-on .zcjdbox,\n.barrier-free.aging-on .gklistbody,\n.barrier-free.aging-on .gknewsbox {\n  height: auto;\n}\n.barrier-free.aging-on .gklistbody {\n  padding-bottom: 10px;\n}\n.barrier-free.aging-on .gklistw {\n  padding: 10px;\n}\n.barrier-free.aging-on .gklistw ul li {\n  height: 44px;\n  line-height: 44px;\n}\n.barrier-free.aging-on .gklm_pic {\n  zoom: 1.5;\n}\n.barrier-free.aging-on .xxgk-ztzl-ztimglist {\n  zoom: 1.18;\n}\n.barrier-free.aging-on .zdly-list,\n.barrier-free.aging-on .zdly-tab > ul > li {\n  width: 24%;\n}\n.barrier-free.aging-on .zcjdlist {\n  height: 60px;\n}\n.barrier-free.aging-on .zcjdlist ul li {\n  height: 60px;\n}\n.barrier-free.aging-on .zcjdlist ul li a {\n  line-height: 60px;\n}\n.barrier-free.aging-on .zcjdtitle {\n  height: 52px;\n}\n.barrier-free.aging-on .zcjdtitle ul li a {\n  height: 52px;\n  line-height: 52px;\n}\n.barrier-free.aging-on .zwgk_wz ul li,\n.barrier-free.aging-on .zdapwz ul li,\n.barrier-free.aging-on .zcjdtitlewz ul li {\n  height: 44px;\n  line-height: 44px;\n}\n.barrier-free.aging-on .zcjdtitlewz {\n  padding: 10px;\n}\n.barrier-free.aging-on .hdjlbtn {\n  width: 100%;\n}\n.barrier-free.aging-on .hdjlbtn ul li {\n  float: unset;\n  width: 24%;\n  margin: 10px 10px 0 0;\n  display: inline-block;\n}\n.barrier-free.aging-on .hdjlbtn ul li.num2, .barrier-free.aging-on .hdjlbtn ul li.num4 {\n  margin-right: 10px;\n}\n.barrier-free.aging-on .fbhlist {\n  height: 60px;\n}\n.barrier-free.aging-on .fbhlist ul li {\n  height: 60px;\n}\n.barrier-free.aging-on .fbhlist ul li a {\n  line-height: 60px;\n}\n.barrier-free.aging-on .zwgk_list,\n.barrier-free.aging-on .fbh_list {\n  height: 52px;\n  line-height: 52px;\n}\n.barrier-free.aging-on .zwgk_list ul li,\n.barrier-free.aging-on .fbh_list ul li {\n  height: 52px;\n}\n.barrier-free.aging-on .zwgk_list ul li a,\n.barrier-free.aging-on .fbh_list ul li a {\n  line-height: 52px;\n}\n.barrier-free.aging-on .newsphbox, .barrier-free.aging-on .fbhbox {\n  padding: 10px 10px 10px;\n  height: auto;\n}\n.barrier-free.aging-on .zddhlist,\n.barrier-free.aging-on .zddhlist .tit,\n.barrier-free.aging-on .zwgklist,\n.barrier-free.aging-on .zwgklist a, .barrier-free.aging-on .zwgklist span {\n  height: 60px;\n  line-height: 60px;\n}\n.barrier-free.aging-on .gklmlistbox {\n  float: unset;\n}\n.barrier-free.aging-on .newsphbox, .barrier-free.aging-on .fbhbox {\n  float: left;\n}\n.barrier-free.aging-on .newsphbox,\n.barrier-free.aging-on .zwgkxdbox,\n.barrier-free.aging-on .gknewsbox,\n.barrier-free.aging-on .zcjdbox,\n.barrier-free.aging-on .gklmlistbox,\n.barrier-free.aging-on .newsphbox, .barrier-free.aging-on .fbhbox {\n  box-sizing: border-box;\n}\n.barrier-free.aging-on .hfgg {\n  zoom: 1.17;\n}\n.barrier-free.aging-on .zddhlist ul li {\n  width: 330px;\n}\n.barrier-free.aging-on .zddhlist ul li.active a {\n  background-size: 105% 100%;\n  background-position-x: 0 !important;\n}\n.barrier-free.aging-on .zddhlist ul li a {\n  background-position-x: 312px !important;\n}\n.barrier-free.aging-on .zddhlist ul {\n  margin-top: 9px;\n}\n.barrier-free.aging-on .wza_top a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-location_ {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-detailtb td {\n  font-size: 22px;\n}\n.barrier-free.aging-on .u-desc, .barrier-free.aging-on .u-desc a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .xxgk_zclist,\n.barrier-free.aging-on .m-detailbox {\n  zoom: 1.2;\n}\n.barrier-free.aging-on .czjj-ban {\n  zoom: 1.167;\n}\n.barrier-free.aging-on .header {\n  height: auto;\n  background-size: auto 160%;\n  background-position-y: -160px;\n  padding-bottom: 10px;\n}\n.barrier-free.aging-on .header .topleft ul li a {\n  font-size: 20px !important;\n}\n.barrier-free.aging-on .wz_top {\n  font-size: 24px !important;\n}\n.barrier-free.aging-on .czjjbox .czjj-list ul li {\n  font-size: 24px !important;\n  width: 100% !important;\n}\n.barrier-free.aging-on .topright, .barrier-free.aging-on .topright a {\n  font-size: 20px !important;\n}\n.barrier-free.aging-on .topright a {\n  background-size: 3% !important;\n  padding: 0 10px !important;\n}\n.barrier-free.aging-on .topright a:last-child {\n  background: none !important;\n}\n.barrier-free.aging-on .head {\n  width: 1400px;\n}\n.barrier-free.aging-on .menu ul {\n  justify-content: left;\n  padding-bottom: 10px;\n}\n.barrier-free.aging-on .menu ul li#first,\n.barrier-free.aging-on .menu ul li#last,\n.barrier-free.aging-on .menu ul li {\n  width: 25%;\n}\n.barrier-free.aging-on .menu ul li a {\n  line-height: 50px;\n  height: 50px;\n  font-size: 28px;\n}\n.barrier-free.aging-on .menu {\n  height: auto;\n}\n.barrier-free.aging-on .menu ul {\n  flex-wrap: wrap;\n}\n.barrier-free.aging-on .m-zglocation, .barrier-free.aging-on .m-zglocation a {\n  font-size: 22px;\n  color: #fff;\n}\n.barrier-free.aging-on .m-openlf {\n  width: 360px;\n}\n.barrier-free.aging-on .m-openrg {\n  width: 985px;\n}\n.barrier-free.aging-on .m-menu .u-tit .u-name {\n  width: 200px;\n  font-size: 28px;\n  height: 60px;\n  line-height: 60px;\n  letter-spacing: 13px;\n}\n.barrier-free.aging-on .m-menu .u-tit .u-name span {\n  line-height: 33px;\n}\n.barrier-free.aging-on .m-menu .u-tit .u-ts {\n  width: 220px;\n}\n.barrier-free.aging-on .m-menu .u-tit {\n  height: 80px;\n}\n.barrier-free.aging-on .m-menu .u-tit .u-sticon {\n  line-height: 28px;\n}\n.barrier-free.aging-on .input-sm {\n  height: 40px;\n  font-size: 20px;\n  line-height: 1.5;\n}\n.barrier-free.aging-on .ztree * {\n  font-size: 20px;\n}\n.barrier-free.aging-on .u-searchtext {\n  font-size: 24px;\n}\n.barrier-free.aging-on .m-searchbox li {\n  font-size: 18px;\n}\n.barrier-free.aging-on .m-titstyle1 .u-tit {\n  line-height: 56px;\n  font-size: 30px;\n}\n.barrier-free.aging-on .m-tglist li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-tglist li span {\n  width: 140px;\n}\n.barrier-free.aging-on .m-pagination li a {\n  padding: 0 8px;\n  line-height: 33px;\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-pagination li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-pagination li.u-redirect {\n  line-height: 36px;\n}\n.barrier-free.aging-on .m-zcbox .gzbox p {\n  font-size: 20px;\n}\n.barrier-free.aging-on .m-cgbox li a,\n.barrier-free.aging-on .g-zctree li a,\n.barrier-free.aging-on .m-zctree.j-zctree {\n  font-size: 20px;\n}\n.barrier-free.aging-on .d-list-title > div {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-tglist .u-more,\n.barrier-free.aging-on .d-lists-sy .list-li1,\n.barrier-free.aging-on .tt-span a,\n.barrier-free.aging-on .tt-a {\n  font-size: 20px;\n}\n.barrier-free.aging-on .text-date span,\n.barrier-free.aging-on .list-li3 span a {\n  font-size: 18px;\n}\n.barrier-free.aging-on .list-li3 span a {\n  margin: 0 4px;\n}\n.barrier-free.aging-on .g-gkdhbox li {\n  font-size: 20px;\n}\n.barrier-free.aging-on .m-bmdh li {\n  width: 47%;\n  margin: 0 10px;\n}\n.barrier-free.aging-on .m-bmdh li:nth-child(4n+1),\n.barrier-free.aging-on .m-bmdh li:nth-child(4n+2) {\n  background: #f5f5f5;\n}\n.barrier-free.aging-on .m-bmdh li:nth-child(4n+3),\n.barrier-free.aging-on .m-bmdh li:nth-child(4n+4) {\n  background: unset;\n}\n.barrier-free.aging-on .m-xqdh li {\n  width: 47%;\n}\n.barrier-free.aging-on .g-gkdhbox li {\n  line-height: 56px;\n}\n.barrier-free.aging-on .m-bminfo li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-liststyle1 li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .g-openrgts .ztzl-box li {\n  width: 28%;\n  height: 150px;\n}\n.barrier-free.aging-on .g-openrgts .ztzl-box li a p {\n  line-height: 28px;\n  font-size: 20px;\n}\n.barrier-free.aging-on .m-tablelist table tbody tr td {\n  font-size: 18px;\n  line-height: 26px;\n}\n.barrier-free.aging-on .text-date span {\n  margin-right: 0;\n}\n.barrier-free.aging-on .backhome a {\n  font-size: 20px;\n}\n.barrier-free.aging-on .daoyu_main .info {\n  font-size: 22px;\n}\n.barrier-free.aging-on .flash {\n  width: 650px;\n  margin: 30px auto 60px auto;\n  zoom: 1.5;\n}\n.barrier-free.aging-on .flash.fl {\n  float: unset;\n}\n.barrier-free.aging-on .zt-news-list {\n  width: 100%;\n}\n.barrier-free.aging-on .zt-news-list li .date,\n.barrier-free.aging-on .zt-news-list li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .zt-ghlink ul li .img_title {\n  font-size: 26px;\n}\n.barrier-free.aging-on .zt-xxgklist ul li .date {\n  margin-left: 10px;\n}\n.barrier-free.aging-on .zt-xxgklist ul li .date,\n.barrier-free.aging-on .zt-xxgklist ul li .title a.tit {\n  font-size: 22px;\n}\n.barrier-free.aging-on .g-nav li a {\n  font-size: 28px;\n}\n.barrier-free.aging-on .m-location, .barrier-free.aging-on .m-location a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-listlf .u-tit {\n  font-size: 26px;\n}\n.barrier-free.aging-on .m-liststyle2 li span,\n.barrier-free.aging-on .m-liststyle2 li a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-liststyle2 li {\n  height: 48px;\n  line-height: 48px;\n}\n.barrier-free.aging-on .m-search .sub,\n.barrier-free.aging-on .m-search .text {\n  font-size: 24px;\n}\n.barrier-free.aging-on .m-rebangc ul li span,\n.barrier-free.aging-on .m-rebangc ul li a,\n.barrier-free.aging-on .u-rmss ul li a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-rdzt .u-tit span {\n  width: 180px;\n  font-size: 32px;\n  letter-spacing: 5px;\n}\n.barrier-free.aging-on .m-rebang {\n  height: auto;\n}\n.barrier-free.aging-on .m-rebangc ul li {\n  line-height: 36px;\n}\n.barrier-free.aging-on .m-rebangc .u-tit {\n  padding-top: 7px;\n}\n.barrier-free.aging-on .m-tszt ul li a {\n  font-size: 28px;\n}\n.barrier-free.aging-on .m-zt .u-tit {\n  font-size: 36px;\n  letter-spacing: 2px;\n}\n.barrier-free.aging-on .is-home-slider {\n  display: none;\n}\n.barrier-free.aging-on .zdxm-panel .title h2 {\n  font-size: 26px;\n}\n.barrier-free.aging-on .five-open .hd li {\n  height: 44px;\n  margin-right: 12px;\n  margin-bottom: 8px;\n}\n.barrier-free.aging-on .five-open .hd li a {\n  height: 44px;\n  line-height: 44px;\n  font-size: 24px;\n  padding: 0 7px;\n}\n.barrier-free.aging-on .zdxm-list li span,\n.barrier-free.aging-on .zdxm-list li a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .zdxm-list li {\n  height: 44px;\n  line-height: 44px;\n}\n.barrier-free.aging-on .lwlb-gklist li .title {\n  margin-right: 135px;\n}\n.barrier-free.aging-on .lwlb-gklist li {\n  font-size: 22px;\n}\n.barrier-free.aging-on .zt-xxgklist ul li {\n  height: 44px;\n  line-height: 44px;\n}\n.barrier-free.aging-on .m-xq ul li {\n  width: 240px;\n}\n.barrier-free.aging-on .m-xq ul li a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .u-mlqd ul li a {\n  font-size: 24px;\n}\n.barrier-free.aging-on .m-gztj-right {\n  width: 618px;\n}\n.barrier-free.aging-on .g-gztj-right li a {\n  font-size: 22px;\n  line-height: 36px;\n}\n.barrier-free.aging-on .m-liststyle1 li a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .m-rdxx li .g-rdxx-parent b,\n.barrier-free.aging-on .m-liststyle1 li span {\n  font-size: 22px;\n}\n.barrier-free.aging-on .g-home-box ul li {\n  width: 25%;\n}\n.barrier-free.aging-on .g-home-box ul li a span {\n  font-size: 22px;\n  line-height: 48px;\n}\n.barrier-free.aging-on .m-rdxx .bd {\n  height: 373px;\n}\n.barrier-free.aging-on .m-rdxx .bd .tempWrap {\n  zoom: 1.173;\n}\n.barrier-free.aging-on .m-rdxx li .g-rdxx-parent {\n  padding: 12px 20px;\n}\n.barrier-free.aging-on .m-rdxx li .g-rdxx-parent .g-rdxx-children a {\n  font-size: 20px;\n}\n.barrier-free.aging-on .g-daoyu p {\n  font-size: 20px;\n}\n.barrier-free.aging-on .footermain {\n  font-size: 24px !important;\n}\n.barrier-free.aging-on .footermain .footerlxwm,\n.barrier-free.aging-on .footermain .footerwzdt {\n  font-size: 24px !important;\n  width: 20% !important;\n}\n.barrier-free.aging-on .footnrbox {\n  background: #529ae4;\n}\n.barrier-free.aging-on .footermain .footnrbox {\n  width: 29%;\n  float: left !important;\n  margin: 0 1% 20px 1% !important;\n  height: 110px !important;\n  line-height: 30px !important;\n  padding: 12px 1% !important;\n  font-size: 24px !important;\n  box-sizing: content-box !important;\n}\n.barrier-free.aging-on .footerwzabs img {\n  height: auto !important;\n  min-height: auto !important;\n}\n.barrier-free.aging-on .footerjiucuo img, .barrier-free.aging-on .footerwzabs img {\n  padding-top: 28px;\n}\n.barrier-free.aging-on .footermain .footerzbdwxx {\n  width: 47% !important;\n  line-height: 36px !important;\n}\n.barrier-free.aging-on .footerbaxx {\n  line-height: 36px;\n}\n.barrier-free.aging-on .footermain {\n  width: 100% !important;\n}\n@media screen and (max-width: 1440px) {\n  .barrier-free.aging-on .tgqheadbox, .barrier-free.aging-on .tgqcbody, .barrier-free.aging-on .footermain .tgqcbody, .barrier-free.aging-on .linksbox {\n    width: 100% !important;\n  }\n}\n.barrier-free.aging-on .footermain .tgqcbody {\n  width: 1400px;\n}\n.barrier-free.aging-on .foot .link,\n.barrier-free.aging-on .friendlink_con,\n.barrier-free.aging-on .linksbox {\n  display: none;\n}\n.barrier-free.aging-on .footnav {\n  font-size: 20px;\n  line-height: 32px;\n}\n.barrier-free.aging-on .picwza {\n  left: -110px !important;\n}\n.barrier-free.aging-on .bot_jiucuo {\n  right: -100px;\n}\n.barrier-free.aging-on .wz_position {\n  font-size: 22px;\n}\n.barrier-free.aging-on .lm_top {\n  height: 48px;\n  line-height: 48px;\n  font-size: 24px;\n}\n.barrier-free.aging-on .navdh ul li {\n  padding: 0 0 18px 0;\n}\n.barrier-free.aging-on .navdh ul li a {\n  height: 42px;\n  line-height: 42px;\n  font-size: 22px;\n}\n.barrier-free.aging-on .navjz {\n  font-size: 22px;\n  height: calc(100% - 90px);\n}\n.barrier-free.aging-on .navjz ul li {\n  padding: 0 10px 0 25px;\n  background: url(icon.gif) 8px 22px no-repeat;\n  height: 44px;\n  line-height: 44px;\n  vertical-align: middle;\n  overflow: hidden;\n}\n.barrier-free.aging-on .navjz ul li .date {\n  font-size: 22px;\n}\n.barrier-free.aging-on .wzbjxx {\n  font-size: 20px;\n}\n.barrier-free.aging-on .wzbjxx a {\n  font-size: 20px;\n}\n.barrier-free.aging-on .newscontnet,\n.barrier-free.aging-on .wzcon {\n  zoom: 1.4;\n}\n.barrier-free.aging-on .wzbot1 {\n  font-size: 20px;\n}\n.barrier-free.aging-on .breadcrumb {\n  font-size: 22px;\n}\n.barrier-free.aging-on .table_suoyin {\n  font-size: 20px;\n}\n.barrier-free.aging-on .newsinfo {\n  font-size: 20px;\n}\n.barrier-free.aging-on .close01 a {\n  font-size: 20px;\n}\n.barrier-free.aging-on .table_suoyin {\n  font-size: 20px;\n}\n.barrier-free.aging-on div#qrcode + div {\n  line-height: 36px !important;\n  font-size: 22px !important;\n}\n.barrier-free.aging-on .article-main {\n  font-size: 20px;\n}\n.barrier-free.aging-on .article-main .content .setting {\n  font-size: 20px;\n}\n.barrier-free.aging-on .article-main .article {\n  zoom: 1.2;\n}\n.barrier-free.aging-on .article-main .content .setting .eyes {\n  width: 16px;\n  height: 16px;\n}\n.barrier-free.aging-on .g-openrg,\n.barrier-free.aging-on .TRS_Editor {\n  zoom: 1.2;\n}\n.barrier-free.aging-on .leaderwindow-main .content .col2 .banzi .people {\n  font-size: 22px;\n}\n.barrier-free.aging-on .leaderwindow-main .content .col1 .leader-person .pic-container .pic .name {\n  font-size: 22px;\n}\n.barrier-free.aging-on .leaderwindow-main {\n  font-size: 22px;\n}\n.barrier-free.aging-on .leaderwindow-main .content .col1 .leader-person .work .intro .topic span {\n  font-size: 22px;\n}\n.barrier-free.aging-on .leaderwindow-main .content .col1 ul {\n  font-size: 22px;\n}\n.barrier-free.aging-on .leaderwindow-main .content .col1 ul li {\n  height: 44px;\n  line-height: 44px;\n}\n.barrier-free.aging-on .g-ysqgktj table thead th {\n  font-size: 20px;\n}\n.barrier-free.aging-on .g-ysqgktj table td {\n  font-size: 20px;\n}\n.barrier-free.aging-on .ysq_info {\n  font-size: 18px;\n}\n.barrier-free.aging-on .m-zxsqtext {\n  font-size: 20px;\n}\n.barrier-free.aging-on .g-ysqgkbgxz table tbody td {\n  font-size: 20px;\n}\n.barrier-free.aging-on .g-ysqgkbgxz table {\n  font-size: 20px;\n}\n.barrier-free.aging-on .g-ysqgkbgxz table tbody td .btn {\n  height: 32px;\n  line-height: 32px;\n  font-size: 20px;\n}\n.barrier-free.aging-on .xxtl-title a {\n  font-size: 30px;\n  width: 200px;\n  height: 60px;\n  line-height: 60px;\n}\n.barrier-free.aging-on body {\n  background-size: 100% 24% !important;\n}\n.barrier-free.aging-on .tgqheadtop a {\n  font-size: 22px;\n}\n.barrier-free.aging-on .tgqheadbox {\n  width: 1400px;\n}\n.barrier-free.aging-on .tgqheadmain {\n  height: auto;\n}\n.barrier-free.aging-on .tgqheadmain .logo {\n  float: unset;\n}\n.barrier-free.aging-on .tgqheadlogo {\n  display: block;\n  margin: 0 auto;\n  width: 100%;\n}\n.barrier-free.aging-on .tgqheadlogo img {\n  display: block;\n  width: 60% !important;\n  margin: 30px auto;\n}\n.barrier-free.aging-on .navbox {\n  height: 180px !important;\n  line-height: 60px !important;\n  width: 100% !important;\n  float: right !important;\n  margin: 30px 0;\n}\n.barrier-free.aging-on .navbox ul {\n  display: block;\n}\n.barrier-free.aging-on .navbox > ul > :nth-child(n) {\n  clear: none !important;\n  float: left;\n  width: calc((100% - 30px) / 4) !important;\n  margin-right: 10px !important;\n  margin-bottom: 10px !important;\n  margin-top: 10px !important;\n  box-sizing: border-box;\n  margin-left: 0;\n  text-align: center;\n  border-radius: 6px;\n}\n.barrier-free.aging-on .navbox > ul > :nth-child(4n) {\n  margin-right: 0 !important;\n}\n.barrier-free.aging-on .navbox li {\n  font-size: 36px !important;\n  Letter-spacing: 1px;\n  line-height: 72px;\n  min-height: 72px;\n  max-height: 72px;\n  font-weight: 500;\n}\n.barrier-free.aging-on .tgqsearchbox {\n  width: 66%;\n  height: auto;\n}\n.barrier-free.aging-on .tgqsearchbox .search_btn,\n.barrier-free.aging-on .tgqsearchbox .search_text {\n  font-size: 32px;\n}\n.barrier-free.aging-on .tgqsearchbox form {\n  height: 64px;\n}\n.barrier-free.aging-on .tgqsearchbox .search_text {\n  height: 64px;\n  line-height: 64px;\n}\n.barrier-free.aging-on .tgqsearchbox .search_btn {\n  width: 150px;\n  height: 64px;\n}\n.barrier-free.aging-on .tgqsearchbox .tgqsearchby {\n  font-size: 30px;\n  line-height: 1.5;\n}\n.barrier-free.aging-on .tgqsearchbox .tgqsearchby > div {\n  font-size: 30px;\n  line-height: 1.5;\n}\n.barrier-free.aging-on .tgqsearchbox .tgqsearchby .searched {\n  margin: 0 10px 10px 0;\n}\n.barrier-free.aging-on .footer {\n  font-size: 20px !important;\n  line-height: 2 !important;\n}\n.barrier-free.aging-on .footer .dzjg {\n  margin-left: -550px !important;\n  top: 40px !important;\n}\n.barrier-free.aging-on .footer .jiucuo {\n  margin-right: -550px !important;\n  top: 50px !important;\n}\n.barrier-free.aging-on .toggleBtn {\n  display: none !important;\n}\n.barrier-free.aging-on .container {\n  width: 1400px;\n}\n\nhtml.barrier-free.mobile-on .gknewsbox {\n  width: 100%;\n  height: auto;\n  padding-top: 36px;\n}\nhtml.barrier-free.mobile-on .zddhbox {\n  height: auto;\n  padding: 8px 4px;\n}\nhtml.barrier-free.mobile-on .zddh_wz {\n  width: 100vw;\n  height: auto;\n}\nhtml.barrier-free.mobile-on .zddh_wz ul li {\n  width: calc(100% - 35px);\n}\nhtml.barrier-free.mobile-on .zddh_wz {\n  height: auto;\n}\nhtml.barrier-free.mobile-on .newsphbox, html.barrier-free.mobile-on .fbhbox {\n  box-sizing: border-box;\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .zwgkxdbox {\n  width: 100%;\n  box-sizing: border-box;\n}\nhtml.barrier-free.mobile-on .zwgk_list_jdbz ul li.num2, html.barrier-free.mobile-on .zwgk_list_jdbz ul li.num3 {\n  width: 50%;\n}\nhtml.barrier-free.mobile-on .zwgk_list ul li#last {\n  width: 50%;\n}\nhtml.barrier-free.mobile-on .zcjdbox {\n  width: 100%;\n  height: auto;\n  box-sizing: border-box;\n}\nhtml.barrier-free.mobile-on .zcjdlist ul li {\n  width: 30%;\n}\nhtml.barrier-free.mobile-on .home_web {\n  display: none;\n}\nhtml.barrier-free.mobile-on .hdjlbtn {\n  float: none;\n}\nhtml.barrier-free.mobile-on .hygqbtn {\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .hygqbtn ul li {\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .hygqbox {\n  margin-left: 0px;\n}\nhtml.barrier-free.mobile-on .zcjdtitle {\n  height: 80px;\n}\nhtml.barrier-free.mobile-on .zdlybox {\n  height: auto;\n}\nhtml.barrier-free.mobile-on .gklmlistbox {\n  float: unset;\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .gklistbody {\n  width: 100%;\n  height: auto;\n}\nhtml.barrier-free.mobile-on .newgklist ul li {\n  width: 46%;\n  margin-bottom: 10px;\n}\nhtml.barrier-free.mobile-on .gklistw {\n  margin-right: 25px;\n}\nhtml.barrier-free.mobile-on #myFocus01 .pic {\n  zoom: 0.3;\n}\nhtml.barrier-free.mobile-on .hfgg .mF_tbhuabao .prev,\nhtml.barrier-free.mobile-on .hfgg .mF_tbhuabao .next {\n  top: 1.8vw !important;\n}\nhtml.barrier-free.mobile-on .hfgg {\n  height: 75px;\n}\nhtml.barrier-free.mobile-on .tgqheadmain {\n  height: auto;\n}\nhtml.barrier-free.mobile-on .hfgg .mF_tbhuabao {\n  height: 83px !important;\n}\nhtml.barrier-free.mobile-on .gklist ul li .name,\nhtml.barrier-free.mobile-on .gklist li .name {\n  font-size: 18px;\n}\nhtml.barrier-free.mobile-on .gklist ul li .name:hover,\nhtml.barrier-free.mobile-on .gklist li.active .name {\n  font-size: 18px;\n  font-weight: bold;\n}\nhtml.barrier-free.mobile-on .header {\n  height: auto;\n  background: white;\n}\nhtml.barrier-free.mobile-on .head {\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .topleft ul li {\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .topleft {\n  width: 180px;\n}\nhtml.barrier-free.mobile-on .czjj-ban .num1 a img,\nhtml.barrier-free.mobile-on .logo .num1 a img {\n  width: 100%;\n  height: auto;\n}\nhtml.barrier-free.mobile-on .ban {\n  height: 170px;\n  background-position-y: 44px !important;\n}\nhtml.barrier-free.mobile-on .header .head .menu ul {\n  display: grid;\n  background: #015699;\n}\nhtml.barrier-free.mobile-on .menu {\n  height: auto;\n}\nhtml.barrier-free.mobile-on .czjj-list ul li {\n  width: 100%;\n  height: 50px;\n  line-height: 24px;\n  padding-top: 4px;\n}\nhtml.barrier-free.mobile-on .wza_top {\n  top: 65px;\n}\nhtml.barrier-free.mobile-on .is-header .u-banner {\n  margin: 55px 0 20px 0;\n}\nhtml.barrier-free.mobile-on .g-daoyu p {\n  padding-left: 80px;\n}\nhtml.barrier-free.mobile-on body {\n  min-width: unset;\n  width: 100%;\n}\nhtml.barrier-free.mobile-on .container {\n  width: 100%;\n}\n\nbody.barrier-free.aging-mob {\n  min-width: unset;\n  width: 100%;\n}\nbody.barrier-free.aging-mob .gknewsbox {\n  width: 100%;\n  height: auto;\n  padding-top: 36px;\n}\nbody.barrier-free.aging-mob .zddhbox {\n  height: auto;\n  padding: 8px 4px;\n}\nbody.barrier-free.aging-mob .zddh_wz {\n  width: 100vw;\n  height: auto;\n}\nbody.barrier-free.aging-mob .zddh_wz ul li {\n  width: calc(100% - 35px);\n}\nbody.barrier-free.aging-mob .zddh_wz {\n  height: auto;\n}\nbody.barrier-free.aging-mob .newsphbox, body.barrier-free.aging-mob .fbhbox {\n  box-sizing: border-box;\n  width: 100%;\n}\nbody.barrier-free.aging-mob .zwgkxdbox {\n  width: 100%;\n  box-sizing: border-box;\n}\nbody.barrier-free.aging-mob .zwgk_list_jdbz ul li.num2, body.barrier-free.aging-mob .zwgk_list_jdbz ul li.num3 {\n  width: 50%;\n}\nbody.barrier-free.aging-mob .zwgk_list ul li#last {\n  width: 50%;\n}\nbody.barrier-free.aging-mob .zcjdbox {\n  width: 100%;\n  height: auto;\n  box-sizing: border-box;\n}\nbody.barrier-free.aging-mob .zcjdlist ul li {\n  width: 30%;\n}\nbody.barrier-free.aging-mob .home_web {\n  display: none;\n}\nbody.barrier-free.aging-mob .hdjlbtn {\n  float: none;\n}\nbody.barrier-free.aging-mob .hygqbtn {\n  width: 100%;\n}\nbody.barrier-free.aging-mob .hygqbtn ul li {\n  width: 100%;\n}\nbody.barrier-free.aging-mob .hygqbox {\n  margin-left: 0px;\n}\nbody.barrier-free.aging-mob .zcjdtitle {\n  height: 80px;\n}\nbody.barrier-free.aging-mob .zdlybox {\n  height: auto;\n}\nbody.barrier-free.aging-mob .gklmlistbox {\n  float: unset;\n  width: 100%;\n}\nbody.barrier-free.aging-mob .gklistbody {\n  width: 100%;\n  height: auto;\n}\nbody.barrier-free.aging-mob .newgklist ul li {\n  width: 46%;\n  margin-bottom: 10px;\n}\nbody.barrier-free.aging-mob .gklistw {\n  margin-right: 25px;\n}\nbody.barrier-free.aging-mob #myFocus01 .pic {\n  zoom: 0.3;\n}\nbody.barrier-free.aging-mob .hfgg .mF_tbhuabao .prev,\nbody.barrier-free.aging-mob .hfgg .mF_tbhuabao .next {\n  top: 1.8vw !important;\n}\nbody.barrier-free.aging-mob .hfgg {\n  height: 75px;\n}\nbody.barrier-free.aging-mob .tgqheadmain {\n  height: auto;\n}\nbody.barrier-free.aging-mob .hfgg .mF_tbhuabao {\n  height: 83px !important;\n}\nbody.barrier-free.aging-mob .gklist ul li .name,\nbody.barrier-free.aging-mob .gklist li .name {\n  font-size: 18px;\n}\nbody.barrier-free.aging-mob .gklist ul li .name:hover,\nbody.barrier-free.aging-mob .gklist li.active .name {\n  font-size: 18px;\n  font-weight: bold;\n}\nbody.barrier-free.aging-mob .header {\n  height: auto;\n  background: white;\n}\nbody.barrier-free.aging-mob .head {\n  width: 100%;\n}\nbody.barrier-free.aging-mob .topleft ul li {\n  width: 100%;\n}\nbody.barrier-free.aging-mob .topleft {\n  width: 180px;\n}\nbody.barrier-free.aging-mob .czjj-ban .num1 a img,\nbody.barrier-free.aging-mob .logo .num1 a img {\n  width: 100%;\n  height: auto;\n}\nbody.barrier-free.aging-mob .ban {\n  height: 170px;\n  background-position-y: 44px !important;\n}\nbody.barrier-free.aging-mob .header .head .menu ul {\n  display: grid;\n  background: #015699;\n}\nbody.barrier-free.aging-mob .menu {\n  height: auto;\n}\nbody.barrier-free.aging-mob .czjj-list ul li {\n  width: 100%;\n  height: 50px;\n  line-height: 24px;\n  padding-top: 4px;\n}\nbody.barrier-free.aging-mob .wza_top {\n  top: 65px;\n}\nbody.barrier-free.aging-mob .is-header .u-banner {\n  margin: 55px 0 20px 0;\n}\nbody.barrier-free.aging-mob .g-daoyu p {\n  padding-left: 80px;\n}\nbody.barrier-free.aging-mob .is-header a span div {\n  font-size: 30px !important;\n  line-height: 43px !important;\n}\nbody.barrier-free.aging-mob .container {\n  width: 100%;\n}";

  var AudioUtil = /*#__PURE__*/function () {
    function AudioUtil(baseUrl) {
      _classCallCheck(this, AudioUtil);

      this.baseUrl = baseUrl;
      this.playMap = new Map();
    }

    _createClass(AudioUtil, [{
      key: "playAudio",
      value: function playAudio(text) {
        var uuid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();
        var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var onstart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var onend = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

        if (!text) {
          return;
        }

        text = text.trim();

        if (0 === text.length) {
          return;
        }

        this.current = uuid;

        var _iterator = _createForOfIteratorHelper(this.playMap.values()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pause = _step.value;
            pause();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.playMap.clear();
        Audio$1.lastText = text;

        if (window.PlaySignLanguage && Audio$1.isAudio) {
          window.PlaySignLanguage(text);
        } // LOG.print('systemAudioAction', window.speechSynthesis, window.speechSynthesis.getVoices())


        if (window.speechSynthesis && window.speechSynthesis.getVoices().length > 0) {

          this.systemAudioAction(uuid, text, speed, onstart, onend);
        } else {

          try {
            this.playRemoteAudio(uuid, text, speed, onstart, onend);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }, {
      key: "playRemoteAudio",
      value: function playRemoteAudio(uuid, text, speed, onstart, onend) {
        var _this = this;

        //this.cors()
        //*
        text = encodeURIComponent(text); // const url = this.baseUrl + `/../tts?text=${text}&rate=${speed}&usecache=false`

        var obj = {
          text: text,
          rate: speed,
          usecache: false
        };
        var data = btoa(JSON.stringify(obj)); //const url = this.baseUrl + `/ttss?data=${data}`

        this.baseUrl.split(/\/dl/)[0]; // const url = 'https://keenbow.com' + `/tts?text=${text}&rate=${speed}`

        var url = 'https://keenbow.com' + "/ttss?data=".concat(data); // const url = 'http://192.168.0.9:10002' + `/ttss?data=${data}`

        var fn = function fn(res) {
          // console.log('res', res)
          LOG.debug('res', _typeof(res), res); // let blob = new Blob([res.slice()], { type: 'audio/wav' })
          // let blobUrl = window.URL.createObjectURL(blob)

          var blobUrl = window.URL.createObjectURL(res);
          var audio = new Audio(blobUrl);

          if (Audio$1.isAudio && uuid === _this.current) {
            console.log('audio play start');

            if (onstart) {
              onstart();
            }

            audio.onended = function () {
              console.log('audio play end');

              if (onend) {
                onend();
              }
            };

            audio.play() // 播放
            .catch(function (error) {
              console.log("Chrome cannot play sound without user interaction first");
            });

            _this.playMap.set(uuid, function () {
              audio.pause();
            });
          }
        };

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onreadystatechange = function () {
          // readyState == 4说明请求已完成
          if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            // 从服务器获得数据
            LOG.debug('xhr', _typeof(xhr.response), xhr);
            fn(xhr.response); //fn(xhr.responseText);
          }
        };

        xhr.send();
      }
    }, {
      key: "systemAudioAction",
      value: function systemAudioAction(uuid, text, speed, onstart, onend) {
        var synth = window.speechSynthesis;
        synth.cancel();
        var msg = new SpeechSynthesisUtterance();
        msg.text = text; // 文字内容

        msg.lang = "zh-CN"; // 使用的语言:中文

        msg.volume = 1; // 声音音量：1

        msg.rate = speed; // 语速：1

        msg.pitch = 1; // 音高：1

        msg.voice = this.getWindowVoice(); // 使用本地服务合成语音(若是获取不到 请异步获取, 加一个setTimeout)
        // console.log('systemAudioAction speechSynthesis', window.speechSynthesis)
        // console.log('systemAudioAction voice', msg.voice, window.speechSynthesis.getVoices())

        msg.onstart = function () {
          console.log('play onstart');

          if (onstart) {
            onstart();
          }
        };

        msg.onend = function () {
          console.log('play end');

          if (onend) {
            onend();
          }
        }; // console.log(uuid, this.current)


        if (Audio$1.isAudio && uuid === this.current) {
          synth.speak(msg); // 播放

          this.playMap.set(uuid, function () {
            synth.cancel();
          });
        } // return synth

      }
    }, {
      key: "getWindowVoice",
      value: function getWindowVoice() {
        // 获取浏览器中语音 (中文 + 本地服务)
        return window.speechSynthesis.getVoices().find(function (item) {
          return item.localService && item.lang === 'zh-CN';
        });
      }
    }]);

    return AudioUtil;
  }();

  var TopBar = {
    init: function init(core) {
      var namespace = core.config.namespace;
      this.namespace = namespace; // console.log('topbar-base-style', styles, stylesTest)

      core.creatStyle('topbar-base-style', styles$3);
      core.creatStyle('topbar-test-style', stylesTest, true);
      core.creatStyle('topbar-style', Theme.styles); // core.creatHtml('topbar-html',tmpl)

      core.creatHtml('topbar-html', Theme.util); // this.isFullScreen = cookie.get('fullscreen',namespace)

      this.isFullScreen = false;
      this.isFixed = true;
      this.colorState = 0;
      this.signSpeed = '1.0';
      var url = '';

      try {
        url = document.currentScript.src;

        if (url) {//return src;
        } else {
          null.split();
        }
      } catch (e) {

        if (e.fileName) {
          url = e.fileName;
        } // Safari
        else if (e.sourceURL) {
          url = e.sourceURL;
        } // Opera 9
        else if (e.stacktrace) {
          url = (e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m) || ["", ""])[1];
        } // Chrome 4+/IE 10+
        else if (e.stack) {
          url = (e.stack.match(/((http|file)\:\/{2,3}\S+\/\S+\.[a-z0-9]+)/i) || ['', ''])[1];
        }
      }

      this.url = url;
      this.audioUtil = core.audioUtil; // this.audioUtil.playAudio('测试')
      // let aelem = '<a id="ariaTipText" role="pagedescription" aria-label="欢迎进入铜陵市铜官区人民政府，盲人用户使用操作智能引导，请按快捷键Ctrl+Alt+R；阅读详细操作说明请按快捷键Ctrl+Alt+问号键。" aria-atomic="true" href="javascript:void(0)" class="skipAutoFix" style="width: 1px; height: 1px;"><img src="" style="width:1px !important;height:1px !important;position:absolute;top:0;"></a>'
      // document.body.insertAdjacentHTML('afterbegin', aelem)
    },
    setEvents: function setEvents(core) {
      var _this = this;

      var namespace = core.config.namespace; // const BtnClose = document.getElementById(`${namespace}-close`)

      Theme.DomHandler.init(namespace);
      var _Theme$DomHandler$ele = //Theme.DomHandler.elements(namespace)
      Theme.DomHandler.elems,
          BtnClose = _Theme$DomHandler$ele.BtnClose,
          BtnClose2 = _Theme$DomHandler$ele.BtnClose2,
          BtnClose3 = _Theme$DomHandler$ele.BtnClose3,
          BtnReset = _Theme$DomHandler$ele.BtnReset,
          BtnReset2 = _Theme$DomHandler$ele.BtnReset2,
          BtnReset3 = _Theme$DomHandler$ele.BtnReset3,
          BtnChangeColor = _Theme$DomHandler$ele.BtnChangeColor,
          BtnReadScreen = _Theme$DomHandler$ele.BtnReadScreen,
          BtnReadScreen2 = _Theme$DomHandler$ele.BtnReadScreen2,
          BtnSign = _Theme$DomHandler$ele.BtnSign,
          BtnReturnmain = _Theme$DomHandler$ele.BtnReturnmain,
          BtnSignSpeed = _Theme$DomHandler$ele.BtnSignSpeed,
          BtnRepeat = _Theme$DomHandler$ele.BtnRepeat,
          BtnHelp = _Theme$DomHandler$ele.BtnHelp,
          BtnHelp2 = _Theme$DomHandler$ele.BtnHelp2,
          BtnFix = _Theme$DomHandler$ele.BtnFix,
          BtnFix2 = _Theme$DomHandler$ele.BtnFix2,
          BtnFix3 = _Theme$DomHandler$ele.BtnFix3,
          BtnShortcut = _Theme$DomHandler$ele.BtnShortcut,
          BtnFullscreen = _Theme$DomHandler$ele.BtnFullscreen,
          PanelSign = _Theme$DomHandler$ele.PanelSign;
      document.getElementById("".concat(namespace, "-topbar-html-content"));
      var toolbar = document.getElementById("".concat(namespace, "-topbar-html")); // console.log('1')

      document.addEventListener('mousemove', function (ev) {
        //console.log(ev.pageY, document.documentElement.scrollTop);
        if (!_this.isFixed) {
          var delta = ev.pageY - document.documentElement.scrollTop;

          if (30 > delta && 0 < delta) {
            //console.log('-');
            // document.body.style.marginTop = '100px'
            // toolbar.style.display = 'block'
            toolbar.style.setProperty('display', 'block', 'important');
          } else if (100 < delta) {
            //console.log('0');
            // document.body.style.marginTop = '0px'
            // toolbar.style.display = 'none'
            toolbar.style.setProperty('display', 'none', 'important');
          }
        }
      });
      document.addEventListener('mouseout', function (ev) {
        //console.log('out', ev.pageY)
        if (!_this.isFixed) {
          var delta = ev.pageY - document.documentElement.scrollTop;

          if (0 > delta) {
            // toolbar.style.display = 'none'
            toolbar.style.setProperty('display', 'none', 'important');
          }
        }
      });

      BtnHelp.onclick = function () {
        openHelp();
      };

      BtnHelp2.onclick = function () {
        openHelp();
      };

      var openHelp = function openHelp() {
        window.open("".concat(_this.url, "/../../help.html"), "_blank");
      };

      document.body.addHotKey(["Control", "alt", "/"], function (el) {
        return openHelp();
      }); // console.log('t--1')

      var fixFn = function fixFn() {
        _this.isFixed = !_this.isFixed;

        if (_this.isFixed) {
          document.body.style.marginTop = '100px';
          Tools.setBtnImgState(BtnFix, 'on'); // toolbar.style.display = 'block';

          toolbar.style.setProperty('display', 'block', 'important');
        } else {
          document.body.style.marginTop = '0px';
          Tools.setBtnImgState(BtnFix, 'off');
        }
      };

      BtnFix.onclick = function () {
        fixFn();
      };

      try {
        BtnFix2.onclick = function () {
          fixFn();
        };

        BtnFix3.onclick = function () {
          fixFn();
        };
      } catch (e) {}

      document.body.addHotKey(["Control", "alt", "l"], function (el) {
        if (!core.opened) {
          return;
        }

        fixFn();
      });

      BtnClose.onclick = function () {
        core.close();
      };

      BtnClose2.onclick = function () {
        core.close();
      };

      BtnClose3.onclick = function () {
        core.close();
      };

      document.body.addHotKey(["Control", "alt", "e"], function (el) {
        return core.close();
      });

      BtnReset.onclick = function () {
        // LOG.debug('BtnReset.onclick')
        // this.audioUtil.playAudio('测试')
        closeReadScreen();
        core.resetAction();
      };

      BtnReset2 ? BtnReset2.onclick = function () {
        closeReadScreen();
        core.resetAction();
      } : null;
      BtnReset3 ? BtnReset3.onclick = function () {
        closeReadScreen();
        core.resetAction();
      } : null;
      document.body.addHotKey(["Control", "alt", "c"], function (el) {
        return core.resetAction();
      }); // console.log('---2')

      BtnShortcut && (BtnShortcut.onclick = function () {
        var content = "[{000214A0-0000-0000-C000-000000000046}] \n\nProp3=19,11  \n\n[InternetShortcut]  \n\nIDList= \n\nURL=".concat(location.href, " \n\nIconFile=").concat(location.protocol, "//").concat(location.hostname, "/favicon.ico \n\nIconIndex=1 \n\n");

        var funDownload = function funDownload(content, filename) {
          var eleLink = document.createElement("a");
          eleLink.download = filename; // eleLink.style.display = "none";

          eleLink.style.setProperty('display', 'none', 'important');
          var blob = new Blob([content]);
          eleLink.href = URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        };

        var sitename = document.title;
        funDownload(content, sitename + ".url");
      });
      BtnFullscreen && (BtnFullscreen.onclick = function () {
        var element = document.documentElement;

        if (_this.isFullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }

          Tools.setBtnImgState(BtnFullscreen, 'on');
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }

          Tools.setBtnImgState(BtnFullscreen, 'off');
        }

        _this.isFullScreen = !_this.isFullScreen;
      }); // console.log('---3')

      var changeColor = function changeColor() {
        var stylesheet = document.styleSheets[0]; //stylesheet.insertRule(".demo { background: yellow;}", 0);
        //console.log(stylesheet.cssRules[0].cssText);
        // console.log(this.lastColorCssText, stylesheet.cssRules[0].cssText);

        console.log('changeColor', _this.lastColorCssText, stylesheet.cssRules[0].cssText);

        if (stylesheet.cssRules && stylesheet.cssRules[0] && stylesheet.cssRules[0].cssText.startsWith('.barrier-free { background')) {
          stylesheet.deleteRule(0);
        }

        switch (_this.colorState) {
          case 0:
            _this.colorState = 1;
            _this.lastColorCssText = ".barrier-free { background-color: white !important; color: black !important;}";
            BtnChangeColor.title = utilLabel.BtnChangeColor$mode1title;
            Audio$1.playAudio(utilLabel.BtnChangeColor$mode1hint);
            break;

          case 1:
            _this.colorState = 2;
            _this.lastColorCssText = ".barrier-free { background-color: #0000FF !important; color: #FFFF00 !important;}";
            BtnChangeColor.title = utilLabel.BtnChangeColor$mode2title;
            Audio$1.playAudio(utilLabel.BtnChangeColor$mode2hint);
            break;

          case 2:
            _this.colorState = 3;
            _this.lastColorCssText = ".barrier-free { background-color: #FFFF00 !important; color: black !important;}";
            BtnChangeColor.title = utilLabel.BtnChangeColor$mode3title;
            Audio$1.playAudio(utilLabel.BtnChangeColor$mode3hint);
            break;

          case 3:
            _this.colorState = 4;
            _this.lastColorCssText = ".barrier-free { background-color: black !important; color: #FFFF00 !important;}";
            BtnChangeColor.title = utilLabel.BtnChangeColor$mode4title;
            Audio$1.playAudio(utilLabel.BtnChangeColor$mode4hint);
            break;

          default:
            _this.colorState = 0;
            BtnChangeColor.title = utilLabel.BtnChangeColor$mode0title;
            Audio$1.playAudio(utilLabel.BtnChangeColor$mode0hint);
            break;
        }

        if (0 != _this.colorState) {
          stylesheet.insertRule(_this.lastColorCssText, 0);
        }
      };

      BtnChangeColor.onclick = function () {
        return changeColor();
      };

      document.body.addHotKey(["Control", "alt", "t"], function (el) {
        return changeColor();
      });

      BtnSignSpeed.onclick = function () {
        switch (_this.signSpeed) {
          case '1.0':
            _this.signSpeed = '1.5';
            break;

          case '1.5':
            _this.signSpeed = '2.0';
            break;

          case '2.0':
            _this.signSpeed = '2.5';
            break;

          case '2.5':
            _this.signSpeed = '1.0';
            break;
        }

        document.getElementById("".concat(namespace, "-sign-speed-value")).innerText = _this.signSpeed;

        if (window.ModifyPlaySpeed) {
          window.ModifyPlaySpeed(_this.signSpeed);
        }
      };

      BtnRepeat.onclick = function () {
        Audio$1.playAudio(Audio$1.lastText);
      };

      var closeReadScreen = function closeReadScreen() {
        // document.getElementById(`${namespace}-topbar-html-content-1`).style.display = 'inline-block';

        document.getElementById("".concat(namespace, "-topbar-html-content-2")).style.setProperty('display', 'none', 'important');
        !PanelSign ? null : PanelSign.style.setProperty('display', 'none', 'important');
        document.getElementById("".concat(namespace, "-topbar-html-content-1")).style.setProperty('display', 'inline-block', 'important');

        var _iterator = _createForOfIteratorHelper(document.getElementsByTagName('*')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var element = _step.value;
            element.classList.remove('barrier-free-active');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      var openReadScreen = function openReadScreen() {
        // document.getElementById(`${namespace}-topbar-html-content-1`).style.display = 'none';

        document.getElementById("".concat(namespace, "-topbar-html-content-2")).style.setProperty('display', 'contents', 'important');
        document.getElementById("".concat(namespace, "-topbar-html-content-1")).style.setProperty('display', 'none', 'important');
        var regionMap = core.regionMap;
        document.getElementsByTagName('*');
        var indexMap = new Map(); // let keys = ['!', '@', '#', '$', '%', '^'];

        var keys = ['1', '2', '3', '4', '5', '6'];
        ['navigation', 'window', 'interact', 'service', 'list', 'main'].forEach(function (e, i) {
          var btn = document.getElementById("".concat(namespace, "-topbar-").concat(e, "-btn"));
          var reginData = regionMap.get(e);

          if (reginData) {
            btn.getElementsByClassName('value')[0].innerHTML = reginData.length;

            {
              btn.nextElementSibling.style.display = 'none';
            }
          } // btn.nextElementSibling.style.display = 'none';


          btn.onclick = function () {
            var index = indexMap.get(e) || 0; //console.log(document.documentElement.scrollTop);
            // console.log(regionMap.get(e)[index]);

            var target = regionMap.get(e)[index];
            Tools.ActivateLinkage(target);
            Tools.ActivateElem(target);
            index = (index + 1) % regionMap.get(e).length;
            LOG.debug(index, regionMap.get(e).length);
            indexMap.set(e, index);
          };

          LOG.debug('xx btn.onclick', e, btn, btn.onclick); // document.body.addHotKey(["alt", i+1], btn.onclick)
          // document.body.addHotKey(["shift", keys[i]], btn.onclick)

          document.body.addHotKey(["alt", keys[i]], btn.onclick);
        });
      };

      document.body.addHotKey(["Control", "ArrowDown"], function (el) {
        var target = document.body.getElementsByClassName('barrier-free-active')[0];
        var role = target.getAttribute('aria-role');

        if ('tab' == role) {
          var linkage = target.getAttribute('aria-linkage'); //console.log('----------linkage', linkage);

          if (linkage) {
            var target_linkage = document.querySelector(linkage);
            Tools.ActivateElem(target_linkage);
          }
        }
      });

      BtnReadScreen.onclick = function () {
        openReadScreen();
      };

      BtnReadScreen2.onclick = function () {
        closeReadScreen();
      };

      document.body.addHotKey(["Control", "alt", "r"], function (el) {
        if (!core.opened) {
          core.doOpen();
          openReadScreen();
        } else {
          if ('contents' == document.getElementById("".concat(namespace, "-topbar-html-content-2")).style.display) {
            // document.getElementById(`${namespace}-topbar-html-content-2`).style.display = 'none';
            document.getElementById("".concat(namespace, "-topbar-html-content-2")).style.setProperty('display', 'none', 'important');
            document.getElementById("".concat(namespace, "-topbar-html-content-1")).style.setProperty('display', 'inline-block', 'important');
          } else {
            // document.getElementById(`${namespace}-topbar-html-content-2`).style.display = 'block';
            document.getElementById("".concat(namespace, "-topbar-html-content-2")).style.setProperty('display', 'contents', 'important');
          }
        }
      });

      BtnSign.onclick = function () {
        // document.getElementById(`${namespace}-topbar-html-content-1`).style.display = 'none';//.setProperty('font-size', '1.3rem', 'important');

        document.getElementById("".concat(namespace, "-topbar-html-content-3")).style.setProperty('display', 'contents', 'important');
        document.getElementById("".concat(namespace, "-topbar-html-content-1")).style.setProperty('display', 'none', 'important');
      };

      BtnReturnmain.onclick = function () {
        // document.getElementById(`${namespace}-topbar-html-content-1`).style.display = 'inline-block';

        document.getElementById("".concat(namespace, "-topbar-html-content-3")).style.setProperty('display', 'none', 'important');
        document.getElementById("".concat(namespace, "-topbar-html-content-1")).style.setProperty('display', 'inline-block', 'important');
      };

      if (isFirefox()) ;
    },
    mouseOver: function mouseOver(event) {
      var event = window.event || event;
      var target = event.target || event.srcElement;
      /*if(target.tagName !== 'IMG') {
          return
      }*/

      var __name = target.getAttribute('name');

      var __hover = target.getAttribute('hover-src'); // console.log('name', name)


      if (__name == 'audio') {
        if (cookie.get('audio', TopBar.namespace)) {
          target.src = __hover;
        } else {
          target.src = target.getAttribute('selected-hover-src');
        }
      } else if (__name == 'overead') {
        if (cookie.get('overead', TopBar.namespace)) {
          target.src = target.getAttribute('source-src');
        } else {
          target.src = __hover;
        }
      } else {
        target.src = __hover;
      }
    },
    mouseOut: function mouseOut(event) {
      var event = window.event || event;
      var target = event.target || event.srcElement;

      if (target.tagName !== 'IMG') {
        return;
      }

      var __name = target.getAttribute('name');

      var __source = target.getAttribute('source-src');

      if (__name == 'audio') {
        if (cookie.get('audio', TopBar.namespace)) {
          target.src = __source;
        } else {
          target.src = target.getAttribute('selected-src');
        }
      } else if (__name == 'speed') {
        if (cookie.get('speed', TopBar.namespace) == 'fast') {
          target.src = target.getAttribute('selected-src');
        } else {
          target.src = __source;
        }
      } else if (__name == 'overead') {
        if (cookie.get('overead', TopBar.namespace)) {
          target.src = target.getAttribute('selected-src');
        } else {
          target.src = __source;
        }
      } else {
        target.src = __source;
      }
    },
    reset: function reset() {
      try {
        var stylesheet = document.styleSheets[0]; //stylesheet.insertRule(".demo { background: yellow;}", 0);
        //console.log(stylesheet.cssRules[0].cssText);
        // console.log(this.lastColorCssText, stylesheet.cssRules[0].cssText);

        if (stylesheet.cssRules[0].cssText.startsWith('.barrier-free { background')) {
          stylesheet.deleteRule(0);
        }

        this.colorState = 0;
        document.getElementById("".concat(this.namespace, "-change-color")).title = utilLabel.BtnChangeColor$mode0title;
      } catch (e) {
        console.warn(e);
      }
    }
  };

  var Theme = {
    init: function init(core) {
      var namespace = core.config.namespace;
      this.namespace = namespace;

      {
        this.util = utilHtml;
        this.DomHandler = DomHandler;
        this.styles = stylesSH;
      }
    },
    setEvents: function setEvents(core) {}
  };

  var Audio$1 = {
    init: function init(core) {
      var _core$config = core.config,
          namespace = _core$config.namespace,
          url = _core$config.url;
      this.body = document.body;
      this.namespace = namespace;
      this.AudioApi = url;
      core.creatStyle('audio-style', styles$5);
      core.creatHtml('audio-html', BigTextHtml$1);
      this.isAudio = cookie.get('audio', namespace);
      this.isOveread = cookie.get('overead', namespace);
      this.isReadMode0 = true;
      this.core = core;
      this.lastText = '';
      this.audioUtil = core.audioUtil;

      try {
        LOG.debug('sss', this.isAudio);

        if (false !== this.isAudio && 'false' !== this.isAudio) {
          this.isAudio = true;
        }

        this.stopAudio();
      } catch (e) {}
    },
    setEvents: function setEvents(core) {
      var _this = this;

      var namespace = core.config.namespace;
      this.registeDom(namespace);
      this.toggleAudio();

      if (this.isAudio) {
        Theme.DomHandler.onAudio();
        this.addEventMove();
        addEvent(document, 'click', this.forceSafariPlayAudio); // 苹果浏览器需要用户跟浏览器有个交互才可以播放语音
      } else {
        // this.audioTabImg.src = this.audioTabImg.getAttribute('selected-src')
        Theme.DomHandler.offAudio();
      }

      switch (this.speed) {
        case '0.5':
          Theme.DomHandler.lowSpeed();
          break;

        case '1':
          Theme.DomHandler.normalSpeed();
          break;

        case '1.5':
          Theme.DomHandler.highSpeed();
          break;
      }

      var fn = function fn() {
        if (_this.isReadMode0) {
          Theme.DomHandler.setReadMode1();
          Audio$1.playAudio(utilLabel.BtnReadMode$mode1hint);
        } else {
          Theme.DomHandler.setReadMode0();
          Audio$1.playAudio(utilLabel.BtnReadMode$mode0hint);
        }

        _this.isReadMode0 = !_this.isReadMode0;
      };

      Theme.DomHandler.elems.BtnReadMode
      /*BtnReadMode*/
      .onclick = function () {
        fn();
      };

      document.body.addHotKey(["Control", "alt", "f"], function (el) {
        return fn();
      });
    },
    registeDom: function registeDom(namespace) {
      this.audio = document.getElementById("".concat(namespace, "-audio-media")) || '';
      this.speed = cookie.get('speed', namespace);
      this.speedTab = document.getElementById("".concat(namespace, "-audio-speed")) || '';
      this.speedTabImg = this.speedTab.getElementsByTagName('img')[0];
    },
    toggleAudio: function toggleAudio() {
      var _this2 = this;

      var namespace = Audio$1.namespace;

      Theme.DomHandler.elems.BtnAudioTab
      /*this.audioTab*/
      .onclick = function () {
        if (_this2.isAudio) {
          Audio$1.playAudio(audioTabText.audioClose);

          _this2.closeAudio(1000);
        } else {
          _this2.showAudio();

          Audio$1.playAudio(audioTabText.audioOpen);
        }
      };

      Theme.DomHandler.elems.BtnAudioTab2
      /*this.audioBtn2*/
      .onclick = function () {
        if (_this2.isAudio) {
          _this2.closeAudio();
        } else {
          _this2.showAudio();

          Audio$1.playAudio(audioTabText.audioOpen);
        }
      }; // console.log('onshortcut', document.body.onshortcut)


      document.body.addHotKey(["Control", "alt", "v"], function (el) {
        if (_this2.isAudio) {
          _this2.closeAudio();
        } else {
          _this2.showAudio();

          _this2.playAudio(audioTabText.audioOpen);
        }
      });

      var fn = function fn() {
        if (_this2.speed == '1.5') {
          _this2.speed = '0.5';
          Theme.DomHandler.lowSpeed();
          Audio$1.playAudio(audioTabText.speedSlow);
        } else if (_this2.speed == '0.5') {
          _this2.speed = '1';
          Theme.DomHandler.normalSpeed();
          Audio$1.playAudio(audioTabText.speedMiddle);
        } else {
          _this2.speed = '1.5';
          Theme.DomHandler.highSpeed();
          Audio$1.playAudio(audioTabText.speedQuick);
        }

        cookie.set('speed', _this2.speed, namespace);
      };

      Theme.DomHandler.elems.BtnSpeedTab
      /*this.speedTab*/
      .onclick = function () {
        fn();
      };

      document.body.addHotKey(["Control", "alt", "k"], function (el) {
        return fn();
      });
    },
    showAudio: function showAudio() {
      var namespace = Audio$1.namespace;
      this.isAudio = true;
      this.addEventMove();
      cookie.set('audio', true, namespace);
      cookie.set('overead', true, namespace);
      Theme.DomHandler.onAudio();
    },
    closeAudio: function closeAudio() {
      var _this3 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var namespace = Audio$1.namespace;
      LOG.debug('closeAudio', cookie.get('audio', namespace));
      this.isAudio = false;
      cookie.set('audio', false, namespace);
      cookie.set('overead', false, namespace);
      Theme.DomHandler.offAudio();
      LOG.debug('closeAudio', cookie.get('audio', namespace));
      this.removeEventMove();
      setTimeout(function () {
        _this3.stopAudio();
      }, delay);
    },
    addEventMove: function addEventMove() {
      addEvent(this.body, 'mouseover', this.mouseOver);
    },
    removeEventMove: function removeEventMove() {
      removeEvent(this.body, 'mouseover', this.mouseOver);
    },
    forceSafariPlayAudio: function forceSafariPlayAudio() {
      var audio = Audio$1.audio;

      try {
        audio.load();
        audio.play();
      } catch (err) {}
    },
    mouseOver: function mouseOver(event) {
      // LOG.debug('mouseOver event', event)
      if (!Audio$1.core.opened) {
        return;
      }

      if (Audio$1.core.ignoreMouse) {
        return;
      }

      var event = window.event || event;
      var target = event.target || event.srcElement;

      if (target && target.id == 'keenbow-barrier-free-bigtext-content') {
        return;
      }

      var isValidEl = false;

      try {
        var validOrNot = function validOrNot() {
          //console.log('parentElement', target, target.parentElement)
          if (target.classList.contains('sign-ignore') || target.parentElement.classList.contains('sign-ignore')) {
            isValidEl = false; //console.log('invalid')

            return;
          }

          if (['a'].includes(target.parentElement.tagName.toLowerCase())) {
            target = target.parentElement;
            isValidEl = true;
            return;
          }

          LOG.debug('nodeType', target, target.tagName, target.childNodes[0]);

          if (['img', 'a'].includes(target.tagName.toLowerCase()) || target.getAttribute && target.getAttribute('aria-label')) {
            isValidEl = true;
          } else {
            // LOG.debug('nodeType childNodes 0', target.childNodes[0].nodeType)
            if (target.childNodes && target.childNodes[0] && 3 === target.childNodes[0].nodeType) {
              var text = target.childNodes[0].textContent;
              text = text.trim();
              LOG.debug('[b] text', text, text.length);

              if (text.length > 0 && text.length < 50000) {
                // console.log('== set target', target)
                target = target.childNodes[0]; // console.log('== set target', target)

                isValidEl = true;
              }
            }
          }
        }; //validOrNot()


        target = Tools.getValidEl(target); // console.log('validOrNot', isValidEl, target)
      } catch (e) {
      } // if (!isValidEl) {


      if (!target) {
        return;
      }

      if (!Audio$1.isReadMode0) {
        Audio$1.timestamp = new Date(); // Audio.highlightElem(target);

        Audio$1.playElementTextAudioOnebyone(target, Audio$1.timestamp);
      } else {
        // LOG.debug('parseTagText target', target)
        var __text = parseTagText(target).replace(symbolsReg, '');

        var __parentNodeId = target.parentNode.id;

        var __isAssist = __parentNodeId.indexOf(Audio$1.namespace) > -1;

        if (__text == '' || trim(__text) == '文本：' || __isAssist) {
          return;
        }

        Audio$1.highlightElem(target);
        Audio$1.playAudio(__text);
      }
    },
    readTarget: function readTarget(target) {

      if (['a'].includes(target.parentElement.tagName.toLowerCase())) {
        target = target.parentElement;
      }

      var isValidEl = false;

      try {
        var validOrNot = function validOrNot() {
          //console.log('parentElement', target, target.parentElement)
          if (['a'].includes(target.parentElement.tagName.toLowerCase())) {
            target = target.parentElement;
            isValidEl = true;
            return;
          }

          LOG.debug('getAttribute', target.getAttribute && target.getAttribute('aria-label'));

          if (target.getAttribute && target.getAttribute('aria-role')) {
            isValidEl = true;
            return;
          }

          LOG.debug('nodeType', target, target.tagName, target.childNodes[0]);

          if (['img', 'a'].includes(target.tagName.toLowerCase())) {
            isValidEl = true;
          } else {
            // LOG.debug('nodeType childNodes 0', target.childNodes[0].nodeType)
            if (target.childNodes && target.childNodes[0] && 3 === target.childNodes[0].nodeType) {
              var text = target.childNodes[0].textContent;
              text = text.trim();
              LOG.debug('text', text, text.length);

              if (text.length > 0 && text.length < 50000) {
                // console.log('== set target', target)
                target = target.childNodes[0]; // console.log('== set target', target)

                isValidEl = true;
              }
            }
          }
        }; //validOrNot()


        target = Tools.getValidEl(target); // console.log('validOrNot', isValidEl, target)
      } catch (e) {
      } // if (!isValidEl) {


      if (!target) {
        return;
      }

      if (!Audio$1.isReadMode0) {
        Audio$1.timestamp = new Date();
        Audio$1.highlightElem(target);
        Audio$1.playElementTextAudioOnebyone(target, Audio$1.timestamp);
      } else {
        var __text = parseTagText(target).replace(symbolsReg, '');

        var __parentNodeId = target.parentNode.id;

        var __isAssist = __parentNodeId.indexOf(Audio$1.namespace) > -1;

        if (__text == '' || trim(__text) == '文本：' || __isAssist) {
          return;
        }

        Audio$1.highlightElem(target);
        Audio$1.playAudio(__text);
      }
    },
    highlightElem: function highlightElem(target) {

      if (3 === target.nodeType) {
        target = target.parentNode;
      }

      var allElements = document.getElementsByTagName('*');
      var signElem = document.getElementById(IdOfWebsignLanguage);
      var barrierFreeElem = document.getElementById('keenbow-barrier-free');

      var _iterator = _createForOfIteratorHelper(allElements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          element.classList.remove('barrier-free-active');
          element.removeAttribute('barrier-free-active');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (signElem && signElem.contains(target)) return;
      if (barrierFreeElem && barrierFreeElem.contains(target)) return;
      target.classList.add('barrier-free-active');
      target.setAttribute('barrier-free-active', true);
    },
    isBlank: function isBlank(str) {
      if (!str) {
        return true;
      }

      if (0 === str.trim().length) {
        return true;
      }

      return false;
    },
    playElementTextAudioOnebyone: function playElementTextAudioOnebyone(target, timestamp) {
      var __text = parseTagText(target).replace(symbolsReg, '');

      var __parentNodeId = target.parentNode.id;

      var __isAssist = __parentNodeId.indexOf(Audio$1.namespace) > -1;

      if (__text == '' || trim(__text) == '文本：' || __isAssist) {
        return;
      }

      Audio$1.highlightElem(target);
      BigText.mouseOverTarget(target);
      this.audioUtil.playAudio(__text, timestamp, Audio$1.speed, null, function () {
        var next = Audio$1.getNextElement(target); // let __text = parseTagText(next)

        var __text = next.textContent;

        while (Audio$1.isBlank(__text) && next) {
          next = Audio$1.getNextElement(next); // __text = parseTagText(next)

          __text = next.textContent;
        }

        if (next) {
          Audio$1.playElementTextAudioOnebyone(next, timestamp);
        }
      });
    },
    playElementTextAudioOnebyoneXX: function playElementTextAudioOnebyoneXX(target, timestamp) {
      var __text = parseTagText(target).replace(symbolsReg, '');

      var __parentNodeId = target.parentNode.id;

      var __isAssist = __parentNodeId.indexOf(Audio$1.namespace) > -1;

      if (__text == '' || trim(__text) == '文本' || __isAssist) {
        return;
      }

      Audio$1.playAudio(__text, function () {
        {
          var next = Audio$1.getNextElement(target);

          if (next) {
            setTimeout(function () {
              //console.log('timestamp', timestamp, Audio.timestamp);
              if (Audio$1.timestamp === timestamp) {
                //console.log('===');
                Audio$1.playElementTextAudioOnebyone(next, timestamp);
              }
            }, 100);
          }
        }
      });
    },
    getNextElement: function getNextElement(target) {
      var next = target.nextElementSibling;

      while (!next && target) {
        target = target.parentNode;
        next = target.nextElementSibling;
      }

      LOG.debug('getNextElement', next, next.children, next.childNodes);

      while (next.childNodes && next.childNodes.item(0)) {
        next = next.childNodes.item(0);
      }

      while (['a', 'span'].includes(next.parentElement.tagName.toLowerCase())) {
        next = next.parentElement;
      }

      return next;
    },
    playAudio: function playAudio(text) {
      this.audioUtil.playAudio(text, Date.now(), Audio$1.speed);
    },
    playAudioxx: function playAudioxx(text) {
      var onstart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var onend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.lastText = text;
      LOG.debug('window.speechSynthesis', window.speechSynthesis, window.speechSynthesis.getVoices());

      if (window.speechSynthesis) {
        this.systemAudioAction(text, onstart, onend);
      } else {
        this.degradationAudioAction(text);
      }

      if (window.PlaySignLanguage) {
        window.PlaySignLanguage(text);
      }
    },
    stopAudio: function stopAudio() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      } else {
        this.audio.pause();
      }
    },
    getWindowVoice: function getWindowVoice() {
      // 获取浏览器中语音 (中文 + 本地服务)
      return window.speechSynthesis.getVoices().find(function (item) {
        return item.localService && item.lang === 'zh-CN';
      });
    },
    systemAudioAction: function systemAudioAction(text) {
      var onstart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var onend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var isAudio = Audio$1.isAudio,
          speed = Audio$1.speed;

      if (!isAudio) {
        return;
      } //const __speed = speed == 'middle' ? 1 : 1.5
      var __speed = speed;
      var synth = window.speechSynthesis;
      synth.cancel();
      var msg = new SpeechSynthesisUtterance();
      msg.text = text; // 文字内容

      msg.lang = "zh-CN"; // 使用的语言:中文

      msg.volume = 1; // 声音音量：1

      msg.rate = __speed; // 语速：1

      msg.pitch = 1; // 音高：1

      msg.voice = this.getWindowVoice(); // 使用本地服务合成语音(若是获取不到 请异步获取, 加一个setTimeout)

      msg.onstart = function () {

        if (onstart) {
          onstart();
        }
      };

      msg.onend = function () {
        //console.log('play end')
        if (onend) {
          onend();
        }
      }; // console.log('synth.speak', msg)


      synth.speak(msg); // 播放
    },
    degradationAudioAction: function degradationAudioAction(text) {
      var namespace = Audio$1.namespace,
          AudioApi = Audio$1.AudioApi,
          isAudio = Audio$1.isAudio,
          audio = Audio$1.audio,
          speed = Audio$1.speed,
          forceSafariPlayAudio = Audio$1.forceSafariPlayAudio;

      if (!isAudio) {
        return;
      } // let __speed = speed == 'middle' ? -150 : 0


      var __speed = (Num(speed) / 0.5 - 3) * 150;

      var AudioParam = "speed=".concat(__speed, "&text=").concat(encodeURI(text), "&V=").concat(Date.now());
      var AudioUrl = "".concat(AudioApi, "?").concat(AudioParam);
      audio.src = AudioUrl;
      document.getElementById("".concat(namespace, "-audio-source")).src = AudioUrl;
      document.getElementById("".concat(namespace, "-audio-embed")).src = AudioUrl;
      var playPromise = audio.play();

      if (playPromise) {
        playPromise.then(function (_) {
          // audio.pause();
          removeEvent(document, 'click', forceSafariPlayAudio);
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    reset: function reset() {
      var namespace = Audio$1.namespace;
      this.closeAudio();
      Theme.DomHandler.offAudio();
      this.speed = '1';
      cookie.set('speed', '1', namespace);
    }
  };

  var __domain = config.domain;
  var cookie = {
    set: function set(key, value, namespace) {
      var memory = {
        show: false,
        // 是否展示无障碍
        audio: true,
        // 是否开启声音
        speed: 1,
        // 语速
        zoom: 1,
        // 缩放倍数
        cursor: false,
        // 是否替换鼠标样式
        pointer: false,
        // 是否开启十字线
        bigtext: false,
        // 是否开启大字幕
        overead: false,
        // 是否开启指读
        fullscreen: false // 是否开启全屏

      };

      if (js_cookie.get(namespace)) {
        memory = JSON.parse(js_cookie.get(namespace));
      }

      memory[key] = value;
      js_cookie.set(namespace, JSON.stringify(memory), {
        domain: __domain
      });
    },
    get: function get(key, namespace) {
      var __key = '';

      if (js_cookie.get(namespace)) {
        __key = JSON.parse(js_cookie.get(namespace))[key];
      }

      return __key;
    },
    remove: function remove(namespace) {
      js_cookie.remove(namespace, {
        domain: __domain
      });
    },
    setTag: function setTag(namespace) {
      var __key = "".concat(namespace, "-ignore");

      var __data = [];

      if (js_cookie.get(__key)) {
        __data = JSON.parse(js_cookie.get(__key));
      }

      var _location = location,
          origin = _location.origin,
          pathname = _location.pathname;

      var __ignoreUrl = "".concat(origin).concat(pathname);

      !__data.includes(__ignoreUrl) && __data.push("".concat(origin).concat(pathname));
      js_cookie.set(__key, JSON.stringify(__data), {
        domain: __domain
      });
    },
    getTag: function getTag(namespace) {
      var __key = "".concat(namespace, "-ignore");

      var __data = [];

      if (js_cookie.get(__key)) {
        __data = JSON.parse(js_cookie.get(__key));
      }

      return __data;
    }
  };

  var addEvent = function addEvent(element, type, callback) {
    var ignore = ['DOMContentLoaded'];

    var __type = ignore.includes(type) ? type : 'on' + type;

    if (element.addEventListener) {
      //console.log('addEventListener', type)
      element.addEventListener(type, callback, false);
    } else if (element.attachEvent) {
      //console.log('attachEvent', __type)
      element.attachEvent(__type, callback);
    } else {
      element[__type] = callback;
    }
  };

  var removeEvent = function removeEvent(element, type, callback) {
    var ignore = ['DOMContentLoaded'];

    var __type = ignore.includes(type) ? type : 'on' + type;

    if (element.removeEventListener) {
      element.removeEventListener(type, callback);
    } else if (element.detachEvent) {
      element.detachEvent(__type, callback);
    } else {
      element[__type] = null;
    }
  };

  var ruleType = function ruleType(target) {
    var __role = !!target.getAttribute('role') && target.getAttribute('role').toUpperCase() || target.tagName.toUpperCase();

    var __roleName = {
      IMG: '图片',
      BUTTON: '按钮',
      INPUT: '输入框',
      CHECKBOX: '复选框',
      RADIO: '单选框',
      OPTION: '下拉框',
      A: '链接'
    };

    if (__role == 'INPUT') {
      if (target.type == 'radio') {
        return '单选框';
      } else if (target.type == 'checkbox') {
        // button reset file
        return '复选框';
      } else if (target.type == 'text') {
        // button reset file
        return '文本框';
      } else if (target.type == 'submit') {
        return '提交按钮';
      } else if (target.type == 'reset') {
        return '重置按钮';
      } else if (target.type == 'password') {
        return '密码输入框';
      } else {
        return '输入框';
      }
    }

    return __roleName[__role] || '文本';
  };

  var parseTagText = function parseTagText(target) {
    LOG.debug('parseTagText', target, target.nodeType); // LOG.debug('parseTag == Text', target.textContent)

    var ariaLabel = target.getAttribute && target.getAttribute('aria-label');

    if (!Tools.StrBlank(ariaLabel)) {
      return ariaLabel;
    }

    if (3 === target.nodeType) {
      // return target.textContent
      return '文本：' + target.textContent.trim();
    } // if ('A' === target.tagName) {
    //     return ''
    // }


    var __name = ruleType(target);

    var __role = !!target.getAttribute('role') && target.getAttribute('role').toUpperCase();

    if (target.tagName === 'STYLE' || target.tagName === 'SCRIPT') {
      return '';
    }

    if (target.getElementsByTagName('a').length > 0) {

      __role = 'A';
    }

    if (__role === 'A' || target.tagName === 'A') {
      LOG.debug('这是一个链接:', target.alt || target.title || target.innerText);
      var text = null;

      if (target.tagName === 'A') {
        text = target.alt || target.title || target.innerText;
      } else {
        text = target.alt || target.title;
      }

      if (Tools.StrBlank(text)) {
        var img = target.getElementsByTagName('img'); // LOG.debug('img:', img, img.getAttribut);

        if (img && img[0] && !Tools.StrBlank(img[0].getAttribute('alt'))) {
          text = img[0].getAttribute('alt');
        } else {
          var p = target.parentNode;

          if ('LI' === p.tagName) {
            text = p.textContent;
          }
        }
      }

      if (Tools.StrBlank(text)) {
        return '';
      } // return `${target.alt || target.title || target.innerText}`;


      return "\u94FE\u63A5\uFF1A".concat(text);
    }

    if (target.children.length === 0) {
      if (__role === 'IMG' || target.tagName === 'IMG') {
        LOG.debug('这是一张图片:' + target.alt || target.title); // return `${target.alt || target.title}`;

        return "\u56FE\u7247\uFF1A ".concat(target.alt || target.title);
      }

      if (__role === 'BUTTON' || target.tagName === 'BUTTON') {
        LOG.debug('这是一个按钮:' + target.innerText); // return `${target.alt || target.title || target.innerText}`;

        return "\u6309\u94AE\uFF1A ".concat(target.alt || target.title || target.innerText);
      }

      if (__role === 'INPUT' || target.tagName === 'INPUT') {
        LOG.debug("\u8FD9\u662F\u4E00\u4E2A".concat(__name, ":") + target.alt || target.title || target.value); // return `${target.alt || target.title || target.value}`;

        return "".concat(__name, "\uFF1A ").concat(target.alt || target.title || target.value);
      }

      if (__role === 'LABEL' || target.tagName === 'LABEL') {
        var __linkId = target.getAttribute('for');

        var __linkDom = document.getElementById(__linkId);

        if (!!__linkDom && !!__linkDom.type && __linkDom.type == 'radio') {
          LOG.debug("\u8FD9\u662F\u4E00\u4E2A\u5355\u9009:" + target.alt || target.title || target.innerText); // return `${target.alt || target.title || target.innerText}`;

          return "\u5355\u9009\uFF1A ".concat(target.alt || target.title || target.innerText);
        }
      }

      if (target.alt || target.title || target.innerText) {
        LOG.debug("".concat(__name, " ").concat(target.alt || target.title || target.innerText)); // return `${target.alt || target.title || target.innerText}`;

        return "".concat(__name, "\uFF1A ").concat(target.alt || target.title || target.innerText);
      }

      return '';
    }

    if (target.children.length < 5 && (target.alt || target.title || target.innerText)) {
      //console.log(`${__name} ${target.alt || target.title || target.innerText}`);
      // return `${target.alt || target.title || target.innerText}`;
      return "".concat(__name, " ").concat(target.alt || target.title || target.innerText);
    }

    return '';
  };

  var trim = function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  };

  var triggerEvent2 = function triggerEvent2(element, eventType) {

    if (document.createEvent) {
      var n = document.createEvent("HTMLEvents");
      n.initEvent(eventType, !0, !0), n.eventName = eventType, element.dispatchEvent(n);
    } else {
      var r = document.createEventObject();
      r.eventType = eventType, r.eventName = eventType, element.fireEvent("on" + r.eventType, r);
    }
  };
  /**
   * 判断是否是IE
   */

  var isIE = function isIE() {
    if (!!window.ActiveXobject || "ActiveXObject" in window) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * 判断是否是IE11
   */


  var isIE11 = function isIE11() {
    if (/Trident\/7\./.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  };

  var isFirefox = function isFirefox() {
    var ua = navigator.userAgent;

    if (ua.indexOf('Firefox') > -1) {
      return true;
    }

    return false;
  };

  var removeNode = function removeNode(item) {
    if (isIE() || isIE11()) {
      item.removeNode(true);
    } else {
      item.remove();
    }
  };

  var zh_s = '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄';
  var zh_t = '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩';
  var LastHoverElem = null;

  var Tools = /*#__PURE__*/function () {
    function Tools() {
      _classCallCheck(this, Tools);
    }

    _createClass(Tools, null, [{
      key: "setBtnImgState",
      value: //*
      function setBtnImgState(btn, state) {
        state = "src-state-".concat(state);
        var btnImg = btn.getElementsByTagName('img')[0];
        btnImg.src = btnImg.getAttribute(state);
      } //*/

    }, {
      key: "setBaseImg",
      value: function setBaseImg(elem) {
        var state = elem.getAttribute("data-state");
        var y = elem.getAttribute("data-img-y") || 'top'; //console.log('state', state)

        var bg = elem.getAttribute("data-img-".concat(state));
        elem.style.background = "url(".concat(bg, ") center ").concat(y, " no-repeat");
      }
    }, {
      key: "setHoverImg",
      value: function setHoverImg(elem) {
        var state = elem.getAttribute("data-state");
        var y = elem.getAttribute("data-img-y") || 'top';
        var bg = elem.getAttribute("data-img-".concat(state, "-h"));
        elem.style.background = "url(".concat(bg, ") center ").concat(y, " no-repeat");
      }
    }, {
      key: "toTraditionalChinese",
      value: function toTraditionalChinese(text) {
        var a = '';
        var l = text.length;

        for (var i = 0; i < l; i++) {
          var c = text.charAt(i);
          var p = zh_s.indexOf(c);
          a += p < 0 ? c : zh_t.charAt(p);
        }

        return a;
      }
    }, {
      key: "setDBClick",
      value: function setDBClick(core) {
        var DELAY = 200,
            timer = null;
        var last = null;

        var executeClick = function executeClick(target) {
          var jqe = target.jqe; // console.log("=== Double Click", e, jqe )

          if (jqe) {
            jqe.forEach(function (fn) {
              LOG.debug("handler", fn.handler, fn);
              fn.handler();
            });
          }

          target.donclick && target.donclick();
        };

        var onclick = function onclick(e) {
          // console.log('setDBClick onclick ' + JSON.stringify(e))
          // alert('onclick ' + JSON.stringify(e))
          // alert('core ' + JSON.stringify(core.lastTouch))
          /// 只有没开talkback的时候有touch事件，
          /// 开了talkback没有touch事件
          if (core.lastTouch && core.lastTouch.timeStamp == e.timeStamp) ; else {
            // 开了talkback 季
            // alert('return ')
            return;
          }

          e.stopPropagation();
          var eventTarget = e.target;
          LOG.debug('=== onclick e.target', e.target, e.target.jqe);
          LOG.debug('=== onclick eventTarget', eventTarget, eventTarget.jqe);

          if (!Audio$1.isAudio) {
            executeClick(eventTarget);
            return;
          }

          if (last) {
            if (eventTarget === last) {
              last = null; // let jqe = $(e.target).data('jqe')

              executeClick(eventTarget);
              clearTimeout(timer);
              return true;
            }
          }

          e.preventDefault();
          last = eventTarget;
          timer = setTimeout(function () {
            // console.log("=== Single Click", e)
            last = null;
          }, DELAY);
        }; // if (1) {
        //     return
        // }


        $(function () {
          var allElements = document.getElementsByTagName('*');
          var signElem = document.getElementById(IdOfWebsignLanguage);
          var barrierFreeElem = document.getElementById('keenbow-barrier-free');

          var _iterator = _createForOfIteratorHelper(allElements),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var element = _step.value;
              if (signElem && signElem.contains(element)) continue;
              if (barrierFreeElem && barrierFreeElem.contains(element)) continue;
              element.donclick = element.onclick;
              element.onclick = null;

              var events = $._data(element, 'events'); // console.log('---events---', element, events, events&&events.click);


              if (events && events.click) {
                element.jqe = _toConsumableArray(events.click);
              }

              $(element).off('click');
              $(element).off('touchend');
              $(element).off('touchstart'); //*

              $(element).on("click", onclick).on("mousedown", function (e) {
                console.log('mousedown');
                e.preventDefault(); //cancel system double-click event

                e.stopPropagation();
              }).on("touchend", function (e) {
                console.log('---  touchend'); //, e.target)
                // e.preventDefault();
                // e.stopPropagation()
              }).on("touchstart", function (e) {
                console.log('---touchstart'); //, e.target)
                // e.preventDefault();
                // e.stopPropagation()
              }).on("tap", function (e) {
                console.log('---tap');
              }).on("singleTap", function (e) {
                console.log('---singleTap');
              }).on("dblclick", function (e) {
                e.preventDefault(); //cancel system double-click event
              }); //*/
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      }
    }, {
      key: "GetJson",
      value: function GetJson(url, onJson) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // console.log(this.response, this.responseText, this)
            var json = JSON.parse(this.response); // console.log(json)

            if (!json) {
              return;
            }

            onJson(json);
          }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.send();
      }
    }, {
      key: "HandleAria",
      value: function HandleAria(obj) {
        //Tools.HandleAllTab(obj)
        Tools.HandleAriaByClass(obj['class']);
        Tools.HandleAriaByXPath(obj['xpath']);
      }
    }, {
      key: "HandleAriaByXPath",
      value: function HandleAriaByXPath(xpathObj) {
        var value = undefined;

        for (var key in xpathObj) {
          if (window.location.href.includes(key)) {
            value = xpathObj[key];
            break;
          }
        }

        if (value) {
          for (var type in AriaFN) {
            if (type in value) {
              var _iterator2 = _createForOfIteratorHelper(value[type]),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _xpathObj = _step2.value;
                  var xpath = _xpathObj[0];
                  var extra = _xpathObj[1];
                  var target = document.evaluate(xpath, document).iterateNext(); // LOG.debug('xpath', xpath, target)

                  try {
                    AriaFN[type](target, extra);
                  } catch (e) {
                    LOG.debug(e);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }
      }
    }, {
      key: "HandleAriaByClass",
      value: function HandleAriaByClass(classObj) {
        var _loop = function _loop(type) {
          if (type in classObj) {
            var _iterator3 = _createForOfIteratorHelper(classObj[type]),
                _step3;

            try {
              var _loop2 = function _loop2() {
                var clazzObj = _step3.value;
                var clazz = clazzObj[0];
                var extra = clazzObj[1];
                Array.from(document.getElementsByClassName(clazz)).forEach(function (target) {
                  // LOG.debug('clazz', clazz, target)
                  try {
                    AriaFN[type](target, extra);
                  } catch (e) {
                    LOG.debug(e);
                  }
                });
              };

              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _loop2();
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        };

        for (var type in AriaFN) {
          _loop(type);
        }
      }
    }, {
      key: "HandleTabP",
      value: function HandleTabP(el, extra) {
        Array.from(el.children).forEach(function (each, i) {
          while (each.children[0]) {
            each = each.children[0];
          }

          Tools.HandleTab(each, extra);
        });
      }
    }, {
      key: "HandleTab",
      value: function HandleTab(el, extra) {
        var text = el.innerText;
        el.setAttribute('aria-label', extra || "tab\u6807\u7B7E\uFF0C".concat(text, "\uFF0C\u5F53\u524D\u6709\u6D6E\u52A8\u7A97\u53E3\uFF0C\u6309ctrl+\u4E0B\u952E\u8FDB\u5165\u7A97\u53E3\uFF0C\u6309tab\u952E\u5728\u6D6E\u52A8\u5C42\u4E2D\u904D\u5386\u4FE1\u606F\uFF0C\u6309esc\u952E\u8FD4\u56DE"));
      }
    }, {
      key: "HandlePaging",
      value: function HandlePaging(el) {
        var childArr = Array.from(el.children);
        var currentPage = 1;
        childArr.some(function (each, i) {
          if ('active' in each.classList) {
            currentPage = each.childNodes[0].innerText;
            return true;
          }
        });
        childArr.forEach(function (each, i) {
          // each > li, each.childNodes[0] > li.a
          var target = each.childNodes[0];

          if ('input' == target.tagName.toLowerCase()) {
            target.setAttribute('aria-label', '输入跳转页数，按回车键跳转');
            return;
          }

          var text = target.innerText;

          switch (text) {
            case "首页":
              target.setAttribute('aria-label', '按钮：跳转至首页，按回车键确认');
              break;

            case "上一页":
              target.setAttribute('aria-label', '按钮：跳转至上一页，按回车键确认');
              break;

            case "下一页":
              target.setAttribute('aria-label', '按钮：跳转至下一页，按回车键确认');
              break;

            case "确定":
              target.setAttribute('aria-label', '按钮：确定跳转页数，按回车键跳转');
              break;

            default:
              target.setAttribute('aria-label', "\u8DF3\u8F6C\u81F3\u7B2C".concat(text, "\u9875\uFF0C\u5F53\u524D\u4E3A\u7B2C").concat(currentPage, "\u9875\uFF0C\u6309\u56DE\u8F66\u952E\u786E\u8BA4"));
              break;
          }
        });
      }
    }, {
      key: "HandleRegionNavigation",
      value: function HandleRegionNavigation(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'navigation');
        el.setAttribute('aria-label', extra || "\u5BFC\u822A\u533A");
      }
    }, {
      key: "HandleRegionWindow",
      value: function HandleRegionWindow(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'window');
        el.setAttribute('aria-label', extra || "\u89C6\u7A97\u533A");
      }
    }, {
      key: "HandleRegionInteract",
      value: function HandleRegionInteract(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'interact');
        el.setAttribute('aria-label', extra || "\u4EA4\u4E92\u533A");
      }
    }, {
      key: "HandleRegionService",
      value: function HandleRegionService(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'service');
        el.setAttribute('aria-label', extra || "\u670D\u52A1\u533A");
      }
    }, {
      key: "HandleRegionList",
      value: function HandleRegionList(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'list');
        el.setAttribute('aria-label', extra || "\u5217\u8868\u533A");
      }
    }, {
      key: "HandleRegionMain",
      value: function HandleRegionMain(el, extra) {
        el.innerText;
        el.setAttribute('aria-role', 'main');
        el.setAttribute('aria-label', extra || "\u6B63\u6587\u533A");
      }
    }, {
      key: "HandleRegionWindowP",
      value: function HandleRegionWindowP(el, extra) {
        Array.from(el.children).forEach(function (each, i) {
          Tools.HandleRegionWindow(each, extra);
        });
      }
    }, {
      key: "HandleAcfgArray",
      value: function HandleAcfgArray(arr) {
        var _iterator4 = _createForOfIteratorHelper(arr),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var e = _step4.value;

            if ('floatingwindow' == e.arole) {
              continue;
            }

            var target = document.querySelectorAll(e.selector); // LOG.debug('target', target)

            var _iterator5 = _createForOfIteratorHelper(target),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var el = _step5.value;
                el.setAttribute('aria-role', e.arole);
                el.setAttribute('aria-region', e.aregion);
                el.setAttribute('aria-haspopup', e.ahaspopup);
                var label = e.alabel;

                if (e.arole) {
                  switch (e.arole) {
                    case 'tab':
                      label = 'tab标签，' + label;
                      break;

                    case 'imagelink':
                      label = '链接：' + label;
                      break;
                  }
                }

                if (e.ahaspopup) {
                  label = label + '，当前有浮动窗口，按ctrl+下键进入窗口，按tab键在浮动层中遍历信息，按esc键返回';
                } else if (!Tools.StrBlank(e.aregion)) {
                  switch (e.aregion) {
                    case 'window':
                      label = '视窗区：' + label;
                  }
                }

                el.setAttribute('aria-s', e.selector);
                el.setAttribute('tabindex', '0');
                el.classList.add('set-tabindex3');
                !e.linkage ? null : el.setAttribute('aria-linkage', e.linkage);
                !e['linkage-trigger'] ? null : el.setAttribute('aria-linkage-trigger', e['linkage-trigger']);
                var target_linkage = document.querySelector(e.linkage);

                if (target_linkage) {
                  target_linkage.setAttribute('aria-linkageof', e.selector);
                  label = label + "，按esc退出弹出浮层";
                }

                if (!Tools.StrBlank(label)) {
                  el.setAttribute('aria-label', label);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }, {
      key: "BanElemTab",
      value: function BanElemTab(target) {
        var _iterator6 = _createForOfIteratorHelper(target.getElementsByTagName('*')),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var each = _step6.value;
            each.setAttribute('tabindex', '-1');
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "ActivateElem",
      value: function ActivateElem(target) {
        console.log('----------ActivateElem', target);

        if (LastHoverElem) {
          triggerEvent2(LastHoverElem, 'mouseout');
        }

        LastHoverElem = target;
        target.setAttribute('tabindex', '0');
        target.classList.add('set-tabindex4');
        var allElements = document.getElementsByTagName('*');

        var _iterator7 = _createForOfIteratorHelper(allElements),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var element = _step7.value;
            element.classList.remove('barrier-free-active');
            element.removeAttribute('barrier-free-active');
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        target.classList.add('barrier-free-active');
        target.setAttribute('barrier-free-active', 1);
        BigText.mouseOverTarget(target);
        console.log('----------isAudio', Audio$1.isAudio);

        if (Audio$1.isAudio) {
          Audio$1.readTarget(target);
        }

        var trigger = target.getAttribute('aria-linkage-trigger');

        if (!Tools.StrBlank(trigger)) {
          triggerEvent2(target, trigger);
        }

        target.focus();
        Tools.scrollToElem(target);
        LOG.debug('--------------- scrollTop', document.documentElement.scrollTop);
      }
    }, {
      key: "scrollToElem",
      value: function scrollToElem(target) {
        console.log('----------scrollToElem', target);
        var offsetTop = target.offsetTop;
        var offsetP = target.offsetParent;

        while (offsetP && offsetP !== document.body) {
          console.log('----------offsetP', offsetP); // let poff = target.offsetParent?target.offsetParent.offsetTop:0

          offsetTop += offsetP.offsetTop;
          offsetP = offsetP.offsetParent;
        }

        LOG.debug(' scroll or not', document.documentElement.scrollTop, offsetTop, offsetTop + target.offsetHeight, document.documentElement.scrollTop + document.documentElement.clientHeight);

        if (target.offsetHeight > document.documentElement.clientHeight) {
          document.documentElement.scrollTop = offsetTop - 120;
          LOG.debug('scrollTop >', document.documentElement.scrollTop, offsetTop, target);
        } else {
          var invisible = false;

          if (document.documentElement.scrollTop > offsetTop - 150) {
            invisible = true;
          }

          if (offsetTop + target.offsetHeight > document.documentElement.scrollTop + document.documentElement.clientHeight - 150) {
            invisible = true;
          }

          if (invisible) {
            document.documentElement.scrollTop = offsetTop + target.offsetHeight / 2 - document.documentElement.clientHeight / 2;
            LOG.debug('scrollTop to center >', document.documentElement.scrollTop, offsetTop, target);
          } else {
            LOG.debug('not scroll ', document.documentElement.scrollTop, offsetTop, offsetTop + target.offsetHeight, document.documentElement.scrollTop + document.documentElement.clientHeight);
          }
        }
      }
    }, {
      key: "ActivateLinkage",
      value: function ActivateLinkage(target) {
        var linkage = target.getAttribute('aria-linkage');

        if (linkage) {
          var target_linkage = document.querySelector(linkage);

          if (target_linkage) {
            var target_trigger = target_linkage.getAttribute('aria-linkage-trigger');

            if (Audio$1.isBlank(target_trigger)) {
              target_trigger = 'mouseover'; // target_linkage.focus()
            }

            triggerEvent2(target_linkage, target_trigger);
          }
        }
      }
    }, {
      key: "ReadIntro",
      value: function ReadIntro() {
        var target = document.evaluate('/html/body/a[1]', document).iterateNext();

        if (target) {
          Tools.ActivateElem(target);
        }
      }
    }, {
      key: "StrBlank",
      value: function StrBlank(str) {
        if (!str) {
          return true;
        }

        if (0 === str.trim().length) {
          return true;
        }

        return false;
      }
    }, {
      key: "AddMeta",
      value: function AddMeta(name, content) {
        var meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    }, {
      key: "IsTabParent",
      value: function IsTabParent(elem) {
        if (!elem.childNodes) {
          return false;
        } // console.log('IsTabParent ------ elem', elem)


        var res = Array.from(elem.getElementsByTagName("*")).some(function (each, i) {
          if (!each.getAttribute) {
            return false;
          }

          var match = 'tab' == each.getAttribute('aria-role'); // console.log('IsTabParent some', each, match)

          return match;
        }); // console.log('IsTabParent res', res)

        return res;
      }
    }, {
      key: "getValidEl",
      value: function getValidEl(target) {

        if (target.classList.contains('sign-ignore') || target.parentElement.classList.contains('sign-ignore')) {
          console.log('invalid');
          return null;
        }

        if (['a'].includes(target.parentElement.tagName.toLowerCase())) {
          target = target.parentElement;
          return target;
        }

        LOG.debug('nodeType', target, target.tagName, target.childNodes[0]);

        if (['img', 'a'].includes(target.tagName.toLowerCase()) || target.getAttribute && target.getAttribute('aria-label')) {
          return target;
        } else {
          // LOG.debug('nodeType childNodes 0', target.childNodes[0].nodeType)
          if (target.childNodes && target.childNodes[0] && 3 === target.childNodes[0].nodeType) {
            var text = target.childNodes[0].textContent;
            text = text.trim();
            LOG.debug('[b] text', text, text.length);

            if (text.length > 0 && text.length < 50000) {
              // console.log('== set target', target)
              target = target.childNodes[0]; // console.log('== set target', target)
              return target;
            }
          }
        }

        return null;
      }
    }]);

    return Tools;
  }();

  var AriaFN = {
    tab: Tools.HandleTab,
    tabP: Tools.HandleTabP,
    paging: Tools.HandlePaging,
    navigation: Tools.HandleRegionNavigation,
    window: Tools.HandleRegionWindow,
    interact: Tools.HandleRegionInteract,
    service: Tools.HandleRegionService,
    list: Tools.HandleRegionList,
    main: Tools.HandleRegionMain,
    windowP: Tools.HandleRegionWindowP
  };
  var LOG = {
    // debug: console.log,
    debug: function debug() {},
    text: '',
    print: function print() {
      /*
      try {
          //console.log(s)
          LOG.text = JSON.stringify(s) + '\n' + LOG.text
          const textElem = document.getElementById('keenbow-barrier-free-botbar-hint-text')
          textElem.innerText = LOG.text
      } catch (e) {
       }//*/
    }
  };
  var GVal = {
    baseUrl: 'xxx',
    BaseUrl: function BaseUrl() {
      return GVal.baseUrl;
    }
  };
  var Lock = /*#__PURE__*/function () {
    function Lock() {
      _classCallCheck(this, Lock);

      this.queue = [];
      this.acquired = false;
    }

    _createClass(Lock, [{
      key: "acquire",
      value: function () {
        var _acquire = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _this = this;

          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this.acquired) {
                    _context.next = 4;
                    break;
                  }

                  this.acquired = true;
                  _context.next = 5;
                  break;

                case 4:
                  return _context.abrupt("return", new Promise(function (resolve, _) {
                    _this.queue.push(resolve);
                  }));

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function acquire() {
          return _acquire.apply(this, arguments);
        }

        return acquire;
      }()
    }, {
      key: "release",
      value: function () {
        var _release = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var continuation;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(this.queue.length === 0 && this.acquired)) {
                    _context2.next = 3;
                    break;
                  }

                  this.acquired = false;
                  return _context2.abrupt("return");

                case 3:
                  continuation = this.queue.shift();
                  return _context2.abrupt("return", new Promise(function (res) {
                    continuation();
                    res();
                  }));

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function release() {
          return _release.apply(this, arguments);
        }

        return release;
      }()
    }]);

    return Lock;
  }();

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var max = Math.max;
  var min = Math.min;

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
      }
      doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var pubSub = {
    list: {},
    subscribe: function subscribe(key, fn) {
      if (!this.list[key]) this.list[key] = [];
      this.list[key].push(fn);
    },
    unsubscribe: function unsubscribe(key, fn) {
      var fnList = this.list[key];
      if (!fnList) return false;

      if (!fn) {
        // 不传入指定的方法，清空所用 key 下的订阅
        fnList && (fnList.length = 0);
      } else {
        fnList.forEach(function (item, index) {
          item === fn && fnList.splice(index, 1);
        });
      }
    },
    publish: function publish(key) {
      var fnList = this.list[key];
      if (!fnList) return false;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(this.list[key]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fn = _step.value;
          !!fn && fn.call.apply(fn, [this].concat(args));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  function initAging(ref) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // console.log(this.response, this.responseText, this)
        var json = JSON.parse(this.response); // console.log(json)

        if (!json) {
          return;
        }

        json = json["aging"];

        if (!json) {
          return;
        }

        var value = undefined;

        for (var key in json) {
          if (window.location.href.includes(key)) {
            value = json[key];
            break;
          }
        } // console.log('value', value)


        if (value) {
          var link_obj = document.createElement('link');
          link_obj.type = 'text/css';
          link_obj.rel = 'stylesheet';
          link_obj.href = 'https://pro.keenbow.com/prod/webslcss/' + value + '.css';
          document.head.appendChild(link_obj);
        }
      }
    };

    xmlhttp.open('GET', 'https://pro.keenbow.com/prod/across/the.json', true);
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.send();
  }

  var ImgFiles = {
    // color: 'https://pro.keenbow.com/dl/target/web-img/webtool/color.png',
    color: '/color.svg',
    exit: '/turn-off.svg',
    voiceOn: '/voice-on.svg',
    voiceOff: '/voice-off.svg',
    setting: '/setting.svg',
    check: '/check.svg'
  };
  var Imgs = {
    // color: 'https://pro.keenbow.com/dl/target/web-img/webtool/color.png',
    color: function color() {
      return (GVal.baseUrl ) + ImgFiles.color;
    },
    exit: function exit() {
      return (GVal.baseUrl ) + ImgFiles.exit;
    },
    voiceOn: function voiceOn() {
      return (GVal.baseUrl ) + ImgFiles.voiceOn;
    },
    voiceOff: function voiceOff() {
      return (GVal.baseUrl ) + ImgFiles.voiceOff;
    },
    setting: function setting() {
      return (GVal.baseUrl ) + ImgFiles.setting;
    },
    check: function check() {
      return (GVal.baseUrl ) + ImgFiles.check;
    }
  };
  /*
  export const Imgs = {
      // color: 'https://pro.keenbow.com/dl/target/web-img/webtool/color.png',
      color: 'https://pro.keenbow.com/dl/target/web-img/webtool/color.svg',
      exit: 'https://pro.keenbow.com/dl/target/web-img/webtool/turn-off.svg',
      voiceOn: 'https://pro.keenbow.com/dl/target/web-img/webtool/voice-on.svg',
      voiceOff: 'https://pro.keenbow.com/dl/target/web-img/webtool/voice-off.svg',
      setting: 'https://pro.keenbow.com/dl/target/web-img/webtool/setting.svg',
      check: 'https://pro.keenbow.com/dl/target/web-img/webtool/check.svg',
  }*/

  var Elems = {
    ChangeColor: 'bot-change-color',
    AudioToggle: 'bot-audio-toggle',
    Close: 'bot-close',
    Setting: 'bot-setting',
    Menu: 'botbar-menu',
    MenuItems: 'botbar-menu-items',
    MenuContents: 'botbar-menu-contents',
    MenuFontsize: 'botbar-menu-fontsize',
    MenuSpeeds: 'botbar-menu-speeds',
    MenuSignspeeds: 'botbar-menu-signspeeds',
    MenuSignOn: 'botbar-menu-sign-on',
    Hint: 'botbar-hint',
    HintText: 'botbar-hint-text',
    HintClose: 'botbar-hint-close'
  };

  var botBarHtml = function botBarHtml(namespace) {
    return "\n<div class='botbar-html-content' id='".concat(namespace, "-botbar-html-content'>\n\n<div id='").concat(namespace, "-").concat(Elems.Hint, "' style=\"display: none;\">\n<h1  style=\"padding: 20px;font-size: 8vw;\">\u8BF4\u660E</h1>\n    <p id='").concat(namespace, "-").concat(Elems.HintText, "' style=\"padding: 20px;\">\n        \u5F00\u542F\u201C\u9605\u8BFB\u201D\u540E\uFF0C\u70B9\u51FB\u6587\u5B57\u6216\u63A7\u4EF6\u53EF\u4EE5\u9605\u8BFB\u5176\u5185\u5BB9\uFF1B\u53CC\u51FB\u6587\u5B57\u6216\u63A7\u4EF6\uFF0C\u5219\u662F\u64CD\u4F5C\u5BF9\u5E94\u7684\u6587\u5B57\u6216\u63A7\u4EF6\n    </p>\n    <button  id='").concat(namespace, "-").concat(Elems.HintClose, "'\n                style=\"display: block;border: solid 1px skyblue;padding: 3px 6px;\n                background: white;position: absolute;\n                right: 20px; top: 10px;\">\n        \u5173\u95ED\n    </button>\n</div>\n\n\n<div id='").concat(namespace, "-").concat(Elems.Menu, "' style=\"display: none;\">\n    <div style=\"width: 25%;border-right: solid 1px skyblue;\">\n        <ul id='").concat(namespace, "-").concat(Elems.MenuItems, "'>\n            <li class=\"menu-li active\">\n                \u8BF4\u660E\n            </li>\n            <li class=\"menu-li\">\n                \u5B57\u4F53\n            </li>\n            <li class=\"menu-li\">\n                \u8BED\u901F\n            </li>\n            <li class=\"menu-li\">\n                \u624B\u8BED\n            </li>\n        </ul>\n    </div>\n    <div style=\"width: 75%;overflow: hidden;\" id='").concat(namespace, "-").concat(Elems.MenuContents, "'>\n        <div class=\"menu-content\" style=\"padding: 6vw;\">\n            <h3 style=\"padding: 20px 0;\">\u5173\u4E8E\u9605\u8BFB</h3>\n            <span style=\"font-size: 12pt;line-height: 10vw\">\n<!--            \u5F00\u542F\u201C\u9605\u8BFB\u201D\u540E\uFF0C\u5355\u51FB\u9875\u9762\u662F\u9605\u8BFB\u6240\u70B9\u6587\u672C\uFF0C\u53CC\u51FB\u76F8\u5F53\u4E8E\u201C\u5F00\u542F\u9605\u8BFB\u4E4B\u524D\u201D\u7684\u5355\u51FB-->\n\u5F00\u542F\u201C\u9605\u8BFB\u201D\u540E\uFF0C\u70B9\u51FB\u6587\u5B57\u6216\u63A7\u4EF6\u53EF\u4EE5\u9605\u8BFB\u5176\u5185\u5BB9\uFF1B\u53CC\u51FB\u6587\u5B57\u6216\u63A7\u4EF6\uFF0C\u5219\u662F\u64CD\u4F5C\u5BF9\u5E94\u7684\u6587\u5B57\u6216\u63A7\u4EF6\n            </span>\n        </div>\n        <div class=\"menu-content menu-font\" style=\"display: none;padding: 6vw;\" id='").concat(namespace, "-").concat(Elems.MenuFontsize, "'>\n            <div> <span class=\"size-xl\" style=\"line-height: 10vw;\"> \u66F4\u5927\u5B57\u4F53 </span> <img src='").concat(Imgs.check(), "' /></div>\n            <div> <span class=\"size-l\" style=\"line-height: 10vw;\"> \u5927\u5B57\u4F53 </span> <img src='").concat(Imgs.check(), "' /></div>\n            <div class=\"active\"> <span style=\"line-height: 10vw;\"> \u539F\u5B57\u4F53 </span> <img src='").concat(Imgs.check(), "' /></div>\n\n        </div>\n        \n        <div class=\"menu-content\" style=\"display: none\" id='").concat(namespace, "-").concat(Elems.MenuSpeeds, "'>\n            \n            <div class=\"menu-content-button\"> <span> \u8F83\u5FEB </span> <img src='").concat(Imgs.check(), "' /></div>\n            <div class=\"menu-content-button active\"> <span> \u9002\u4E2D </span> <img src='").concat(Imgs.check(), "' /></div>\n            <div class=\"menu-content-button\"> <span> \u8F83\u6162 </span> <img src='").concat(Imgs.check(), "' /></div>\n        </div>\n        \n        <div class=\"menu-content menu-sign\">\n            <span> \u624B\u8BED\u8001\u5E08 </span>\n            <div class=\"menu-content-button active\" id='").concat(namespace, "-").concat(Elems.MenuSignOn, "'>\n                <span> \u5F00\u542F </span> <img src='").concat(Imgs.check(), "' />\n            </div>\n            <span> \u624B\u8BED\u901F\u5EA6 </span>\n            <div id='").concat(namespace, "-").concat(Elems.MenuSignspeeds, "'>\n                <div class=\"menu-content-button\"> <span> \u8F83\u5FEB </span> <img src='").concat(Imgs.check(), "' /></div>\n                <div class=\"menu-content-button active\"> <span> \u9002\u4E2D </span> <img src='").concat(Imgs.check(), "' /></div>\n                <div class=\"menu-content-button\"> <span> \u8F83\u6162 </span> <img src='").concat(Imgs.check(), "' /></div>\n            </div>\n\n        </div>\n    \n    </div>\n</div>\n\n    <table>\n        <tr>\n            <th id='").concat(namespace, "-").concat(Elems.Setting, "' style=\"width: 25%;\">\n                <div class=\"img-div\">\n                    <img src='").concat(Imgs.setting(), "' style=\"margin-bottom: 2vw;\"/>\n                    \n                </div>\n                <span>\u83DC\u5355</span>\n                \n            </th>\n            <th id='").concat(namespace, "-").concat(Elems.AudioToggle, "' style=\"width: 25%;\">\n                <div class=\"img-div\">\n                    <img src='").concat(Imgs.voiceOff(), "' style=\"margin-bottom: 2vw;\"/>\n                </div>\n                <span>\u9605\u8BFB</span>\n                \n            </th>\n            <th id='").concat(namespace, "-").concat(Elems.ChangeColor, "' style=\"width: 25%;\">\n<!--                <div style=\"padding-bottom: 12px;\">-->\n                <div class=\"img-div\">\n                    <img src='").concat(Imgs.color(), "' style=\"margin-bottom: 2vw;\"/>\n                </div>\n                <span>\u914D\u8272</span>\n            </th>\n            <th id='").concat(namespace, "-").concat(Elems.Close, "' style=\"width: 25%;\">\n                <div class=\"img-div\">\n                    <img src='").concat(Imgs.exit(), "' style=\"margin-bottom: 2vw;\"/>\n                </div>\n                <span>\u9000\u51FA</span>\n                \n            </th>\n        </tr>\n    </table>\n<div>\n    \n\n    \n    \n        \n\n    ");
  };

  var Base = /*#__PURE__*/function () {
    function Base() {
      var _this = this;

      _classCallCheck(this, Base);

      // console.log('constructor 1');
      // this.ignore = ['LINK','SCRIPT']
      this.ignore = [];
      this.setClick = false;
      this.config = {
        namespace: 'keenbow-barrier-free',
        domain: 'keenbow.com',
        url: ''
      };
      this.mobile_role_on = document.currentScript.getAttribute('mobile_role_on') || 'false';
      this.wsUrl = document.currentScript.getAttribute('ws');
      this.human = document.currentScript.getAttribute('human');
      this.human_position_left = document.currentScript.getAttribute('human_position_left');
      this.human_position_top = document.currentScript.getAttribute('human_position_top');
      this.human_position_bottom = document.currentScript.getAttribute('human_position_bottom');
      this.enable_select_text = document.currentScript.getAttribute('enable_select_text');
      this.human_display_type = document.currentScript.getAttribute('human_display_type');

      if (!this.wsUrl || 0 === this.wsUrl.trim().length) {
        // 此处修改websocket服务地址
        this.wsUrl = 'wss://metaqa.ucap.com.cn/ws/fitforaging/websocket';
      }

      if (!this.human || 0 === this.human.trim().length) {
        // 此处修改默认角色 0：千言 1：云小天  2：蓝衣千言
        this.human = '1';
      }

      if (!this.human_display_type || 0 === this.human_display_type.trim().length) {
        // 此处修改默认人物显示方式 0：半身  1：全身
        this.human_display_type = '0';
      }

      if (!this.human_position_left || 0 === this.human_position_left.trim().length) {
        this.human_position_left = '0';
      }

      if (!this.enable_select_text || 0 === this.enable_select_text.trim().length) {
        this.enable_select_text = 'true';
      }

      var onload = function onload() {
        document.documentElement.classList.add('barrier-free');
        var allElements = document.getElementsByTagName('*');
        var signElem = document.getElementById(IdOfWebsignLanguage);
        var barrierFreeElem = document.getElementById('keenbow-barrier-free');

        var _iterator = _createForOfIteratorHelper(allElements),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var element = _step.value;
            if (signElem && signElem.contains(element)) continue;
            if (barrierFreeElem && barrierFreeElem.contains(element)) continue;
            element.classList.add('barrier-free');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var target = document.getElementById('pcboxslide'); // console.log('document.getElementById pcboxslide', target)

        target && Tools.BanElemTab(target);
        var banArr = ['div.iwant > a:nth-child(1)', 'div.hudongjl-main > div.col2 > div.row1 > div.box2 > a:nth-child(1)', 'div.hdjl-img > div.box > a:nth-child(1)', 'div.person-item > div.serve-item > a:nth-child(1)', 'div.meili-main1 > div > div.tggk > div.item > a.img-box', 'div.hudongjl-main > div.col2 > div.row1 > div.box > a:nth-child(1)', 'div.hudongjl-main > div.col2 > div.row1 > div.box:nth-child(2) > div.pic > a:nth-child(1)'];

        for (var _i = 0, _banArr = banArr; _i < _banArr.length; _i++) {
          var each = _banArr[_i];

          var _target = document.querySelectorAll(each);

          var _iterator2 = _createForOfIteratorHelper(_target),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var el = _step2.value;
              el.setAttribute('tabindex', '-1');
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      };

      onload();
      window.addEventListener('load', onload);
      var base_t = this;
      document.addEventListener("touchend", function (event) {
        base_t.lastTouch = event;
      });
      base_t.ignoreMouse = false;
      var titleArr = []; // titleArr = Array.from(document.getElementsByClassName("title"))

      var articleArr = Array.from(document.getElementsByClassName('article'));
      var pArr = Array.from(document.getElementsByTagName('P'));
      var arr = [].concat(titleArr, articleArr, pArr, _toConsumableArray(Array.from(document.getElementsByClassName("u-title"))));

      var _iterator3 = _createForOfIteratorHelper(arr),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;

          try {
            if ("A" == element.children[0].tagName) {
              continue;
            }
          } catch (e) {}

          element.setAttribute('tabindex', '0');
          element.classList.add('set-tabindex1');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.regionMap = new Map();
      document.getElementsByTagName('*');
      document.body.addEventListener("keyup", function (event) {
        console.log('keyup', event);

        if (!base_t.opened) {
          return;
        }

        switch (event.keyCode) {
          case 13:
            // enter
            _target2 = event.target;

            if ('button' == _target2.getAttribute('aria-role')) {
              triggerEvent2(_target2, 'click');
            }

            break;

          case 9:
            // tab
            var _target2 = event.target;

            if (document.body == _target2) {
              return;
            }

            base_t.ignoreMouse = true;
            LOG.debug('------ set ignoreMouse', base_t.ignoreMouse);
            Tools.ActivateElem(_target2);
            Tools.ActivateLinkage(_target2);
            setTimeout(function () {
              document.onmousemove = function () {
                base_t.ignoreMouse = false;
                LOG.debug('------ set ignoreMouse', base_t.ignoreMouse);
                document.onmousemove = null;
              };
            }, 100);
            break;

          case 27:
            //esc
            try {
              _target2 = document.body.getElementsByClassName('barrier-free-active')[0];

              if ('tab' == _target2.getAttribute('aria-role')) {
                _target2 = _target2.parentNode;
              } // target = target.parentNode


              while (
              /*'window' !=target.getAttribute('aria-region')//*/
              //!Tools.IsTabParent(target)//*/
              !_target2.getAttribute('aria-linkageof') && document.body !== _target2) {
                _target2 = _target2.parentNode;
              }

              if (document.body == _target2) {
                return;
              }

              var linkage = _target2.getAttribute('aria-linkageof');

              if (linkage) {
                var target_linkage = document.querySelector(linkage);
                Tools.ActivateElem(target_linkage);
              }
            } catch (e) {}

            break;
        }
      }, true);

      var _iterator4 = _createForOfIteratorHelper(document.getElementsByTagName('*')),
          _step4;

      try {
        var _loop = function _loop() {
          var element = _step4.value;
          // console.log(element.attributes);
          // let role = element.getAttribute('aria-role');
          var role = element.getAttribute('aria-region');

          if (SelfHosted) {
            role = element.getAttribute('aria-role');
          }

          if (role) {
            switch (role) {
              case 'navigationxx':
                break;

              default:
                var _arr2 = _this.regionMap.get(role);

                if (!_arr2) {
                  _arr2 = [];
                }

                _arr2.push(element);

                _this.regionMap.set(role, _arr2);

                LOG.debug('regionMap.set', _this.regionMap);
                break;
            } // LOG.debug(element);

          }

          if ('SELECT' == element.tagName) {
            element.onchange = function (e) {
              var selected = element.selectedOptions[0].innerText;
              element.setAttribute('aria-label', "\u5355\u9009\u4E0B\u62C9\u6846\uFF0C\u5F53\u524D\u9009\u4E2D\u9879\u4E3A".concat(selected));
              Tools.ActivateElem(element);
            };

            var selected = element.selectedOptions[0].innerText;
            var items = element.innerText;

            if (items) {
              items = items.replaceAll('\n', '、');
            }

            element.setAttribute('aria-label', "\u5355\u9009\u4E0B\u62C9\u6846\uFF0C\u5305\u542B\u9009\u9879".concat(items, "\uFF0C\u5F53\u524D\u9009\u4E2D\u9879\u4E3A").concat(selected, "\uFF0C\u6309\u4E0A\u952E\u6216\u4E0B\u952E\u5207\u6362\u9009\u9879"));
          }
        };

        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      Tools.GetJson( // 'http://192.168.0.9:8099/deploy/web-page-tool-dev/dist/tltg.json',
      'https://pro.keenbow.com/prod/across/tltg.json', function (json) {});
      Tools.GetJson('https://pro.keenbow.com/prod/across/conf/global.json', function (json) {
        // console.log(json)
        Tools.HandleAcfgArray(json);
      });
      Tools.GetJson('https://pro.keenbow.com/prod/across/conf/r.json', function (json) {
        // console.log(json)
        if (!json) {
          return;
        }

        var value = undefined;

        for (var key in json) {
          if (window.location.href.includes(key)) {
            value = json[key];
            break;
          }
        } // console.log('value', value)


        if (value) {
          Tools.GetJson("https://pro.keenbow.com/prod/across/conf/".concat(value, ".json"), function (json) {
            // console.log(json)
            if (!/Mobile/.test(navigator.userAgent)) {
              // let aelem = `<a id="ariaTipText" role="pagedescription" aria-label="${json.intro}" aria-atomic="true" href="javascript:void(0)" class="skipAutoFix" style="width: 1px; height: 1px;"><img src="" style="width:1px !important;height:1px !important;position:absolute;top:0;"></a>`
              var aelem = "<a id=\"ariaTipText\" role=\"pagedescription\" aria-label=\"\u6B22\u8FCE\u8FDB\u5165\u94DC\u9675\u5E02\u94DC\u5B98\u533A\u4EBA\u6C11\u653F\u5E9C".concat(json.name, "\u9875\u9762\uFF0C\u76F2\u4EBA\u7528\u6237\u4F7F\u7528\u64CD\u4F5C\u667A\u80FD\u5F15\u5BFC\uFF0C\u8BF7\u6309\u5FEB\u6377\u952ECtrl+Alt+R\uFF1B\u9605\u8BFB\u8BE6\u7EC6\u64CD\u4F5C\u8BF4\u660E\u8BF7\u6309\u5FEB\u6377\u952ECtrl+Alt+\u95EE\u53F7\u952E\u3002\" aria-atomic=\"true\" href=\"javascript:void(0)\" class=\"skipAutoFix\" style=\"width: 1px; height: 1px;\"><img src=\"\" style=\"width:1px !important;height:1px !important;position:absolute;top:0;\"></a>");
              document.body.insertAdjacentHTML('afterbegin', aelem);
            }

            _this.inited = true;
            !_this.oninited ? null : _this.oninited();
            Tools.HandleAcfgArray(json.contents);
            var allElements = document.getElementsByTagName('*');

            var _iterator5 = _createForOfIteratorHelper(allElements),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var element = _step5.value;
                // console.log(element.attributes);
                // let role = element.getAttribute('aria-role');
                var role = element.getAttribute('aria-region');

                if (role) {
                  switch (role) {
                    case 'navigationxx':
                      break;

                    default:
                      var _arr = _this.regionMap.get(role);

                      if (!_arr) {
                        _arr = [];
                      }

                      _arr.push(element);

                      _this.regionMap.set(role, _arr);

                      break;
                  } // LOG.debug(element);

                }
              } // 如果网络差出现没有加载region的情况 采用下面的方法处理
              // this.regionLoaded = true;
              // !this.onRegionLoaded? null : this.onRegionLoaded()

            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          });
        }
      });
      HTMLElement.prototype.hotkeysMap = new Map();

      HTMLElement.prototype.addHotKey = function (shortcut, handler) {
        var _this2 = this;

        var key = shortcut.toString();
        this.hotkeysMap.set(key, {
          keys: shortcut,
          handler: handler
        });

        this.onkeyup = function (e) {
          // console.log(e, this.hotkeysMap);
          var _iterator6 = _createForOfIteratorHelper(_this2.hotkeysMap.values()),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var value = _step6.value;
              // console.log(value)
              var match = value.keys.map(function (key) {
                key = new String(key);
                var ok;

                if (key.toLowerCase() == "control") {
                  // console.log(1, e.ctrlKey)
                  ok = e.ctrlKey;
                } else if (key.toLowerCase() == "shift") {
                  ok = e.shiftKey;
                } else if (key.toLowerCase() == "alt") {
                  ok = e.altKey;
                } else {
                  // console.log(2, e.key==key)
                  ok = e.key == key;
                } //console.log(key, e.key, ok)


                return ok;
              }).reduce(function (a, b) {
                return a && b;
              });

              if (match) {
                console.log('match');
                value.handler();
                e.preventDefault();
                e.stopPropagation();
                break;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        };
      }; // console.log("xx");
      //document.body.addHotKey(["Control", "x"], el => {alert('ha');})
      // console.log("xxx");


      HTMLElement.prototype.onshortcut = function (shortcut, handler) {
        var currentKeys = [];

        function reset() {
          currentKeys = [];
        }

        function shortcutMatches() {
          currentKeys.sort();
          shortcut.sort();
          return JSON.stringify(currentKeys) == JSON.stringify(shortcut);
        }

        this.onkeydown = function (ev) {
          currentKeys.push(ev.key);

          if (shortcutMatches()) {
            ev.preventDefault();
            reset();
            handler(this);
          }
        };

        this.onkeyup = reset;
      };

      this.message = pubSub;
      this.tmplStyle = [];
      this.tmplHtml = [];
      this.opened = false; // console.log('registeOpen', this)

      if (/Mobile/.test(navigator.userAgent)) {
        Tools.AddMeta('viewport', 'width=device-width, initial-scale=1.0,  user-scalable=no');
      }

      this.registeOpen();
    }

    _createClass(Base, [{
      key: "mergeConfig",
      value: function mergeConfig(opts) {
        this.config = _objectSpread2(_objectSpread2({}, this.config), opts);
        this.creatContainer();
      }
    }, {
      key: "use",
      value: function use(plugin) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        //alert('init ' + plugin);console.log(plugin)
        plugin.init.apply(plugin, [this].concat(args));
      }
    }, {
      key: "useEvent",
      value: function useEvent(plugin) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        plugin.setEvents.apply(plugin, [this].concat(args));
      }
    }, {
      key: "creatContainer",
      value: function creatContainer() {
        var namespace = this.config.namespace;

        if (document.getElementById(namespace)) {
          return;
        }

        var Container = document.createElement("div");
        Container.id = namespace;
        document.body.appendChild(Container);
      }
    }, {
      key: "registeOpen",
      value: function registeOpen() {
        var _this3 = this;

        var open = document.getElementById("assist-open");
        open && open.addEventListener('click', function (e) {
          _this3.doOpen();
        });
        var age = document.getElementById("for-aging-open");
        age && age.addEventListener('click', function (e) {
          if (!cookie.get('show', namespace)) {
            _this3.doOpen(true);
          }
        });
        var namespace = this.config.namespace;

        document.onkeydown = function (e) {
          //console.log('Control + ~', cookie.get('show',namespace))
          if (e.ctrlKey == true && e.key == '\`') {
            if (cookie.get('show', namespace)) {
              _this3.close();
            } else {
              _this3.doOpen();
            }

            e.preventDefault();
          }
        };
      }
    }, {
      key: "doOpen",
      value: function doOpen() {
        var isAging = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        console.log('doOpen', isAging);
        cookie.set('aging-on', isAging, this.config.namespace);

        if (this.opened) {
          return;
        } else {
          this.opened = true;

          if (/Mobile/.test(navigator.userAgent)) {
            this.inited ? Tools.ReadIntro() : this.oninited = function () {
              Tools.ReadIntro();
            };
          }
        }

        try {
          if (!DisableRole) {
            //*
            var script = document.createElement('script'); // script.src = GVal.BaseUrl() + '/../../SignLanguageModule/signlanguage_module.js'

            script.src = SelfHosted ? GVal.BaseUrl() + '/../../SignLanguageModule/signlanguage_module.js' : 'https://pro.keenbow.com/prod/websl/signlanguage_module.js'; // script.src = 'http://192.168.0.9:8099/deploy/SignLanguageModule/signlanguage_module.js'

            script.setAttribute('id', 'WebSignlanguage');
            script.setAttribute('enable_select_text', this.enable_select_text);
            script.setAttribute('select_word_count_limit', '50000');
            script.setAttribute('human_position_left', this.human_position_left); // script.setAttribute('human_position_bottom', '0')

            script.setAttribute('ws', this.wsUrl);
            script.setAttribute('human', this.human); // script.setAttribute('human_position_top', '0')

            script.setAttribute('human_display_type', this.human_display_type);
            var bot = this.human_position_bottom;
            var ratio = '1';

            if (/Mobile/.test(navigator.userAgent)) {
              bot = '20vw';
              ratio = '0.7';
              LOG.debug('mobile_role_on', this.mobile_role_on, cookie.get('sign-on', this.config.namespace));

              if (this.mobile_role_on == 'false' && true != cookie.get('sign-on', this.config.namespace)) {
                script.setAttribute('human_position_left', '-100000');
              }

              if (false === cookie.get('sign-on', this.config.namespace)) {
                script.setAttribute('human_position_left', '-100000');
              } // Tools.AddMeta('viewport',
              //     'width=device-width, initial-scale=1.0,  user-scalable=no')

            }

            if (!SelfHosted && this.human_position_top == null && bot == null) ;

            if (bot != null) {
              script.setAttribute('human_position_bottom', bot);
            }

            if (this.human_position_top != null) {
              script.setAttribute('human_position_top', this.human_position_top);
            }

            script.setAttribute('human_scale_ratio', ratio);
            document.body.appendChild(script);

            script.onload = function () {
              window.ResetDivWebsignLanguagePosition(); // alert('xxx')

              if (/Mobile/.test(navigator.userAgent)) {
                var signElem = document.getElementById(IdOfWebsignLanguage);
                signElem.style.pointerEvents = 'none';
              }
            };
          } //*/

        } catch (e) {
        } // document.write(`<div>1</div>`)
        // LOG.debug('document', document)
        //*


        if (!this.existIgnore()) {
          this.show(isAging);
          this.message.publish('openState', true);
        } else {
          var namespace = this.config.namespace;
          cookie.set('show', true, namespace);

          var __href = document.getElementById('assist-open').getAttribute('assist-href');

          window.location.href = __href;
        } //*/

        if (window.OnClick_btn_Expand3DScene) {
          setTimeout(function () {
            window.OnClick_btn_Expand3DScene(); //PlaySignLanguageDirect
          }, 10);
        }

        if (/Mobile/.test(navigator.userAgent)) {
          document.documentElement.classList.add('mobile-on');
        }

        if (isAging) {
          initAging();
          var allElements = document.getElementsByTagName('*');
          var signElem = document.getElementById(IdOfWebsignLanguage);
          var barrierFreeElem = document.getElementById('keenbow-barrier-free');

          var _iterator7 = _createForOfIteratorHelper(allElements),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var element = _step7.value;
              if (signElem && signElem.contains(element)) continue;
              if (barrierFreeElem && barrierFreeElem.contains(element)) continue;

              if (/Mobile/.test(navigator.userAgent)) {
                element.classList.add('aging-mob');
              } else {
                element.classList.add('aging-on');
              }
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        } else {
          Tools.GetJson('https://pro.keenbow.com/prod/across/the.json', function (json) {
            json = json["default"];

            if (!json) {
              return;
            }

            var value = undefined;

            for (var key in json) {
              if (window.location.href.includes(key)) {
                value = json[key];
                break;
              }
            }

            if (value) {
              var link_obj = document.createElement('link');
              link_obj.type = 'text/css';
              link_obj.rel = 'stylesheet';
              link_obj.href = 'https://pro.keenbow.com/prod/webslcss/' + value + '.css';
              document.head.appendChild(link_obj);
            }
          });
        }
      }
    }, {
      key: "isShow",
      value: function isShow() {
        var _this4 = this;

        var namespace = this.config.namespace;
        LOG.debug('isShow(), aging-on ', cookie.get('aging-on', namespace)); // addEvent(window,'DOMContentLoaded',()=>{

        addEvent(document, 'DOMContentLoaded', function () {
          // console.log('DOMContentLoaded');
          //   alert(cookie.get('show',namespace))
          if (cookie.get('show', namespace) && !_this4.existIgnore()) {
            //this.isShowTopBar(true)
            _this4.doOpen(cookie.get('aging-on', namespace));

            _this4.message.publish('openState', true);
          } else {
            _this4.message.publish('openState', false);
          } // console.log("SetErrorCallbackFunc", window.SetErrorCallbackFunc);
          // window.SetErrorCallbackFunc && window.SetErrorCallbackFunc(e=>console.log(e))

        });
      }
    }, {
      key: "existIgnore",
      value: function existIgnore() {
        var namespace = this.config.namespace;
        var _location = location,
            origin = _location.origin,
            pathname = _location.pathname;

        var __key = "".concat(origin).concat(pathname);

        return cookie.getTag(namespace).includes(__key);
      }
    }, {
      key: "show",
      value: function show(isAging) {
        if (/Mobile/.test(navigator.userAgent)) {
          this.isMobile = true;
        }

        if (this.isMobile) {
          this.toggleBotBar(true, isAging);
        } else {
          this.isShowTopBar(true);
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isMobile) {
          this.toggleBotBar(false);
        } else {
          this.isShowTopBar(false);
        }
      }
    }, {
      key: "showTag",
      value: function showTag() {
        var namespace = this.config.namespace;
        cookie.setTag(namespace); // 设置忽略

        this.resetAction(); // 重置插件状态
      }
    }, {
      key: "toggleBotBar",
      value: function toggleBotBar(isShow, isAging) {
        var namespace = this.config.namespace;
        var botbar = document.getElementById("".concat(namespace, "-botbar-html"));

        if (isShow) {
          if (isAging) {
            var MenuFontsize = document.getElementById("".concat(namespace, "-").concat(Elems.MenuFontsize));
            document.documentElement.classList.add('x18');

            var _iterator8 = _createForOfIteratorHelper(document.body.children),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var el = _step8.value;

                if (el.id != 'keenbow-barrier-free' && el.id != IdOfWebsignLanguage) {
                  el.style.zoom = 1.08;
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            Array.from(MenuFontsize.children).forEach(function (one) {
              return one.classList.remove('active');
            });
            MenuFontsize.children[0].classList.add('active');
          }

          botbar.style.display = 'block'; // document.body.style.marginBottom = '282px'

          document.body.style.marginBottom = '22vw';
          cookie.set('show', true, namespace);
          this.hideModules();

          if (!this.setClick) {
            this.setClick = true;
            Tools.setDBClick(this);
          }
        } else {
          document.body.style.cssText = ''; //activeBtn.style.display = 'none'

          cookie.remove("".concat(namespace));
          location.reload();
        }
      }
    }, {
      key: "isShowTopBar",
      value: function isShowTopBar(isShow) {
        var namespace = this.config.namespace;
        var activeBtn = document.getElementById("".concat(namespace, "-topbar-html"));

        if (isShow) {
          document.body.style.marginTop = '100px';
          activeBtn.style.display = 'block';
          cookie.set('show', true, namespace);
          this.hideModules();
          // window.ResetDivWebsignLanguagePosition();

        } else {
          document.body.style.cssText = ''; //activeBtn.style.display = 'none'

          cookie.remove("".concat(namespace));
          location.reload();
        }
      }
    }, {
      key: "hideModules",
      value: function hideModules() {
        var namespace = this.config.namespace;
        var classList = document.getElementsByClassName("".concat(namespace, "-hide"));

        for (var i = 0; i < classList.length; i++) {
          classList[i].style.display = 'none';
        }
      }
    }, {
      key: "creatStyle",
      value: function creatStyle(id, css) {
        var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!flag) {
          this.tmplStyle.push(css);
        } else {
          var namespace = this.config.namespace;
          var styleNode = document.createElement('style');
          styleNode.type = 'text/css';
          styleNode.id = "".concat(namespace, "-").concat(id);
          styleNode.className = id;

          if (styleNode.styleSheet) {
            styleNode.styleSheet.cssText = css;
          } else {
            styleNode.innerHTML = css;
          }

          document.getElementsByTagName('head')[0].appendChild(styleNode);
        }
      }
    }, {
      key: "creatHtml",
      value: function creatHtml(id, htmlFn) {
        var namespace = this.config.namespace;
        var DomContainer = document.createElement("div");
        DomContainer.id = "".concat(namespace, "-").concat(id);
        DomContainer.className = id;
        DomContainer.style.display = 'none';

        if (typeof htmlFn !== 'function') {
          console.error('htmlFn不是一个函数');
          return;
        }

        var __html = htmlFn(namespace);

        DomContainer.innerHTML = __html;
        this.tmplHtml.push(DomContainer.outerHTML);
      }
    }, {
      key: "registeHtml",
      value: function registeHtml() {
        var namespace = this.config.namespace;
        document.getElementById(namespace).innerHTML = this.tmplHtml.join('');
      }
    }, {
      key: "registeStyle",
      value: function registeStyle() {
        var namespace = this.config.namespace;
        var styleNode = document.createElement('style');
        styleNode.type = 'text/css';
        styleNode.id = "".concat(namespace, "-style");

        var __css = this.tmplStyle.join('\n');

        if (styleNode.styleSheet) {
          styleNode.styleSheet.cssText = __css;
        } else {
          styleNode.innerHTML = __css;
        }

        document.getElementsByTagName('head')[0].appendChild(styleNode);
      }
    }, {
      key: "formatLongText",
      value: function formatLongText() {
        var namespace = this.config.namespace;
        var longText = document.getElementsByClassName("".concat(namespace, "-long-text")) || [];
        [].forEach.call(longText, function (el) {
          var __el = el.innerText.split('。');

          var __elItem = [];

          __el.map(function (item) {
            __elItem.push("<label>".concat(item, "</label>"));
          });

          el.innerHTML = __elItem.join('。');
        });
      }
    }]);

    return Base;
  }();

  // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  var thisNumberValue = functionUncurryThis(1.0.valueOf);

  var $RangeError = RangeError;
  var $String = String;
  var floor = Math.floor;
  var repeat = functionUncurryThis(stringRepeat);
  var stringSlice = functionUncurryThis(''.slice);
  var un$ToFixed = functionUncurryThis(1.0.toFixed);

  var pow = function (x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };

  var log = function (x) {
    var n = 0;
    var x2 = x;
    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }
    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    } return n;
  };

  var multiply = function (data, n, c) {
    var index = -1;
    var c2 = c;
    while (++index < 6) {
      c2 += n * data[index];
      data[index] = c2 % 1e7;
      c2 = floor(c2 / 1e7);
    }
  };

  var divide = function (data, n) {
    var index = 6;
    var c = 0;
    while (--index >= 0) {
      c += data[index];
      data[index] = floor(c / n);
      c = (c % n) * 1e7;
    }
  };

  var dataToString = function (data) {
    var index = 6;
    var s = '';
    while (--index >= 0) {
      if (s !== '' || index === 0 || data[index] !== 0) {
        var t = $String(data[index]);
        s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
      }
    } return s;
  };

  var FORCED = fails(function () {
    return un$ToFixed(0.00008, 3) !== '0.000' ||
      un$ToFixed(0.9, 0) !== '1' ||
      un$ToFixed(1.255, 2) !== '1.25' ||
      un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
  }) || !fails(function () {
    // V8 ~ Android 4.3-
    un$ToFixed({});
  });

  // `Number.prototype.toFixed` method
  // https://tc39.es/ecma262/#sec-number.prototype.tofixed
  _export({ target: 'Number', proto: true, forced: FORCED }, {
    toFixed: function toFixed(fractionDigits) {
      var number = thisNumberValue(this);
      var fractDigits = toIntegerOrInfinity(fractionDigits);
      var data = [0, 0, 0, 0, 0, 0];
      var sign = '';
      var result = '0';
      var e, z, j, k;

      // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
      if (fractDigits < 0 || fractDigits > 20) throw $RangeError('Incorrect fraction digits');
      // eslint-disable-next-line no-self-compare -- NaN check
      if (number != number) return 'NaN';
      if (number <= -1e21 || number >= 1e21) return $String(number);
      if (number < 0) {
        sign = '-';
        number = -number;
      }
      if (number > 1e-21) {
        e = log(number * pow(2, 69, 1)) - 69;
        z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;
        if (e > 0) {
          multiply(data, 0, z);
          j = fractDigits;
          while (j >= 7) {
            multiply(data, 1e7, 0);
            j -= 7;
          }
          multiply(data, pow(10, j, 1), 0);
          j = e - 1;
          while (j >= 23) {
            divide(data, 1 << 23);
            j -= 23;
          }
          divide(data, 1 << j);
          multiply(data, 1, 1);
          divide(data, 2);
          result = dataToString(data);
        } else {
          multiply(data, 0, z);
          multiply(data, 1 << -e, 0);
          result = dataToString(data) + repeat('0', fractDigits);
        }
      }
      if (fractDigits > 0) {
        k = result.length;
        result = sign + (k <= fractDigits
          ? '0.' + repeat('0', fractDigits - k) + result
          : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
      } else {
        result = sign + result;
      } return result;
    }
  });

  var ZoomPage = {
    init: function init(core) {
      var namespace = core.config.namespace;
      this.size = cookie.get('zoom', namespace) || 1.0;
      this.ignore = ['LINK', 'SCRIPT'];
      this.namespace = namespace;
      LOG.debug('--', this.size, cookie.get('zoom', namespace));
      this.set();
    },
    setEvents: function setEvents(core) {
      var _this = this;

      var namespace = core.config.namespace;

      document.getElementById("".concat(namespace, "-zoom-out")).onclick = function () {
        _this.zoomOut(core);
      };

      document.getElementById("".concat(namespace, "-zoom-min")).onclick = function () {
        _this.zoomMin(core);
      };

      document.body.addHotKey(["Control", "alt", "+"], function (el) {
        return _this.zoomOut(core);
      });
      document.body.addHotKey(["Control", "alt", "="], function (el) {
        return _this.zoomOut(core);
      });
      document.body.addHotKey(["Control", "alt", "-"], function (el) {
        return _this.zoomMin(core);
      });
      addEvent(window, 'DOMContentLoaded', function () {
        _this.updateZoomState(core);
      });
    },
    updateZoomState: function updateZoomState(core) {
      var message = core.message;
      message.publish('zoomState', this.size);
    },
    zoomOut: function zoomOut(core) {
      if (this.size >= 1.3) {
        console.log('已最大');
        Audio$1.playAudio(audioTabText.zoomOutEnd);
        this.updateZoomState(core);
        return;
      }

      this.size = parseFloat((this.size + 0.1).toFixed(10));
      this.updateZoomState(core);
      this.set();
      Audio$1.playAudio(audioTabText.zoomOut);
    },
    zoomMin: function zoomMin(core) {
      if (this.size <= 1.0) {
        console.log('已最小');
        Audio$1.playAudio(audioTabText.zoomMinEnd);
        this.updateZoomState(core);
        return;
      }

      this.size = parseFloat((this.size - 0.1).toFixed(10));
      this.updateZoomState(core);
      this.set();
      Audio$1.playAudio(audioTabText.zoomMin);
    },
    set: function set() {
      var _this2 = this;

      [].forEach.call(document.body.children, function (el) {
        var __el = el.tagName.toUpperCase();

        if (_this2.ignore.indexOf(__el) > -1 || el.id == _this2.namespace) {
          return;
        } // console.error('zoom', this.size);


        el.style.zoom = _this2.size;
        var delta = (_this2.size - 1) * 0.3 + 1;
        el.style.setProperty('-moz-transform', "scale(".concat(delta, ")")); //  el.style.transform = `scale(${this.size})`
        //el.style.transformOrigin = '0px 0px'
        // console.log('origin font size', el, getComputedStyle(el, null)['font-size']);
        // const sizeStr = getComputedStyle(el, null)['font-size']
        // const size = new Number(sizeStr.replaceAll('px', ''))
        // el.style.setProperty('font-size', size * 1.5 + 'px', 'important');
        // el.style.setProperty('font-size', '30px', 'important');
        // el.setAttribute('style', 'font-size: 30px !important');
      });
      cookie.set('zoom', this.size, this.namespace);
    },
    reset: function reset() {
      this.size = 1.0;
      this.set();
    }
  };

  var styles$2 = ".pointer-follow-html-x, .pointer-follow-html-y {\n  z-index: 99999999999;\n  transform: none;\n  transform-origin: 0px 0px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: #ff0000 !important;\n  width: 100%;\n  height: 4px;\n}\n.pointer-follow-html-y {\n  height: 100%;\n  width: 4px;\n}";

  var PointerFllowHtml = function PointerFllowHtml() {
    return "<div class='pointer-follow-html'>\n        <div  class=\"pointer-follow-html-x\" id=\"pointer-follow-html-x\"></div>\n        <div class=\"pointer-follow-html-y\" id=\"pointer-follow-html-y\"></div>\n      </div>";
  };

  var PointerFllow = {
    init: function init(core) {
      core.config.namespace;
      this.body = document.body;
      core.creatStyle('pointer-follow-style', styles$2);
      core.creatHtml('pointer-follow-html', PointerFllowHtml);
    },
    setEvents: function setEvents(core) {
      var namespace = core.config.namespace;

      if (cookie.get('pointer', namespace)) {
        this.show(core);
        document.getElementById("".concat(namespace, "-pointer-follow")).title = utilLabel.BtnCross$ontitle;
      }

      this.togglePointer(core, namespace);
    },
    addEventMove: function addEventMove() {
      addEvent(this.body, 'mousemove', this.mouseMove);
    },
    removeEventMove: function removeEventMove() {
      removeEvent(this.body, 'mousemove', this.mouseMove);
    },
    togglePointer: function togglePointer(core, namespace) {
      var _this = this;

      var tabBarBtn = document.getElementById("".concat(namespace, "-pointer-follow"));
      var activeBtn = document.getElementById("".concat(namespace, "-pointer-follow-html"));

      var fn = function fn() {
        if (activeBtn.style.display == 'block') {
          _this.reset(core);

          Audio$1.playAudio(audioTabText.pointerFollowClose);
          tabBarBtn.title = utilLabel.BtnCross$offtitle;
        } else {
          _this.show(core);

          Audio$1.playAudio(audioTabText.pointerFollowOpen);
          tabBarBtn.title = utilLabel.BtnCross$ontitle;
        }
      };

      tabBarBtn.onclick = function () {
        fn();
      };

      document.body.addHotKey(["Control", "alt", "n"], function (el) {
        fn();
      });
    },
    mouseMove: function mouseMove(event) {
      var event = window.event || event;
      var pointerX = document.getElementById("pointer-follow-html-x"),
          pointerY = document.getElementById("pointer-follow-html-y");
      pointerX.style.top = event.clientY - 10 + "px";
      pointerY.style.left = event.clientX - 10 + "px";
    },
    show: function show(core) {
      var namespace = core.config.namespace;
      var activeBtn = document.getElementById("".concat(namespace, "-pointer-follow-html"));
      activeBtn.style.display = 'block';
      this.addEventMove();
      cookie.set('pointer', true, namespace);
    },
    reset: function reset(core) {
      var namespace = core.config.namespace;
      var activeBtn = document.getElementById("".concat(namespace, "-pointer-follow-html"));
      activeBtn.style.display = 'none';
      this.removeEventMove();
      cookie.set('pointer', false, namespace);
      document.getElementById("".concat(namespace, "-pointer-follow")).title = utilLabel.BtnCross$offtitle;
    }
  };

  var styles$1 = "* {\n  cursor: url(\"https://keenbow.com/dl/allaw.cur\"), auto !important;\n}\n\na {\n  cursor: url(\"./linkaw.cur\"), auto !important;\n}";

  var CursorAuto = {
    init: function init(core) {
      core.config.namespace;
    },
    setEvents: function setEvents(core) {
      var namespace = core.config.namespace;
      var tabBarBtn = document.getElementById("".concat(namespace, "-cursor-auto"));

      if (cookie.get('cursor', namespace)) {
        core.creatStyle('cursor-auto-style', styles$1, true);
        tabBarBtn.title = utilLabel.BtnCursor$ontitle;
      }

      var fn = function fn() {
        var activeBtn = document.getElementById("".concat(namespace, "-cursor-auto-style"));

        if (activeBtn) {
          removeNode(activeBtn);
          cookie.set('cursor', false, namespace);
          tabBarBtn.title = utilLabel.BtnCursor$offtitle;
          Audio$1.playAudio(audioTabText.cursorAutoClose);
        } else {
          cookie.set('cursor', true, namespace);
          core.creatStyle('cursor-auto-style', styles$1, true);
          tabBarBtn.title = utilLabel.BtnCursor$ontitle;
          Audio$1.playAudio(audioTabText.cursorAutoOpen);
        }
      };

      tabBarBtn.onclick = function () {
        return fn();
      };

      document.body.addHotKey(["Control", "alt", "m"], function (el) {
        return fn();
      });
    },
    reset: function reset(core) {
      var namespace = core.config.namespace;
      var activeBtn = document.getElementById("".concat(namespace, "-cursor-auto-style"));
      activeBtn && removeNode(activeBtn);
      var tabBarBtn = document.getElementById("".concat(namespace, "-cursor-auto"));
      tabBarBtn.title = utilLabel.BtnCursor$offtitle;
    }
  };

  var styles = "html.barrier-free.x17 {\n  font-size: 4.9vw;\n}\n\nhtml.barrier-free.x18 {\n  font-size: 5.2vw;\n}\n\n.mobile-on DIV[id^=dlck] {\n  display: none;\n}\n.mobile-on .article-main {\n  width: auto;\n}\n\n#keenbow-barrier-free #keenbow-barrier-free-botbar-html {\n  line-height: 28px;\n}\n#keenbow-barrier-free .botbar-html {\n  width: 100%;\n  background: white;\n  overflow: hidden;\n  z-index: 2147483645;\n  position: fixed;\n  bottom: 0;\n}\n#keenbow-barrier-free .botbar-html-content {\n  border-top: solid 1pt skyblue;\n}\n#keenbow-barrier-free .botbar-html-content * {\n  font-size: 5vw;\n}\n#keenbow-barrier-free .botbar-html-content th:target,\n#keenbow-barrier-free .botbar-html-content th:focus,\n#keenbow-barrier-free .botbar-html-content th:active,\n#keenbow-barrier-free .botbar-html-content th:hover,\n#keenbow-barrier-free .botbar-html-content th:visited {\n  background: skyblue;\n}\n#keenbow-barrier-free .botbar-html-content .active {\n  background: skyblue;\n}\n#keenbow-barrier-free .botbar-html-content tr {\n  display: contents;\n}\n#keenbow-barrier-free .botbar-html-content th {\n  padding: 2vw 2vw 2vw;\n  vertical-align: bottom;\n  color: black;\n  text-align: center;\n  font-weight: normal;\n  overflow: hidden;\n  display: inline-table;\n}\n#keenbow-barrier-free .botbar-html-content th .img-div {\n  line-height: 4vw;\n  width: 100%;\n}\n#keenbow-barrier-free .botbar-html-content th img {\n  width: calc(100% - 17vw);\n  margin-top: 2vw;\n  height: auto;\n}\n#keenbow-barrier-free .botbar-html-content th span:after {\n  content: \"\";\n  height: 8px;\n  display: block;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu {\n  height: 230pt;\n  width: 100%;\n  background: white;\n  color: black;\n  border-bottom: solid 1pt skyblue;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu .menu-li {\n  height: 48pt;\n  text-align: center;\n  line-height: 48pt;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu .menu-li:not(:first-child) {\n  border-top: solid 1px skyblue;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu .menu-content {\n  width: 100%;\n  height: 100%;\n  padding: 3vw;\n  box-sizing: border-box;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu .menu-content-button {\n  border: solid 1px skyblue;\n  border-radius: 2vw;\n  height: 10vw;\n  line-height: 10vw;\n  text-align: center;\n  margin: 2vw;\n  position: relative;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu :where(.menu-content).menu-font span.size-l {\n  font-size: 6vw;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu :where(.menu-content).menu-font span.size-xl {\n  font-size: 7vw;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu :where(.menu-content).menu-font div {\n  height: 10vw;\n  line-height: 10vw;\n  margin: 3vw;\n  padding-left: 2vw;\n  position: relative;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu img {\n  display: none;\n  position: absolute;\n  right: 5vw;\n  padding: 1vw;\n  box-sizing: border-box;\n  height: 10vw;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu .active img {\n  display: inline;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-menu :where(.menu-content).menu-sign .menu-content-button {\n  margin: 3vw;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-hint {\n  height: 50vh;\n  width: 100%;\n  background: white;\n  color: black;\n  border-bottom: solid 1pt skyblue;\n}\n#keenbow-barrier-free #keenbow-barrier-free-botbar-hint p {\n  height: 160pt;\n  font-size: 6vw;\n  line-height: 10vw;\n  overflow: auto;\n}";

  var BotBar = {
    init: function init(core) {
      var namespace = core.config.namespace;
      this.namespace = namespace;
      core.creatStyle('topbar-style', styles);
      core.creatHtml('botbar-html', botBarHtml);
      this.colorState = 0;
      this.signSpeed = '1.0';
      this.showMenu = false;
    },
    setEvents: function setEvents(core) {
      var _this = this;

      var namespace = core.config.namespace;
      var BtnChangeColor = document.getElementById("".concat(namespace, "-").concat(Elems.ChangeColor));
      var BtnAudioToggle = document.getElementById("".concat(namespace, "-").concat(Elems.AudioToggle));
      var BtnClose = document.getElementById("".concat(namespace, "-").concat(Elems.Close));
      var BtnSetting = document.getElementById("".concat(namespace, "-").concat(Elems.Setting));
      var btns = [BtnSetting, BtnAudioToggle, BtnChangeColor, BtnClose];
      var BarMenu = document.getElementById("".concat(namespace, "-").concat(Elems.Menu));

      var changeColor = function changeColor() {
        var stylesheet = document.styleSheets[0];

        if (stylesheet.cssRules && stylesheet.cssRules[0] && stylesheet.cssRules[0].cssText.startsWith('.barrier-free:not(svg) { background')) {
          stylesheet.deleteRule(0);
        }

        switch (_this.colorState) {
          case 0:
            _this.colorState = 1;
            _this.lastColorCssText = ".barrier-free:not(svg) { background-color: white !important; color: black !important;}"; // BtnChangeColor.title = utilLabel.BtnChangeColor$mode1title;

            Audio$1.playAudio(utilLabel.BtnChangeColor$mode1hint);
            break;

          case 1:
            _this.colorState = 2;
            _this.lastColorCssText = ".barrier-free:not(svg) { background-color: #0000FF !important; color: #FFFF00 !important;}"; // BtnChangeColor.title = utilLabel.BtnChangeColor$mode2title;

            Audio$1.playAudio(utilLabel.BtnChangeColor$mode2hint);
            break;

          case 2:
            _this.colorState = 3;
            _this.lastColorCssText = ".barrier-free:not(svg) { background-color: #FFFF00 !important; color: black !important;}"; // BtnChangeColor.title = utilLabel.BtnChangeColor$mode3title;

            Audio$1.playAudio(utilLabel.BtnChangeColor$mode3hint);
            break;

          case 3:
            _this.colorState = 4;
            _this.lastColorCssText = ".barrier-free:not(svg) { background-color: black !important; color: #FFFF00 !important;}"; // BtnChangeColor.title = utilLabel.BtnChangeColor$mode4title;

            Audio$1.playAudio(utilLabel.BtnChangeColor$mode4hint);
            break;

          default:
            _this.colorState = 0; // BtnChangeColor.title = utilLabel.BtnChangeColor$mode0title;

            Audio$1.playAudio(utilLabel.BtnChangeColor$mode0hint);
            break;
        }

        if (0 != _this.colorState) {
          stylesheet.insertRule(_this.lastColorCssText, 0);
        }

        return false;
      };

      var highlightBtnId = -1;
      var lock = new Lock();

      var highlightBtn = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(target) {
          var i;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return lock.acquire();

                case 2:
                  highlightBtnId = target;

                  for (i in btns) {
                    console.log(i, highlightBtnId, btns);

                    if (i == highlightBtnId) ; else {
                      // btns[i].children[1].innerHTML = '-'
                      // btns[i].classList.remove('active')
                      btns[i].style.background = 'white';
                    }
                  } // btns[highlightBtnId].classList.add('active')


                  btns[highlightBtnId].style.background = 'skyblue';
                  _context.next = 8;
                  return lock.release();

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function highlightBtn(_x) {
          return _ref.apply(this, arguments);
        };
      }();

      BtnSetting.onclick = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return highlightBtn(0);

              case 2:
                setTimeout(function () {
                  if (_this.showMenu) {
                    BarMenu.style.display = 'none';
                  } else {
                    Audio$1.playAudio(audioTabText.openMenu);
                    BarMenu.style.display = 'flex';
                  }

                  _this.showMenu = !_this.showMenu;
                }, 8);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      BtnChangeColor.onclick = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return highlightBtn(2);

              case 2:
                setTimeout(function () {
                  changeColor();
                }, 8);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      BtnAudioToggle.onclick = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return highlightBtn(1);

              case 2:
                setTimeout(function () {
                  if (Audio$1.isAudio) {
                    BtnAudioToggle.getElementsByTagName("img")[0].src = Imgs.voiceOff();
                    Audio$1.playAudio(audioTabText.audioClose);
                    Audio$1.closeAudio(1000);
                  } else {
                    BtnAudioToggle.getElementsByTagName("img")[0].src = Imgs.voiceOn();
                    Audio$1.showAudio();
                    Audio$1.playAudio(audioTabText.audioOpen);

                    if (true != cookie.get('hint-opened', namespace)) {
                      cookie.set('hint-opened', true, namespace);
                      document.getElementById("".concat(namespace, "-").concat(Elems.Hint)).style.display = 'block';
                    }
                  }
                }, 8);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      BtnClose.onclick = function () {
        core.close();
      };

      if (Audio$1.isAudio) {
        BtnAudioToggle.getElementsByTagName("img")[0].src = Imgs.voiceOn();
      }

      var MenuItems = document.getElementById("".concat(namespace, "-").concat(Elems.MenuItems));
      var MenuLabel = ['说明,开启“阅读”后，点击文字或控件可以阅读其内容；双击文字或控件，则是操作对应的文字或控件', '字体', '语速', '手语'];
      var MenuContents = document.getElementById("".concat(namespace, "-").concat(Elems.MenuContents));
      Array.from(MenuItems.children).forEach(function (each, i) {
        each.onclick = function () {
          Array.from(MenuItems.children).forEach(function (one) {
            return one.classList.remove('active');
          });
          each.classList.add('active');
          LOG.debug(MenuContents.children, i);
          Array.from(MenuContents.children).forEach(function (one) {
            return one.style.display = 'none';
          });
          MenuContents.children[i].style.display = 'block';
          Audio$1.playAudio(MenuLabel[i]);
        };
      });
      var MenuFontsize = document.getElementById("".concat(namespace, "-").concat(Elems.MenuFontsize));
      var MenuFontsizeLabel = ['设置为更大字体', '设置为大字体', '设置为原字体'];
      Array.from(MenuFontsize.children).forEach(function (each, i) {
        each.onclick = function () {
          Audio$1.playAudio(MenuFontsizeLabel[i]);
          Array.from(MenuFontsize.children).forEach(function (one) {
            return one.classList.remove('active');
          });
          each.classList.add('active');

          switch (i) {
            case 0:
              document.documentElement.classList.remove('x17');
              document.documentElement.classList.add('x18');
              break;

            case 1:
              document.documentElement.classList.remove('x18');
              document.documentElement.classList.add('x17');
              break;

            default:
              document.documentElement.classList.remove('x17');
              document.documentElement.classList.remove('x18');
              break;
          }

          var _iterator = _createForOfIteratorHelper(document.body.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;

              if (el.id != 'keenbow-barrier-free' && el.id != IdOfWebsignLanguage) {
                var zoom = 1;

                switch (i) {
                  case 0:
                    zoom = 1.08;
                    break;

                  case 1:
                    zoom = 1.04;
                    break;

                  default:
                    break;
                }

                el.style.zoom = zoom;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };
      });
      var MenuSpeeds = document.getElementById("".concat(namespace, "-").concat(Elems.MenuSpeeds));
      var speedValues = ['1.5', '1', '0.5'];
      var speedValuesLabel = [audioTabText.speedQuick, audioTabText.speedMiddle, audioTabText.speedSlow];
      Array.from(MenuSpeeds.children).forEach(function (each, i) {
        each.onclick = function () {
          Array.from(MenuSpeeds.children).forEach(function (one) {
            return one.classList.remove('active');
          });
          each.classList.add('active');
          Audio$1.speed = speedValues[i];
          Audio$1.playAudio(speedValuesLabel[i]);
          cookie.set('speed', Audio$1.speed, namespace);
        };
      });
      var speed = cookie.get('speed', namespace);

      if (speed) {
        Audio$1.speed = speed;
        Array.from(MenuSpeeds.children).forEach(function (one) {
          return one.classList.remove('active');
        });

        switch (speed) {
          case "1.5":
            Array.from(MenuSpeeds.children)[0].classList.add('active');
            break;

          case "0.5":
            Array.from(MenuSpeeds.children)[2].classList.add('active');
            break;

          default:
            Array.from(MenuSpeeds.children)[1].classList.add('active');
            break;
        }
      }

      var MenuSignspeeds = document.getElementById("".concat(namespace, "-").concat(Elems.MenuSignspeeds));
      var signspeedValues = ['2.5', '1.5', '1.0'];
      var signspeedLabel = ['设置为较快的手语速度', '设置为适中的手语速度', '设置为较慢的手语速度']; // const speedValuesLabel = [ audioTabText.speedQuick, audioTabText.speedMiddle, audioTabText.speedSlow ]

      Array.from(MenuSignspeeds.children).forEach(function (each, i) {
        each.onclick = function () {
          Audio$1.playAudio(signspeedLabel[i]);
          Array.from(MenuSignspeeds.children).forEach(function (one) {
            return one.classList.remove('active');
          });
          each.classList.add('active');

          if (window.ModifyPlaySpeed) {
            window.ModifyPlaySpeed(signspeedValues[i]);
          }

          cookie.set('sign-speed', signspeedValues[i], namespace);
        };
      });
      var signSpeed = cookie.get('sign-speed', namespace);

      if (signSpeed) {
        if (window.ModifyPlaySpeed) {
          window.ModifyPlaySpeed(signSpeed);
        }

        Array.from(MenuSignspeeds.children).forEach(function (one) {
          return one.classList.remove('active');
        });

        switch (signSpeed) {
          case "2.5":
            Array.from(MenuSignspeeds.children)[0].classList.add('active');
            break;

          case "1.0":
            Array.from(MenuSignspeeds.children)[2].classList.add('active');
            break;

          default:
            Array.from(MenuSignspeeds.children)[1].classList.add('active');
            break;
        }
      }

      var MenuSignOn = document.getElementById("".concat(namespace, "-").concat(Elems.MenuSignOn));

      MenuSignOn.onclick = function () {
        var on = cookie.get('sign-on', namespace);
        on = !on;
        cookie.set('sign-on', on, namespace);

        if (on) {
          Audio$1.playAudio('手语已开启');
          MenuSignOn.classList.add('active');
          MenuSignOn.children[0].innerHTML = '开启';
          document.getElementById(IdOfWebsignLanguage).style.left = '0';
        } else {
          Audio$1.playAudio('手语已关闭');
          MenuSignOn.classList.remove('active');
          MenuSignOn.children[0].innerHTML = '关闭';
          document.getElementById(IdOfWebsignLanguage).style.left = '-100000px';
        }
      };

      if (true != cookie.get('sign-on', namespace)) {
        MenuSignOn.classList.remove('active');
        MenuSignOn.children[0].innerHTML = '关闭';
      }

      var HintClose = document.getElementById("".concat(namespace, "-").concat(Elems.HintClose));

      HintClose.onclick = function () {
        document.getElementById("".concat(namespace, "-").concat(Elems.Hint)).style.display = 'none';
      };
    },
    reset: function reset() {}
  };

  var InitModules = [Theme, TopBar, BotBar, Audio$1, ZoomPage, PointerFllow, CursorAuto, BigText];

  var Assist = /*#__PURE__*/function (_Base) {
    _inherits(Assist, _Base);

    var _super = _createSuper(Assist);

    function Assist() {
      var _this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Assist);

      _this = _super.call(this, opts); // 合并参数

      _this.mergeConfig(opts); // 初始化插件


      _this.init();

      _this.isShow();

      _this.resetAction = _this.reset;
      return _this;
    }

    _createClass(Assist, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        // alert('init')
        var url = '';

        try {
          url = document.currentScript.src;

          if (url) {//return src;
          } else {
            null.split();
          }
        } catch (e) {

          if (e.fileName) {
            url = e.fileName;
          } // Safari
          else if (e.sourceURL) {
            url = e.sourceURL;
          } // Opera 9
          else if (e.stacktrace) {
            url = (e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m) || ["", ""])[1];
          } // Chrome 4+/IE 10+
          else if (e.stack) {
            url = (e.stack.match(/((http|file)\:\/{2,3}\S+\/\S+\.[a-z0-9]+)/i) || ['', ''])[1];
          }
        }

        var index = url.lastIndexOf('/');
        var baseUrl = url.substring(0, index); // LOG.debug('script url', url, baseUrl);

        GVal.baseUrl = baseUrl;
        this.audioUtil = new AudioUtil(url); // 初始化dom
        //  alert('初始化dom')

        InitModules.map(function (item) {
          return _this2.use(item);
        }); // alert('初始化dom-ok')

        this.registeStyle();
        this.registeHtml(); // 初始化事件

        InitModules.map(function (item) {
          return _this2.useEvent(item);
        }); // alert('初始化事件')
        // 格式化大段文本

        this.formatLongText(); // console.log('document.write script');
      }
    }, {
      key: "reset",
      value: function reset() {
        TopBar.reset();
        Audio$1.reset();
        ZoomPage.reset();
        CursorAuto.reset(this);
        PointerFllow.reset(this);
        BigText.reset(this);
      }
    }]);

    return Assist;
  }(Base);

  var AssistEntry = new Assist(config);

  return AssistEntry;

}));
