/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
  getUserRandom: () => (/* reexport */ getUserRandom),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6/x/sql"
const sql_namespaceObject = require("k6/x/sql");
var sql_default = /*#__PURE__*/__webpack_require__.n(sql_namespaceObject);
;// CONCATENATED MODULE: ./src/libs/sqlDBClient.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//@ts-ignore

var SqlDBClient = /*#__PURE__*/function () {
  // Constructor to initialize SQL database connection settings
  function SqlDBClient(sqlDBName, sqlDBUserName, sqlDBPassword, sqlDBHost) {
    var sqlDBPort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5432;
    var dbType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'postgres';
    _classCallCheck(this, SqlDBClient);
    _defineProperty(this, "dbType", void 0);
    _defineProperty(this, "sqlDBHost", void 0);
    _defineProperty(this, "sqlDBPort", void 0);
    _defineProperty(this, "sqlDBName", void 0);
    _defineProperty(this, "sqlDBUserName", void 0);
    _defineProperty(this, "sqlDBPassword", void 0);
    _defineProperty(this, "dbConnectionString", void 0);
    _defineProperty(this, "dbConnection", void 0);
    this.dbType = dbType;
    this.sqlDBName = sqlDBName;
    this.sqlDBUserName = sqlDBUserName;
    this.sqlDBPassword = sqlDBPassword;
    this.sqlDBHost = sqlDBHost;
    this.sqlDBPort = sqlDBPort;
    this.dbConnectionString = this.constructConnectionString();
    this.dbConnection = this.connect(); // Establish a connection to the database
  }

  // Method to construct the connection string based on the dbType
  return _createClass(SqlDBClient, [{
    key: "constructConnectionString",
    value: function constructConnectionString() {
      switch (this.dbType) {
        case 'postgres':
          return "postgres://".concat(this.sqlDBUserName, ":").concat(this.sqlDBPassword, "@").concat(this.sqlDBHost, ":").concat(this.sqlDBPort, "/").concat(this.sqlDBName, "?sslmode=disable");
        case 'mysql':
          return "".concat(this.sqlDBUserName, ":").concat(this.sqlDBPassword, "@tcp(").concat(this.sqlDBHost, ":").concat(this.sqlDBPort, ")/").concat(this.sqlDBName);
        case 'mssql':
          return "server=".concat(this.sqlDBHost, ";database=").concat(this.sqlDBName, ";user id=").concat(this.sqlDBUserName, ";password=").concat(this.sqlDBPassword);
        default:
          throw new Error("Unsupported database type: ".concat(this.dbType));
      }
    }

    // Method to establish a connection to the database
  }, {
    key: "connect",
    value: function connect() {
      try {
        return sql_default().open(this.dbType, this.dbConnectionString); // Open database connection
      } catch (error) {
        console.error('Error opening database connection:', error); // Log error if connection fails
        throw error; // Propagate error
      }
    }

    // Method to close the database connection
  }, {
    key: "close",
    value: function close() {
      try {
        this.dbConnection.close(); // Close database connection
      } catch (error) {
        console.error('Error closing database connection:', error); // Log error if closing fails
      }
    }

    // Method to get a random user from the database
  }, {
    key: "getRandomUser",
    value: function getRandomUser() {
      try {
        var query = 'SELECT * FROM users ORDER BY RANDOM() LIMIT 1'; // Query to fetch a random user
        var result = sql_default().query(this.dbConnection, query); // Execute query
        return result; // Return the result
      } catch (error) {
        console.error('Error fetching random user:', error); // Log error if fetching fails
        throw error; // Propagate error
      }
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/scenarios/sqlDBClient.ts


// Environment variable configuration
// Export these variables in your environment or in a .env file before running the script
// export DB_USER=your_database_username
// export DB_PASSWORD=your_database_password
// export DB_NAME=your_database_name
// export VUS=1 ITERATIONS=1 MAX_DURATION=30000 EXECUTOR='per-vu-iterations' ENV=perf
// Configuration constants
var host = 'localhost';
var port = 5432;
var user = __ENV.DB_USER || 'postgres';
var sqlDBClient_password = __ENV.DB_PASSWORD || 'a6QpEQfYLebs';
var dbName = __ENV.DB_NAME || 'synapse';

// Reusable SQL database client
var sqlDBClient = new SqlDBClient(dbName, user, sqlDBClient_password, host, port);

// Function to get a random user from the database
function getUserRandom() {
  try {
    // Fetch a random user from the database
    var userInfo = sqlDBClient.getRandomUser();
    // Log the random user information
    console.log('Random user:', userInfo);
  } catch (error) {
    console.error('Error fetching random user:', error);
  }
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
;// CONCATENATED MODULE: ./src/tests/sqlDBClient/getRandomUser.ts



// Initialize the executor
var k6exec = new k6Executor();
var funcExecution = ['getUserRandom'];
var executor = __ENV.EXECUTOR || 'per-vu-iterations';
var scenarios = k6exec.generateScenarios(funcExecution, executor);
var threshold = Object.assign({}, k6exec.generateCustomThreshold('http_req_duration{ scenario: getUserRandom }', 'avg<=23904'), k6exec.generateCustomThreshold('http_req_failed{ scenario: getUserRandom }', 'rate<=0.03'));
var options = {
  scenarios: scenarios,
  thresholds: threshold
};
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=getRandomUser.js.map