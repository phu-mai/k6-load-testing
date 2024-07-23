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
  findAllDocuments: () => (/* reexport */ findAllDocuments),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6/x/mongo"
const mongo_namespaceObject = require("k6/x/mongo");
var mongo_default = /*#__PURE__*/__webpack_require__.n(mongo_namespaceObject);
;// CONCATENATED MODULE: ./src/libs/mongoDBClient.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//@ts-ignore


// MongoDB client class
var MongoClient = /*#__PURE__*/function () {
  // Constructor to initialize MongoDB connection settings
  function MongoClient(mongoDBHost) {
    var mongoDBPort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 27017;
    var mongoDBName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'leapXpert';
    _classCallCheck(this, MongoClient);
    _defineProperty(this, "mongoDBHost", void 0);
    _defineProperty(this, "mongoDBPort", void 0);
    _defineProperty(this, "mongoDBName", void 0);
    _defineProperty(this, "client", void 0);
    this.mongoDBHost = mongoDBHost;
    this.mongoDBPort = mongoDBPort;
    this.mongoDBName = mongoDBName;
    this.client = null; // MongoDB client instance
  }

  // Private method to establish MongoDB connection
  return _createClass(MongoClient, [{
    key: "connect",
    value: function connect() {
      if (!this.client) {
        // Construct MongoDB connection string
        var connectionString = "mongodb://".concat(this.mongoDBHost, ":").concat(this.mongoDBPort, "/").concat(this.mongoDBName);
        // Create a new MongoDB client instance
        this.client = mongo_default().newClient(connectionString);
      }
      // Return MongoDB client instance
      return this.client;
    }

    // Private method to disconnect from MongoDB
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.client) {
        this.client.close(); // Close MongoDB client connection
        // this.client = null;
      }
    }

    // Find all documents in a collection
  }, {
    key: "findAll",
    value: function findAll(dbName, collectionName) {
      try {
        var client = this.connect();
        var results = client.findAll(dbName, collectionName); // Fetch all documents
        return results; // Return query results
      } catch (error) {
        console.error("Error finding documents:", error); // Log error if query fails
        throw error; // Propagate error
      }
      // finally {
      //   this.disconnect();
      // }
    }

    // Find a single document in a collection
  }, {
    key: "findOne",
    value: function findOne(dbName, collectionName, filter) {
      try {
        var client = this.connect();
        var result = client.findOne(dbName, collectionName, filter); // Find one document
        return result; // Return query result
      } catch (error) {
        console.error("Error finding document:", error); // Log error if query fails
        throw error; // Propagate error
      }
    }

    // Delete a single document from a collection
  }, {
    key: "deleteOne",
    value: function deleteOne(dbName, collectionName, filter) {
      try {
        var client = this.connect();
        var result = client.deleteOne(dbName, collectionName, filter); // Delete one document
        return result; // Return deletion result
      } catch (error) {
        console.error("Error deleting document:", error); // Log error if deletion fails
        throw error; // Propagate error
      }
    }

    // Delete multiple documents from a collection
  }, {
    key: "deleteMany",
    value: function deleteMany(dbName, collectionName, filter) {
      try {
        var client = this.connect();
        var result = client.deleteMany(dbName, collectionName, filter); // Delete multiple documents
        return result; // Return deletion result
      } catch (error) {
        console.error("Error deleting documents:", error); // Log error if deletion fails
        throw error; // Propagate error
      }
    }

    // Count documents in a collection
  }, {
    key: "countDocuments",
    value: function countDocuments(dbName, collectionName, filter) {
      try {
        var client = this.connect();
        var count = client.countDocuments(dbName, collectionName, filter); // Count documents
        return count; // Return count result
      } catch (error) {
        console.error("Error counting documents:", error); // Log error if counting fails
        throw error; // Propagate error
      }
    }

    // Find distinct values in a collection
  }, {
    key: "distinct",
    value: function distinct(dbName, collectionName, key, filter) {
      try {
        var client = this.connect();
        var results = client.distinct(dbName, collectionName, key, filter); // Find distinct values
        return results; // Return distinct values
      } catch (error) {
        console.error("Error distincting documents:", error); // Log error if distinct operation fails
        throw error; // Propagate error
      }
    }

    // Drop a collection from the database
  }, {
    key: "dropCollection",
    value: function dropCollection(dbName, collectionName) {
      try {
        var client = this.connect();
        var error = client.dropCollection(dbName, collectionName); // Drop collection
        return error; // Return error (if any)
      } catch (error) {
        console.error("Error dropping collection:", error); // Log error if dropping collection fails
        throw error; // Propagate error
      }
    }

    // Find a document and update it in a collection
  }, {
    key: "findOneAndUpdate",
    value: function findOneAndUpdate(dbName, collectionName, filter, update) {
      try {
        var client = this.connect();
        var result = client.findOneAndUpdate(dbName, collectionName, filter, update); // Find and update document
        return result; // Return update result
      } catch (error) {
        console.error("Error updating document:", error); // Log error if update fails
        throw error; // Propagate error
      }
    }

    // Insert a single document into a collection
  }, {
    key: "insertOne",
    value: function insertOne(dbName, collectionName, doc) {
      try {
        var client = this.connect();
        var error = client.insertOne(dbName, collectionName, doc); // Insert one document
        return error; // Return error (if any)
      } catch (error) {
        console.error("Error inserting document:", error); // Log error if insertion fails
        throw error; // Propagate error
      }
    }

    // Insert multiple documents into a collection
  }, {
    key: "insertMany",
    value: function insertMany(dbName, collectionName, docs) {
      try {
        var client = this.connect();
        var error = client.insertMany(dbName, collectionName, docs); // Insert multiple documents
        return error; // Return error (if any)
      } catch (error) {
        console.error("Error inserting documents:", error); // Log error if insertion fails
        throw error; // Propagate error
      }
    }

    // Update a single document in a collection
  }, {
    key: "updateOne",
    value: function updateOne(dbName, collectionName, filter, update) {
      try {
        var client = this.connect();
        var error = client.updateOne(dbName, collectionName, filter, update); // Update one document
        return error; // Return error (if any)
      } catch (error) {
        console.error("Error updating document:", error); // Log error if update fails
        throw error; // Propagate error
      }
    }

    // Update multiple documents in a collection
  }, {
    key: "updateMany",
    value: function updateMany(dbName, collectionName, filter, update) {
      try {
        var client = this.connect();
        var error = client.updateMany(dbName, collectionName, filter, update); // Update multiple documents
        return error; // Return error (if any)
      } catch (error) {
        console.error("Error updating documents:", error); // Log error if update fails
        throw error; // Propagate error
      }
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/scenarios/mongoDBScenarios.ts
//@ts-ignore


// Environment variable configuration
// Export these variables in your environment or in a .env file before running the script
// export MONGODB_USER=your_mongodb_username
// export MONGODB_PASSWORD=your_mongodb_password
// export MONDODB_HOST=your_mongodb_host
// export VUS=1 ITERATIONS=1 MAX_DURATION=30000 EXECUTOR='per-vu-iterations' ENV=performance
// Configuration constants
var mongoDBPort = parseInt(__ENV.MONGODB_PORT) || 27017;
var mongoDBUser = __ENV.MONGODB_USER || 'lxp';
var mongoDBPassword = __ENV.MONGODB_PASSWORD || 'skLmSaMzoc3H';
var mongoDBHost = "".concat(mongoDBUser, ":").concat(mongoDBPassword, "@localhost");
var dbName = 'leapXpert';

// Reusable MongoDB client
var client = new MongoClient(mongoDBHost, mongoDBPort);

// Function to find all documents in a collection
function findAllDocuments() {
  var collectionName = 'DBCompany';
  try {
    var results = client.findAll(dbName, collectionName);
    console.log('Documents found:', results);
  } catch (error) {
    console.error('Error finding documents:', error);
  }
}

// Function to find a specific document in a collection
function findDocument() {
  var collectionName = 'DBUser';
  var filter = {
    name: 'moana'
  };
  try {
    var result = client.findOne(dbName, collectionName, filter);
    console.log('Document found:', result);
  } catch (error) {
    console.error('Error finding document:', error);
  }
}

// Function to count documents in a collection
function countDocument() {
  var collectionName = 'DBUser';
  var filter = {};
  try {
    var result = client.countDocuments(dbName, collectionName, filter);
    console.log('Document count:', result);
  } catch (error) {
    console.error('Error counting document:', error);
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
;// CONCATENATED MODULE: ./src/tests/mongoDB/findAllDocument.ts


var k6exec = new k6Executor();

// Define the functions to be executed and the execution strategy

var funcExecution = ['findAllDocuments'];
var executor = __ENV.EXECUTOR || 'per-vu-iterations';

// Generate scenarios using the executor
var scenarios = k6exec.generateScenarios(funcExecution, executor);
var threshold = Object.assign({}, k6exec.generateCustomThreshold('http_req_duration{ scenario: findAllDocuments }', 'avg<=23904'), k6exec.generateCustomThreshold('http_req_failed{ scenario: findAllDocuments }', 'rate<=0.03'));
var options = {
  scenarios: scenarios,
  thresholds: threshold
};
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=findAllDocument.js.map