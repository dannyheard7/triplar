"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlacesAPI = exports.oneDayInSeconds = exports.defaultCategories = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _redis = _interopRequireDefault(require("redis"));

var bluebird = _interopRequireWildcard(require("bluebird"));

var _hashCode = _interopRequireDefault(require("../utils/hashCode"));

var _redis2 = require("../config/redis");

var _removeByVal = _interopRequireDefault(require("../utils/removeByVal"));

bluebird.promisifyAll(_redis.default);

var client = _redis.default.createClient(_redis2.REDIS_PORT, _redis2.REDIS_HOST);

var defaultCategories = "active,arts,specialtyschools,tastingclasses,tours,localflavor,nightlife,landmarks,shopping";
exports.defaultCategories = defaultCategories;
var oneDayInSeconds = 60 * 60 * 24;
exports.oneDayInSeconds = oneDayInSeconds;
var businessInfo = "    id    name    url    location {        address: formatted_address    }    coordinates {        latitude        longitude    }    rating    displayPhone: display_phone    photos";

var PlacesAPI =
/*#__PURE__*/
function () {
  function PlacesAPI() {
    (0, _classCallCheck2.default)(this, PlacesAPI);
  }

  (0, _createClass2.default)(PlacesAPI, null, [{
    key: "makeRequest",
    value: function () {
      var _makeRequest = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(data) {
        var config, response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  headers: {
                    'Authorization': 'Bearer ' + process.env.YELP_ACCESS_TOKEN,
                    'Content-Type': "application/graphql",
                    'Accept-Language': 'en_GB'
                  }
                };
                _context.prev = 1;
                _context.next = 4;
                return _axios.default.post("https://api.yelp.com/v3/graphql", data, config);

              case 4:
                response = _context.sent;

                if (!(response.data && response.data.data)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", response.data.data);

              case 9:
                console.log(response);
                throw new Error("Problem with the yelp service");

              case 11:
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0.message);
                return _context.abrupt("return", []);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13]]);
      }));

      function makeRequest(_x) {
        return _makeRequest.apply(this, arguments);
      }

      return makeRequest;
    }()
  }, {
    key: "convertInputToHashCode",
    value: function convertInputToHashCode(input) {
      return String((0, _hashCode.default)(Object.keys(input).reduce(function (result, key) {
        return result + String(input[key]);
      }, "")));
    }
  }, {
    key: "checkCacheForSearch",
    value: function () {
      var _checkCacheForSearch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(input) {
        var hashCode, ids;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hashCode = this.convertInputToHashCode(input);
                _context2.next = 3;
                return client.existsAsync(hashCode);

              case 3:
                if (!_context2.sent) {
                  _context2.next = 19;
                  break;
                }

                _context2.t0 = JSON;
                _context2.next = 7;
                return client.getAsync(hashCode);

              case 7:
                _context2.t1 = _context2.sent;
                ids = _context2.t0.parse.call(_context2.t0, _context2.t1);

                if (!(ids.length > 0)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 12;
                return client.mgetAsync.apply(client, (0, _toConsumableArray2.default)(ids));

              case 12:
                _context2.t2 = function (x) {
                  return JSON.parse(x);
                };

                return _context2.abrupt("return", _context2.sent.map(_context2.t2));

              case 16:
                return _context2.abrupt("return", []);

              case 17:
                _context2.next = 20;
                break;

              case 19:
                return _context2.abrupt("return", null);

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkCacheForSearch(_x2) {
        return _checkCacheForSearch.apply(this, arguments);
      }

      return checkCacheForSearch;
    }()
  }, {
    key: "cacheSearch",
    value: function () {
      var _cacheSearch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(input, businesses) {
        var businessIds;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                businessIds = businesses.map(function (x) {
                  return x.id;
                });
                _context3.next = 3;
                return client.setAsync(this.convertInputToHashCode(input), JSON.stringify(businessIds), 'EX', oneDayInSeconds);

              case 3:
                _context3.next = 5;
                return client.multi(businesses.map(function (x) {
                  return ["set", x.id, JSON.stringify(x), 'EX', oneDayInSeconds];
                })).execAsync();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function cacheSearch(_x3, _x4) {
        return _cacheSearch.apply(this, arguments);
      }

      return cacheSearch;
    }()
  }, {
    key: "getPopularPlaces",
    value: function () {
      var _getPopularPlaces = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(latitude, longitude, categories, limit) {
        var cache, popularPlacesQuery, data, businesses;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.checkCacheForSearch({
                  type: 'popularPlaces',
                  latitude: latitude,
                  longitude: longitude,
                  categories: categories,
                  limit: limit
                });

              case 2:
                cache = _context4.sent;

                if (!cache) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", cache);

              case 5:
                popularPlacesQuery = "{            search(latitude: ".concat(latitude, ", longitude: ").concat(longitude, ", categories: \"").concat(categories, "\", limit: ").concat(limit, ") {                business {                    ").concat(businessInfo, "                }            }        }");
                _context4.next = 8;
                return this.makeRequest(popularPlacesQuery);

              case 8:
                data = _context4.sent;

                if (!('search' in data)) {
                  _context4.next = 16;
                  break;
                }

                businesses = data['search']['business'];
                _context4.next = 13;
                return this.cacheSearch({
                  type: 'popularPlaces',
                  latitude: latitude,
                  longitude: longitude,
                  categories: categories,
                  limit: limit
                }, businesses);

              case 13:
                return _context4.abrupt("return", businesses);

              case 16:
                return _context4.abrupt("return", data);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPopularPlaces(_x5, _x6, _x7, _x8) {
        return _getPopularPlaces.apply(this, arguments);
      }

      return getPopularPlaces;
    }()
  }, {
    key: "searchNearbyPlaces",
    value: function () {
      var _searchNearbyPlaces = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(term, latitude, longitude, categories, limit) {
        var cache, searchNearbyPlaces, data, businesses;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.checkCacheForSearch({
                  type: 'searchPlaces',
                  term: term,
                  latitude: latitude,
                  longitude: longitude,
                  categories: categories,
                  limit: limit
                });

              case 2:
                cache = _context5.sent;

                if (!cache) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", cache);

              case 5:
                searchNearbyPlaces = "{            search(term: \"".concat(term, "\", latitude: ").concat(latitude, ", longitude: ").concat(longitude, ", categories: \"").concat(categories, "\", limit: ").concat(limit, ") {                business {                    ").concat(businessInfo, "                }            }        }");
                _context5.next = 8;
                return this.makeRequest(searchNearbyPlaces);

              case 8:
                data = _context5.sent;

                if (!('search' in data)) {
                  _context5.next = 16;
                  break;
                }

                businesses = data['search']['business'];
                _context5.next = 13;
                return this.cacheSearch({
                  type: 'searchPlaces',
                  term: term,
                  latitude: latitude,
                  longitude: longitude,
                  categories: categories,
                  limit: limit
                }, businesses);

              case 13:
                return _context5.abrupt("return", businesses);

              case 16:
                return _context5.abrupt("return", data);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function searchNearbyPlaces(_x9, _x10, _x11, _x12, _x13) {
        return _searchNearbyPlaces.apply(this, arguments);
      }

      return searchNearbyPlaces;
    }()
  }, {
    key: "getPlacesDetails",
    value: function () {
      var _getPlacesDetails = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(ids) {
        var businesses, query, i, data, values;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return client.mgetAsync.apply(client, (0, _toConsumableArray2.default)(ids));

              case 2:
                _context6.t0 = function (arr, x) {
                  if (x) {
                    ids = (0, _removeByVal.default)(ids, x);
                    arr.push(JSON.parse(x));
                    return arr;
                  }
                };

                _context6.t1 = [];
                businesses = _context6.sent.reduce(_context6.t0, _context6.t1);

                if (!(ids.length > 0)) {
                  _context6.next = 17;
                  break;
                }

                query = '{';

                for (i = 0; i < ids.length; i++) {
                  query = query.concat("                    ".concat("business" + i, ": business(id:\"").concat(ids[i], "\") {                        ").concat(businessInfo, "                    }                "));
                }

                query = query.concat('}');
                _context6.next = 11;
                return this.makeRequest(query);

              case 11:
                data = _context6.sent;
                values = Object.values(data);

                if (!(values.length > 0)) {
                  _context6.next = 17;
                  break;
                }

                _context6.next = 16;
                return client.multi(values.map(function (x) {
                  return ["set", x.id, JSON.stringify(x), 'EX', oneDayInSeconds];
                })).execAsync();

              case 16:
                businesses = businesses.concat(values);

              case 17:
                return _context6.abrupt("return", businesses);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getPlacesDetails(_x14) {
        return _getPlacesDetails.apply(this, arguments);
      }

      return getPlacesDetails;
    }()
  }, {
    key: "getAllCategories",
    value: function () {
      var _getAllCategories = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7() {
        var categoriesQuery, data;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                categoriesQuery = "{\n            categories {\n                category {\n                    title\n                    alias\n                    parent_categories {\n                        title\n                        alias\n                    }\n                    country_whitelist {\n                        code\n                    }\n                    country_blacklist {\n                        code\n                    }\n                }\n            }\n        }";
                _context7.next = 3;
                return this.makeRequest(categoriesQuery);

              case 3:
                data = _context7.sent;

                if (!('categories' in data)) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", data['categories']['category']);

              case 8:
                throw new Error("Could not get yelp categories");

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getAllCategories() {
        return _getAllCategories.apply(this, arguments);
      }

      return getAllCategories;
    }()
  }]);
  return PlacesAPI;
}();

exports.PlacesAPI = PlacesAPI;