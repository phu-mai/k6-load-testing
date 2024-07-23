/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  kafkaCreateTopic: () => (/* reexport */ kafkaCreateTopic),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6/x/kafka"
const kafka_namespaceObject = require("k6/x/kafka");
;// CONCATENATED MODULE: ./src/libs/kafkaClient.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//@ts-ignore

var KafkaClient = /*#__PURE__*/function () {
  function KafkaClient(brokers) {
    _classCallCheck(this, KafkaClient);
    _defineProperty(this, "brokers", void 0);
    this.brokers = brokers;
  }
  return _createClass(KafkaClient, [{
    key: "createConnection",
    value: function createConnection() {
      return new kafka_namespaceObject.Connection({
        address: this.brokers[0]
      });
    }
  }, {
    key: "createTopic",
    value: function createTopic(topic) {
      var numPartitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var replicationFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var connection = this.createConnection();
      try {
        var configEntries = [{
          configName: 'compression.type',
          configValue: kafka_namespaceObject.CODEC_SNAPPY // Ensure this value exists in the kafka module
        }];
        var results = connection.createTopic({
          topic: topic,
          numPartitions: numPartitions,
          replicationFactor: replicationFactor,
          configEntries: configEntries
        });
        return results; // Return results if necessary
      } catch (error) {
        console.error("Error creating topic:", error);
        throw error;
      } finally {
        connection.close();
      }
    }
  }, {
    key: "deleteTopic",
    value: function deleteTopic(topic) {
      var connection = this.createConnection();
      try {
        var results = connection.deleteTopic(topic);
        return results;
      } catch (error) {
        console.error("Error deleting topic:", error);
        throw error;
      } finally {
        connection.close();
      }
    }
  }, {
    key: "produceMessage",
    value: function produceMessage(topic, messages) {
      var writer = new kafka_namespaceObject.Writer({
        brokers: this.brokers,
        topic: topic,
        compression: kafka_namespaceObject.CODEC_SNAPPY // Ensure this value exists in the kafka module
      });
      try {
        var error = writer.produce({
          messages: messages
        });
        return error; // Return error if necessary
      } catch (error) {
        console.error("Error producing message:", error);
        throw error;
      } finally {
        writer.close();
      }
    }
  }, {
    key: "consumeMessage",
    value: function consumeMessage(groupID, topic) {
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var reader = new kafka_namespaceObject.Reader({
        brokers: this.brokers,
        groupID: groupID,
        groupTopics: [topic]
      });
      try {
        var messages = reader.consume({
          limit: limit
        });
        return messages; // Return messages if necessary
      } catch (error) {
        console.error("Error consuming message:", error);
        throw error;
      } finally {
        reader.close();
      }
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/scenarios/kafkaClientScenarios.ts
function kafkaClientScenarios_typeof(o) { "@babel/helpers - typeof"; return kafkaClientScenarios_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, kafkaClientScenarios_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == kafkaClientScenarios_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(kafkaClientScenarios_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//@ts-ignore


// const brokers = ["localhost:9092"];
var brokers = ["kafka-cluster-kafka-brokers.middleware:9092"];
var kafkaClient = new KafkaClient(brokers);
function generateRandomTopicName() {
  return "topic-".concat(Math.random().toString(36).substring(7));
}
function kafkaCreateTopic() {
  return _kafkaCreateTopic.apply(this, arguments);
}
function _kafkaCreateTopic() {
  _kafkaCreateTopic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var topicName, createTopicResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          topicName = generateRandomTopicName();
          _context.prev = 1;
          _context.next = 4;
          return kafkaClient.createTopic(topicName, 3, 1);
        case 4:
          createTopicResult = _context.sent;
          console.log('Topic created:', topicName, createTopicResult);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('Error creating topic:', _context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _kafkaCreateTopic.apply(this, arguments);
}
function kafkaDeleteTopic() {
  return _kafkaDeleteTopic.apply(this, arguments);
}
function _kafkaDeleteTopic() {
  _kafkaDeleteTopic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var topicName, deleteTopicResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          topicName = generateRandomTopicName();
          _context2.prev = 1;
          _context2.next = 4;
          return kafkaClient.deleteTopic(topicName);
        case 4:
          deleteTopicResult = _context2.sent;
          console.log('Topic deleted:', topicName, deleteTopicResult);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error('Error deleting topic:', _context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _kafkaDeleteTopic.apply(this, arguments);
}
function kafkaProduceMessage() {
  return _kafkaProduceMessage.apply(this, arguments);
}
function _kafkaProduceMessage() {
  _kafkaProduceMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var topicName, produceMessageResult;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          topicName = generateRandomTopicName();
          _context3.prev = 1;
          _context3.next = 4;
          return kafkaClient.produceMessage(topicName, ['message1', 'message2']);
        case 4:
          produceMessageResult = _context3.sent;
          console.log('Messages produced:', topicName, produceMessageResult);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error('Error producing messages:', _context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _kafkaProduceMessage.apply(this, arguments);
}
function kafkaConsumeMessage() {
  return _kafkaConsumeMessage.apply(this, arguments);
}

// import { KafkaClient } from '../libs/KafkaClient';

// // const brokers = ["localhost:9092"];
// const brokers = ["kafka-cluster-kafka-brokers.middleware:9092"];
// const kafkaClient = new KafkaClient(brokers);

// export function kafkaCreateTopic(){
//   const createTopicResult = kafkaClient.createTopic('test-topic', 3, 1);
//   console.log('Topic created:', createTopicResult);
// }
// export function kafkaDeleteTopic(){
//   const deleteTopicResult = kafkaClient.deleteTopic('test-topic');
//   console.log('Topic deleted:', deleteTopicResult);
// }
// export function kafkaProduceMessage(){
//   const produceMessageResult = kafkaClient.produceMessage('test-topic', ['message1', 'message2']);
//   console.log('Messages produced:', produceMessageResult);
// }
// export function kafkaConsumeMessage(){
//   const messages = kafkaClient.consumeMessage('test-group', 'test-topic');
//   console.log('Messages consumed:', messages);
// }

// async function main() {
//   try {
//     // Create a topic
//     const createTopicResult = kafkaClient.createTopic('example-topic', 3, 1);
//     console.log('Topic created:', createTopicResult);

//     // Produce messages
//     const produceMessageResult = kafkaClient.produceMessage('example-topic', ['message1', 'message2']);
//     console.log('Messages produced:', produceMessageResult);

//     // Consume messages
//     const messages = kafkaClient.consumeMessage('example-group', 'example-topic');
//     console.log('Messages consumed:', messages);

//     // Delete the topic
//     const deleteTopicResult = kafkaClient.deleteTopic('example-topic');
//     console.log('Topic deleted:', deleteTopicResult);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }
function _kafkaConsumeMessage() {
  _kafkaConsumeMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var topicName, messages;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          topicName = generateRandomTopicName();
          _context4.prev = 1;
          _context4.next = 4;
          return kafkaClient.consumeMessage('test-group', topicName);
        case 4:
          messages = _context4.sent;
          console.log('Messages consumed:', topicName, messages);
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          console.error('Error consuming messages:', _context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return _kafkaConsumeMessage.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/libs/executor.ts
function executor_typeof(o) { "@babel/helpers - typeof"; return executor_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, executor_typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function executor_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function executor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, executor_toPropertyKey(descriptor.key), descriptor); } }
function executor_createClass(Constructor, protoProps, staticProps) { if (protoProps) executor_defineProperties(Constructor.prototype, protoProps); if (staticProps) executor_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function executor_defineProperty(obj, key, value) { key = executor_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function executor_toPropertyKey(t) { var i = executor_toPrimitive(t, "string"); return "symbol" == executor_typeof(i) ? i : i + ""; }
function executor_toPrimitive(t, r) { if ("object" != executor_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != executor_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// const defaultEnv = { name: __ENV.ENV || 'perf' };
// const defaultVUs = __ENV.VUS || 1;
// const defaultIterations = __ENV.ITERATIONS || 1;
// const defaultDuration = __ENV.DURATION || '1m';
// const defaultMaxDuration = __ENV.MAX_DURATION || '1m';
// const defaultRate = __ENV.RATE || 1;
// const defaultTimeUnit = __ENV.TIME_UNIT || '1s';
// const defaultStartTime = __ENV.START_TIME || '0s';

// const generateScenarioPerVuIterations = (name, vus, iterations, maxDuration, startTime ) => ({
//   [name]: {
//     executor: 'per-vu-iterations',
//     vus: vus || 1,
//     startTime: startTime || '0s',
//     iterations: iterations || 1,
//     maxDuration: maxDuration || '1m',
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarioConstantArrivalRate = (name, duration, rate, timeUnit, preAllocatedVUs, startTime) => ({
//   [name]: {
//     executor: 'constant-arrival-rate',
//     startTime: startTime || '0s',
//     duration: duration || '1m',
//     rate: rate || 1,
//     timeUnit: timeUnit ,
//     preAllocatedVUs: preAllocatedVUs ,
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarioConstantVUs = (name, vus, duration, startTime) => ({
//   [name]: {
//     executor: 'constant-vus',
//     vus: vus,
//     startTime: startTime,
//     duration: duration,
//     tags: { name: name },
//     env: defaultEnv,
//     exec: name
//   }
// });

// const generateScenarios = (funcExecution, executor) => {
//   const scenarios = {};
//   for (let func of funcExecution) {
//     switch (executor) {
//       case 'per-vu-iterations':
//         Object.assign(scenarios, generateScenarioPerVuIterations(func, defaultVUs, defaultIterations, defaultMaxDuration, defaultStartTime));
//         break;
//       case 'constant-arrival-rate':
//         Object.assign(scenarios, generateScenarioConstantArrivalRate(func, defaultDuration, defaultRate, defaultTimeUnit, defaultVUs, defaultStartTime));
//         break;
//       case 'constant-vus':
//         Object.assign(scenarios, generateScenarioConstantVUs(func, defaultVUs, defaultDuration, defaultStartTime));
//         break;
//       default:
//         console.error('Unknown executor type:', executor);
//     }
//   }
//   return scenarios;
// };

// const generateReqFailedThreshold = (metric, value) => ({
//   [`http_req_failed{name: ${metric}}`]: [`${value}`],
// });

// const generateCustomThreshold = (metric, value) => {
//   // Split the value string into an array of individual threshold values and trim any whitespace
//   const values = value.split(',').map(val => val.trim());
//   return {
//     [metric]: values,
//   };
// };

// /**
//  * Generates a threshold configuration for HTTP request duration.
//  *
//  * @param {string} metric - The name of the metric.
//  * @param {string} value - A comma-separated string of threshold values.
//  * @returns {Object} - The threshold configuration object.
//  */
// const generateReqDurationThreshold = (metric, value) => {
//   // Split the value string into an array of individual threshold values and trim any whitespace
//   const values = value.split(',').map(val => val.trim());
//   return {
//     // Create a property with the metric name and its threshold values
//     [`http_req_duration{name: "${metric}"}`]: values,
//   };
// };

// export {
//   generateScenarios,
//   generateScenarioConstantVUs,
//   generateScenarioConstantArrivalRate,
//   generateScenarioPerVuIterations,
//   generateReqDurationThreshold,
//   generateCustomThreshold,
//   generateReqFailedThreshold
// };

var k6Executor = /*#__PURE__*/function () {
  function k6Executor() {
    executor_classCallCheck(this, k6Executor);
    executor_defineProperty(this, "VUs", void 0);
    executor_defineProperty(this, "iterations", void 0);
    executor_defineProperty(this, "duration", void 0);
    executor_defineProperty(this, "maxDuration", void 0);
    executor_defineProperty(this, "rate", void 0);
    executor_defineProperty(this, "timeUnit", void 0);
    executor_defineProperty(this, "startTime", void 0);
    this.VUs = Number(__ENV.VUS) || 1;
    this.iterations = Number(__ENV.ITERATIONS) || 1;
    this.duration = __ENV.DURATION || '1m';
    this.maxDuration = __ENV.MAX_DURATION || '1m';
    this.rate = Number(__ENV.RATE) || 1;
    this.timeUnit = __ENV.TIME_UNIT || '1s';
    this.startTime = __ENV.START_TIME || '0s';
  }
  return executor_createClass(k6Executor, [{
    key: "generateScenarioPerVuIterations",
    value: function generateScenarioPerVuIterations(name) {
      return executor_defineProperty({}, name, {
        executor: 'per-vu-iterations',
        vus: this.VUs,
        startTime: this.startTime,
        iterations: this.iterations,
        maxDuration: this.maxDuration,
        tags: {
          name: name
        },
        env: {
          name: __ENV.ENV || 'perf'
        },
        exec: name
      });
    }
  }, {
    key: "generateScenarioConstantArrivalRate",
    value: function generateScenarioConstantArrivalRate(name) {
      return executor_defineProperty({}, name, {
        executor: 'constant-arrival-rate',
        startTime: this.startTime,
        duration: this.duration,
        rate: this.rate,
        timeUnit: this.timeUnit,
        preAllocatedVUs: this.VUs,
        tags: {
          name: name
        },
        env: {
          name: __ENV.ENV || 'perf'
        },
        exec: name
      });
    }
  }, {
    key: "generateScenarioConstantVUs",
    value: function generateScenarioConstantVUs(name) {
      return executor_defineProperty({}, name, {
        executor: 'constant-vus',
        vus: this.VUs,
        startTime: this.startTime,
        duration: this.duration,
        tags: {
          name: name
        },
        env: {
          name: __ENV.ENV || 'perf'
        },
        exec: name
      });
    }
  }, {
    key: "generateScenarios",
    value: function generateScenarios(funcExecution, executor) {
      var scenarios = {};
      var _iterator = _createForOfIteratorHelper(funcExecution),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var func = _step.value;
          switch (executor) {
            case 'per-vu-iterations':
              Object.assign(scenarios, this.generateScenarioPerVuIterations(func));
              break;
            case 'constant-arrival-rate':
              Object.assign(scenarios, this.generateScenarioConstantArrivalRate(func));
              break;
            case 'constant-vus':
              Object.assign(scenarios, this.generateScenarioConstantVUs(func));
              break;
            default:
              console.error('Unknown executor type:', executor);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return scenarios;
    }
  }, {
    key: "generateReqFailedThreshold",
    value: function generateReqFailedThreshold(metric, value) {
      return executor_defineProperty({}, "http_req_failed{name: ".concat(metric, "}"), ["".concat(value)]);
    }
  }, {
    key: "generateCustomThreshold",
    value: function generateCustomThreshold(metric, value) {
      var values = value.split(',').map(function (val) {
        return val.trim();
      });
      return executor_defineProperty({}, metric, values);
    }
  }, {
    key: "generateReqDurationThreshold",
    value: function generateReqDurationThreshold(metric, value) {
      var values = value.split(',').map(function (val) {
        return val.trim();
      });
      return executor_defineProperty({}, "http_req_duration{name: \"".concat(metric, "\"}"), values);
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/tests/kafka/kafkaCreateTopic.ts



// Initialize the executor
var k6exec = new k6Executor();
var funcExecution = ['kafkaCreateTopic'];
var executor = __ENV.EXECUTOR || 'per-vu-iterations';
var scenarios = k6exec.generateScenarios(funcExecution, executor);
var threshold = Object.assign({}, k6exec.generateCustomThreshold('http_req_duration{ scenario: kafkaCreateTopic }', 'avg<=23904'), k6exec.generateCustomThreshold('http_req_failed{ scenario: kafkaCreateTopic }', 'rate<=0.03'));
var options = {
  scenarios: scenarios,
  thresholds: threshold
};
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=kafkaCreateTopic.js.map