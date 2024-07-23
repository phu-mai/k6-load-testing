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
  options: () => (/* binding */ options),
  userCreateGroupWithUsers: () => (/* reexport */ userCreateGroupWithUsers)
});

;// CONCATENATED MODULE: external "k6/x/sql"
const sql_namespaceObject = require("k6/x/sql");
var sql_default = /*#__PURE__*/__webpack_require__.n(sql_namespaceObject);
;// CONCATENATED MODULE: ./src/providers/DataProvider.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//@ts-ignore

var DataProvider = /*#__PURE__*/function () {
  function DataProvider() {
    var filePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'config';
    _classCallCheck(this, DataProvider);
    _defineProperty(this, "environmentConfig", void 0);
    _defineProperty(this, "dbConnection", void 0);
    var workDir = "".concat(__ENV.PWD);
    var envConfigFilePath = "".concat(workDir, "/").concat(filePath, "/env/").concat(__ENV.ENV, ".json");
    var sqlFilePath = "".concat(workDir, "/").concat(filePath, "/data/").concat(__ENV.ENV, ".sqlite");
    this.environmentConfig = this.loadConfig(envConfigFilePath);
    this.dbConnection = this.openDbConnection('sqlite3', sqlFilePath);
  }
  return _createClass(DataProvider, [{
    key: "loadConfig",
    value: function loadConfig(filePath) {
      try {
        return JSON.parse(open(filePath));
      } catch (error) {
        console.error('Error reading environment config:', error);
        throw error;
      }
    }
  }, {
    key: "checkFileExists",
    value: function checkFileExists(filePath) {
      try {
        var file = open(filePath);
        return true;
      } catch (error) {
        console.error("Data file not found in path ".concat(filePath), error);
        return false;
      }
    }
  }, {
    key: "openDbConnection",
    value: function openDbConnection(dbType, filePath) {
      try {
        this.checkFileExists(filePath);
        return sql_default().open(dbType, filePath);
      } catch (error) {
        console.error('Error opening database connection:', error);
        throw error;
      }
    }
  }, {
    key: "closeDbConnection",
    value: function closeDbConnection() {
      try {
        this.dbConnection.close();
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }, {
    key: "getEnv",
    value: function getEnv() {
      return this.environmentConfig.environmentName;
    }
  }, {
    key: "getUserGroup",
    value: function getUserGroup() {
      return this.environmentConfig.userGroup;
    }
  }, {
    key: "getDefaultUserPassword",
    value: function getDefaultUserPassword() {
      return this.environmentConfig.defaultUserPassword;
    }
  }, {
    key: "getWhatsappWebhookToken",
    value: function getWhatsappWebhookToken() {
      return this.environmentConfig.whatsappWebhookToken;
    }
  }, {
    key: "getCompany",
    value: function getCompany() {
      return this.environmentConfig.company;
    }
  }, {
    key: "getOrganizationUser",
    value: function getOrganizationUser() {
      return this.environmentConfig.organizationUser;
    }
  }, {
    key: "getEndpoints",
    value: function getEndpoints() {
      return this.environmentConfig.endpoints;
    }
  }, {
    key: "getDlpMessages",
    value: function getDlpMessages() {
      return this.environmentConfig.dlpMessages;
    }
  }, {
    key: "closeConnection",
    value: function closeConnection() {
      try {
        this.dbConnection.close();
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }, {
    key: "getUserById",
    value: function getUserById(userId) {
      try {
        var query = "SELECT * FROM users WHERE user_id=\"".concat(userId, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getUserByUserName",
    value: function getUserByUserName(userName) {
      try {
        var query = "SELECT * FROM users WHERE user_name=\"".concat(userName, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getClientById",
    value: function getClientById(clientId) {
      try {
        var query = "SELECT * FROM clients WHERE client_id=\"".concat(clientId, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getUserByUserId",
    value: function getUserByUserId(userId) {
      try {
        var query = "SELECT * FROM users WHERE user_id=\"".concat(userId, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getRandomUserInRange",
    value: function getRandomUserInRange() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      try {
        var query = "SELECT * FROM ( SELECT * FROM users ORDER BY user_id LIMIT ".concat(target, " OFFSET ").concat(offset, " ) AS subquery ORDER BY RANDOM() LIMIT 1;");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getUserUserNameInRange",
    value: function getUserUserNameInRange() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      try {
        var query = "SELECT user_name FROM users LIMIT ".concat(target, " OFFSET ").concat(offset, ";");
        var result = sql_default().query(this.dbConnection, query);
        return result.map(function (row) {
          return row.user_name;
        });
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getClientByClientId",
    value: function getClientByClientId(clientId) {
      try {
        var query = "SELECT * FROM clients WHERE client_id=\"".concat(clientId, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getclientByUserName",
    value: function getclientByUserName(userName) {
      try {
        var query = "SELECT * FROM clients WHERE user_name=\"".concat(userName, "\";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getRandomUser",
    value: function getRandomUser() {
      try {
        var query = "SELECT * FROM users ORDER BY random() LIMIT 1;";
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getRandomiMessageUser",
    value: function getRandomiMessageUser() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      try {
        var query = "SELECT * FROM users WHERE user_name LIKE 'imessage_user_disney%' ORDER BY RANDOM() LIMIT ".concat(target, " OFFSET ").concat(offset, ";");
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getRandomClient",
    value: function getRandomClient() {
      try {
        var query = "SELECT * FROM clients ORDER BY random() LIMIT 1;";
        var result = sql_default().query(this.dbConnection, query);
        return result[0];
      } catch (error) {
        console.error('Error executing query:', error);
        return null;
      }
    }
  }, {
    key: "getDistinctRandomUsers",
    value: function getDistinctRandomUsers() {
      var _this = this;
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      try {
        var distinctUsers = [];
        var _loop = function _loop() {
          var randomUser = _this.getRandomUser();
          if (!distinctUsers.some(function (user) {
            return user.user_id === randomUser.user_id;
          })) {
            distinctUsers.push(randomUser);
          }
        };
        while (distinctUsers.length < target) {
          _loop();
        }
        return distinctUsers;
      } catch (error) {
        console.error('Error fetching distinct random users:', error);
        return null;
      }
    }
  }, {
    key: "getDistinctRandomiMessageUsers",
    value: function getDistinctRandomiMessageUsers() {
      var _this2 = this;
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      try {
        var distinctUsers = [];
        var _loop2 = function _loop2() {
          var randomUser = _this2.getRandomiMessageUser();
          if (!distinctUsers.some(function (user) {
            return user.user_id === randomUser.user_id;
          })) {
            distinctUsers.push(randomUser);
          }
        };
        while (distinctUsers.length < target) {
          _loop2();
        }
        return distinctUsers;
      } catch (error) {
        console.error('Error fetching distinct random iMessage users:', error);
        return null;
      }
    }
  }, {
    key: "getDistinctRandomClients",
    value: function getDistinctRandomClients() {
      var _this3 = this;
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      try {
        var distinctClients = [];
        var _loop3 = function _loop3() {
          var randomClient = _this3.getRandomClient();
          if (!distinctClients.some(function (client) {
            return client.client_id === randomClient.client_id;
          })) {
            distinctClients.push(randomClient);
          }
        };
        while (distinctClients.length < target) {
          _loop3();
        }
        return distinctClients;
      } catch (error) {
        console.error('Error fetching distinct random clients:', error);
        return null;
      }
    }
  }, {
    key: "updateBondAccessToken",
    value: function updateBondAccessToken(userName, bondAccessToken) {
      try {
        var query = "UPDATE users SET json_info = json_set(json_info, '$.bond_access_token', \"".concat(bondAccessToken, "\") WHERE user_name = \"").concat(userName, "\";");
        sql_default().query(this.dbConnection, query);
      } catch (error) {
        console.error('Error executing query:', error);
      }
    }
  }]);
}();
;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: external "https://jslib.k6.io/k6-utils/1.2.0/index.js"
const index_js_namespaceObject = require("https://jslib.k6.io/k6-utils/1.2.0/index.js");
;// CONCATENATED MODULE: external "k6/crypto"
const crypto_namespaceObject = require("k6/crypto");
;// CONCATENATED MODULE: ./src/libs/users.ts
function users_typeof(o) { "@babel/helpers - typeof"; return users_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, users_typeof(o); }
function users_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function users_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, users_toPropertyKey(descriptor.key), descriptor); } }
function users_createClass(Constructor, protoProps, staticProps) { if (protoProps) users_defineProperties(Constructor.prototype, protoProps); if (staticProps) users_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function users_defineProperty(obj, key, value) { key = users_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function users_toPropertyKey(t) { var i = users_toPrimitive(t, "string"); return "symbol" == users_typeof(i) ? i : i + ""; }
function users_toPrimitive(t, r) { if ("object" != users_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != users_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


//@ts-ignore

//@ts-ignore


var Users = /*#__PURE__*/function () {
  function Users() {
    users_classCallCheck(this, Users);
    users_defineProperty(this, "config", void 0);
    users_defineProperty(this, "name", void 0);
    users_defineProperty(this, "organizationUser", void 0);
    users_defineProperty(this, "apiEndpoint", void 0);
    users_defineProperty(this, "messageEndpoint", void 0);
    users_defineProperty(this, "apiVersion", void 0);
    var workDir = "".concat(__ENV.PWD);
    var envConfigFilePath = "".concat(workDir, "/config/env/").concat(__ENV.ENV, ".json");
    this.config = this.loadConfig(envConfigFilePath);
    this.name = this.config.environmentName;
    this.organizationUser = this.config.organizationUser;
    this.apiEndpoint = this.config.endpoints.api;
    this.messageEndpoint = this.config.endpoints.message;
    this.apiVersion = this.config.apiVersion;
  }
  return users_createClass(Users, [{
    key: "loadConfig",
    value: function loadConfig(filePath) {
      try {
        return JSON.parse(open(filePath));
      } catch (error) {
        console.error('Error reading environment config:', error);
        throw error;
      }
    }
  }, {
    key: "getInfo",
    value: function getInfo(userId, bondAccessToken) {
      var params = {
        headers: {
          Authorization: "Bearer ".concat(bondAccessToken),
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        tags: {
          name: 'getUserInfo'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/user_management/users/").concat(userId);
      var res = http_default().get(url, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'get user info success': function getUserInfoSuccess(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message ").concat(res.status_text));
      } else {
        var body = JSON.parse(res.body);
        return body;
      }
    }
  }, {
    key: "getUserStatus",
    value: function getUserStatus(matrixAccessToken) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "s22596068_859439_0_2324718_1_107535_1_1338739_0_1";
      console.log("getUserStatus: ".concat(matrixAccessToken));
      var params = {
        headers: {
          Authorization: "Bearer ".concat(matrixAccessToken),
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        tags: {
          name: 'getUserStatus'
        }
      };
      var url = "https://".concat(this.messageEndpoint, "/_matrix/client/r0/sync?filter=").concat(filter, "&timeout=").concat(timeout, "&since=").concat(since);
      var res = http_default().get(url, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'get user status success': function getUserStatusSuccess(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message ").concat(res.status_text));
      } else {
        var body = JSON.parse(res.body);
        return body;
      }
    }
  }, {
    key: "createGroupwithUsers",
    value: function createGroupwithUsers(primaryUserBondAccessToken, memberUserId) {
      var payload = JSON.stringify({
        clients: [],
        clientProfiles: [],
        otherUsers: [{
          id: memberUserId,
          channel: ''
        }],
        type: 'ONE_TO_ONE',
        includeMe: true
      });
      var params = {
        headers: {
          Authorization: "Bearer ".concat(primaryUserBondAccessToken),
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/integration/rooms");
      var res = http_default().post(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'create group with users success': function createGroupWithUsersSuccess(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message ").concat(res.status_text));
      } else {
        var body = JSON.parse(res.body);
        return body;
      }
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(primaryUserMatrixToken, roomID, message) {
      var expectDLPRejected = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var ramdomMessageId = (0,index_js_namespaceObject.randomIntBetween)(11111111111111, 9999999999999);
      var payload = JSON.stringify({
        'org.matrix.msc1767.text': message,
        body: message,
        msgtype: 'm.text'
      });
      var params = {
        headers: {
          Authorization: "Bearer ".concat(primaryUserMatrixToken),
          'Content-Type': 'application/json'
        },
        tags: {
          name: 'userTextMessageToGroup'
        }
      };
      var url = "https://".concat(this.messageEndpoint, "/_matrix/client/r0/rooms/").concat(roomID, "/send/m.room.message/m").concat(ramdomMessageId, ".0");
      var res = http_default().put(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'send message to group status is 200': function sendMessageToGroupStatusIs200(r) {
          return r.status === (expectDLPRejected ? 403 : 200);
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message ").concat(res.status_text));
      } else {
        if (!res.body) (0,external_k6_namespaceObject.fail)('No body in response');
        try {
          var body = JSON.parse(res.body);
          var eventId = body['event_id'];
          (0,external_k6_namespaceObject.check)(res, {
            'send message to group success': function sendMessageToGroupSuccess() {
              return eventId !== null;
            }
          });
          return body;
        } catch (e) {
          (0,external_k6_namespaceObject.fail)('Error parsing response body');
        }
      }
    }
  }, {
    key: "sendAttachment",
    value: function sendAttachment(primaryUserMatrixToken, roomId, fileName, fileBinaryContent, fileContentType) {
      var msgType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "m.file";
      var expectDLPRejected = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var ramdomMessageId = (0,index_js_namespaceObject.randomIntBetween)(11111111111111, 9999999999999);
      var payload = JSON.stringify({
        msgtype: "".concat(msgType),
        body: "".concat(fileName),
        filename: "".concat(fileName),
        channel: '',
        url: "".concat(fileBinaryContent),
        info: {
          mimetype: fileContentType
        }
      });
      var params = {
        headers: {
          Authorization: "Bearer ".concat(primaryUserMatrixToken),
          'Content-Type': 'application/json'
        },
        tags: {
          name: 'userSendAttachmentFileToGroup'
        }
      };
      var url = "https://".concat(this.messageEndpoint, "/_matrix/client/r0/rooms/").concat(roomId, "/send/m.room.message/m").concat(ramdomMessageId, ".0");
      var res = http_default().put(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'send attachment to whatsapp status is 200': function sendAttachmentToWhatsappStatusIs200() {
          return res.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message ").concat(res.status_text));
      } else {
        var body = JSON.parse(res.body);
        var eventId = body['event_id'];
        (0,external_k6_namespaceObject.check)(res, {
          'send attachment to whatsapp success': function sendAttachmentToWhatsappSuccess() {
            return eventId !== null;
          }
        });
        return body;
      }
    }
  }, {
    key: "login1",
    value: function login1(companyName, username, deviceId) {
      var payload = JSON.stringify({});
      var params = {
        headers: {
          authorization: "DigestLeapXpert username=\"".concat(username, "\",company=\"").concat(companyName, "\",realm=\"LeapXpert\",deviceUniqueIdentifier=\"").concat(deviceId, "\""),
          'content-type': 'application/json'
        },
        tags: {
          name: 'userLogin1'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/authentication/login");
      var res = http_default().post(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'User: Login 1 successful (Status 200)': function UserLogin1SuccessfulStatus200(r) {
          return r.status === 401;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message: userLogin1 ").concat(res.status_text));
      } else {
        var headersUserLogin1 = res.headers;
        var wwwAuthenticateHeader = headersUserLogin1['Www-Authenticate'];
        (0,external_k6_namespaceObject.check)(res, {
          'User: Login 1 successful': function UserLogin1Successful(r) {
            return wwwAuthenticateHeader.includes('DigestLeapXpert');
          }
        });
        return res.headers;
      }
    }
  }, {
    key: "login2",
    value: function login2(companyName, userName, deviceId, nonce, qop, nc, cnonce, uri, response) {
      var payload = JSON.stringify({});
      var params = {
        headers: {
          authorization: "DigestLeapXpert username=\"".concat(userName, "\",company=\"").concat(companyName, "\",realm=\"").concat(companyName, "\",nonce=\"").concat(nonce, "\",qop=\"").concat(qop, "\",deviceUniqueIdentifier=\"").concat(deviceId, "\",nc=\"").concat(nc, "\",cnonce=\"").concat(cnonce, "\",uri=\"").concat(uri, "\",algorithm=\"md5\",response=\"").concat(response, "\""),
          'content-type': 'application/json'
        },
        tags: {
          name: 'userLogin2'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/authentication/login");
      var res = http_default().post(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'User: Login 2 successful (Status 200)': function UserLogin2SuccessfulStatus200(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message: userLogin2 ").concat(res.status_text));
      } else {
        var bodyUserLogin2 = JSON.parse(res.body);
        var resMessage = bodyUserLogin2['message'];
        (0,external_k6_namespaceObject.check)(res, {
          'User: Login 2 successful': function UserLogin2Successful(r) {
            return resMessage === 'Success';
          }
        });
        return bodyUserLogin2;
      }
    }
  }, {
    key: "generateResponse",
    value: function generateResponse(userName, password, realm, nonce, cnonce, qop) {
      var ha1 = "".concat(userName, ":").concat(realm, ":").concat(password);
      var ha1Hash = (0,crypto_namespaceObject.md5)(ha1, 'hex');
      var method = 'POST';
      var uri = '/v1/authentication/login';
      var body = (0,crypto_namespaceObject.md5)('{}', 'hex');
      var ha2 = "".concat(method, ":").concat(uri, ":").concat(body);
      var ha2Hash = (0,crypto_namespaceObject.md5)(ha2, 'hex');
      var nextncstring = '00000002';
      var response = "".concat(ha1Hash, ":").concat(nonce, ":").concat(nextncstring, ":").concat(cnonce, ":").concat(qop, ":").concat(ha2Hash);
      var responseHash = (0,crypto_namespaceObject.md5)(response, 'hex');
      return responseHash;
    }
  }, {
    key: "mfaVerify",
    value: function mfaVerify(ticket, passcode, userId, companyId, role) {
      var payload = JSON.stringify({
        ticket: ticket,
        passcode: passcode,
        userId: userId,
        companyId: companyId,
        role: role
      });
      var params = {
        headers: {
          'content-type': 'application/json'
        },
        tags: {
          name: 'mfaVerify'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/authentication/login/mfa/verify");
      var res = http_default().post(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'User: MFA verification successful (Status 200)': function UserMFAVerificationSuccessfulStatus200(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message: mfaVerify ").concat(res.status_text));
      } else {
        var bodyMfaVerify = JSON.parse(res.body);
        var resMessage = bodyMfaVerify['message'];
        (0,external_k6_namespaceObject.check)(res, {
          'User: MFA verification successful': function UserMFAVerificationSuccessful(r) {
            return resMessage === 'Success';
          }
        });
        return bodyMfaVerify;
      }
    }
  }, {
    key: "getDevices",
    value: function getDevices(accessToken, deviceId, userId) {
      var payload = JSON.stringify({
        device: {
          uniqueIdentifier: deviceId,
          hardwareIdentifier: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          osIdentifier: 'MacIntel',
          resolution: '1920x1080',
          formFactor: 'DESKTOP',
          platform: 'WEB',
          publicEncryptionKey: '-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhWcZ9+VlBNmKVSwRjfmY\nuZ3XCs4p+jRzs3bhmdSKIQnliP1ShcJ5iY3URdERz3hyT0OVfbLzO57+83yOcDoa\njIMHWM/0PAcosYZjo2E++KeGQZFSYWG3Q5Z9bzqTgxfubTPfiNHJwZJeb4UhKM6G\nSWzbvOgLwjZ/TGEAgy3lVf6ckYTPfNyw/Hxlrrx01Wj3Q5KlQZm7aa29RCuhTAH+\nDAH7+ll18Oa80osaHu+nWC6V7qY0TSnJi8WolI66slHL6A8fEvrj/ih17tkxfk7j\nU3uHq4iyAtbH4mISd9LGQIQWwGPvcNwbIEPJCNBxRgIelA8w6ppIEmz76bmidhag\n0wIDAQAB\n-----\n',
          applications: [{
            application: {
              id: 'lxp-web',
              bundleIdentifier: 'com.leapxpert.manager',
              platform: 'WEB'
            },
            applicationVersion: '1.12.0',
            pushTokens: []
          }],
          ownerId: userId
        }
      });
      var params = {
        headers: {
          'content-type': 'application/json',
          authorization: "Bearer ".concat(accessToken)
        },
        tags: {
          name: 'getDevices'
        }
      };
      var url = "https://".concat(this.apiEndpoint, "/").concat(this.apiVersion, "/device_management/devices");
      var res = http_default().post(url, payload, params);
      var status = (0,external_k6_namespaceObject.check)(res, {
        'User: Devices retrieval successful (Status 200)': function UserDevicesRetrievalSuccessfulStatus200(r) {
          return r.status === 200;
        }
      });
      if (!status) {
        (0,external_k6_namespaceObject.fail)("Unexpected status for ".concat(url, ", received ").concat(res.status, ", message: getDevices ").concat(res.status_text));
      } else {
        var bodyGetDevices = JSON.parse(res.body);
        var resMessage = bodyGetDevices['message'];
        (0,external_k6_namespaceObject.check)(res, {
          'User: Devices retrieval successful': function UserDevicesRetrievalSuccessful(r) {
            return resMessage === 'Success';
          }
        });
        return bodyGetDevices;
      }
    }
  }]);
}();
;// CONCATENATED MODULE: ./src/scenarios/usersScenarios.ts
function usersScenarios_typeof(o) { "@babel/helpers - typeof"; return usersScenarios_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, usersScenarios_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == usersScenarios_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(usersScenarios_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var dataProvider = new DataProvider();
var user = new Users();
function getUserStatus() {
  return _getUserStatus.apply(this, arguments);
}
function _getUserStatus() {
  _getUserStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var randomUser, userInfo, userBondAccessToken, userStatus;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return dataProvider.getRandomUser();
        case 3:
          randomUser = _context.sent;
          // Parse the JSON information of the random user
          userInfo = JSON.parse(randomUser.json_info); // Extract the user bond access token from the parsed JSON data
          userBondAccessToken = userInfo.bond_access_token; // Retrieve the user status
          _context.next = 8;
          return user.getUserStatus(userBondAccessToken);
        case 8:
          userStatus = _context.sent;
          console.log('User status:', userStatus);
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error getting user status:', _context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getUserStatus.apply(this, arguments);
}
function getUserInfo() {
  return _getUserInfo.apply(this, arguments);
}
function _getUserInfo() {
  _getUserInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var randomUser, userInfo, userId, userBondAccessToken, userInfoResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return dataProvider.getRandomUser();
        case 3:
          randomUser = _context2.sent;
          // Parse the JSON information of the random user
          userInfo = JSON.parse(randomUser.json_info); // Extract the user ID and bond access token from the parsed JSON data
          userId = userInfo.user_id;
          userBondAccessToken = userInfo.bond_access_token; // Retrieve additional information about the user using the extracted user ID and bond access token
          _context2.next = 9;
          return user.getInfo(userId, userBondAccessToken);
        case 9:
          userInfoResult = _context2.sent;
          console.log('User info:', userInfoResult);
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error('Error getting user info:', _context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _getUserInfo.apply(this, arguments);
}
function createGroupWithUser(_x) {
  return _createGroupWithUser.apply(this, arguments);
}
function _createGroupWithUser() {
  _createGroupWithUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(memberUserIds) {
    var randomUser, userInfo, bondAccessToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          randomUser = dataProvider.getRandomUser();
          userInfo = JSON.parse(randomUser.json_info);
          bondAccessToken = userInfo.bond_access_token;
          user.createGroupwithUsers(bondAccessToken, memberUserIds);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _createGroupWithUser.apply(this, arguments);
}
function userCreateGroupWithUsers() {
  return _userCreateGroupWithUsers.apply(this, arguments);
}
function _userCreateGroupWithUsers() {
  _userCreateGroupWithUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var memberUserIds;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          memberUserIds = dataProvider.getRandomUser().user_id;
          createGroupWithUser(memberUserIds);
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _userCreateGroupWithUsers.apply(this, arguments);
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
;// CONCATENATED MODULE: ./src/tests/user/userCreateGroupwithUsers.ts



// Initialize the executor
var k6exec = new k6Executor();

// Define the functions to be executed and the execution strategy
var funcExecution = ['userCreateGroupWithUsers'];
var executor = __ENV.EXECUTOR || 'per-vu-iterations';

// Generate scenarios using the executor
var scenarios = k6exec.generateScenarios(funcExecution, executor);
var threshold = Object.assign({}, k6exec.generateCustomThreshold('http_req_duration{ scenario: userCreateGroupWithUsers }', 'avg<=23904'), k6exec.generateCustomThreshold('http_req_failed{ scenario: userCreateGroupWithUsers }', 'rate<=0.03'));
var options = {
  scenarios: scenarios,
  thresholds: threshold
};
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=userCreateGroupwithUsers.js.map