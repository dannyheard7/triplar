"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redis = _interopRequireDefault(require("redis"));

var bluebird = _interopRequireWildcard(require("bluebird"));

var _redis2 = require("../config/redis");

var _yelpApi = require("../plugins/yelpApi");

bluebird.promisifyAll(_redis.default);

var client = _redis.default.createClient(_redis2.REDIS_PORT, _redis2.REDIS_HOST);

var _default = {
  Query: {
    popularPlaces: function () {
      var _popularPlaces = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(parent, _ref) {
        var latitude, longitude, _ref$category, category, _ref$limit, limit;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                latitude = _ref.latitude, longitude = _ref.longitude, _ref$category = _ref.category, category = _ref$category === void 0 ? _yelpApi.defaultCategories : _ref$category, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 8 : _ref$limit;
                if (category === "") category = _yelpApi.defaultCategories;
                _context.next = 4;
                return _yelpApi.PlacesAPI.getPopularPlaces(latitude, longitude, category, limit);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function popularPlaces(_x, _x2) {
        return _popularPlaces.apply(this, arguments);
      }

      return popularPlaces;
    }(),
    searchNearbyPlaces: function () {
      var _searchNearbyPlaces = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(parent, _ref2) {
        var term, latitude, longitude, _ref2$category, category, _ref2$limit, limit;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                term = _ref2.term, latitude = _ref2.latitude, longitude = _ref2.longitude, _ref2$category = _ref2.category, category = _ref2$category === void 0 ? _yelpApi.defaultCategories : _ref2$category, _ref2$limit = _ref2.limit, limit = _ref2$limit === void 0 ? 8 : _ref2$limit;
                if (category === "") category = _yelpApi.defaultCategories;
                _context2.next = 4;
                return _yelpApi.PlacesAPI.searchNearbyPlaces(term, latitude, longitude, category, limit);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function searchNearbyPlaces(_x3, _x4) {
        return _searchNearbyPlaces.apply(this, arguments);
      }

      return searchNearbyPlaces;
    }(),
    place: function () {
      var _place = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(parent, _ref3) {
        var id;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref3.id;
                _context3.next = 3;
                return _yelpApi.PlacesAPI.getPlacesDetails([id]);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function place(_x5, _x6) {
        return _place.apply(this, arguments);
      }

      return place;
    }(),
    categories: function () {
      var _categories = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var categories;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return client.getAsync("yelp-categories");

              case 2:
                categories = _context4.sent;

                if (!categories) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", Object.values(JSON.parse(categories)));

              case 7:
                return _context4.abrupt("return", []);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function categories() {
        return _categories.apply(this, arguments);
      }

      return categories;
    }(),
    category: function () {
      var _category = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(parent, _ref4) {
        var alias, categories, categoriesObj;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                alias = _ref4.alias;
                _context5.next = 3;
                return client.getAsync("yelp-categories");

              case 3:
                categories = _context5.sent;

                if (!categories) {
                  _context5.next = 8;
                  break;
                }

                categoriesObj = JSON.parse(categories);

                if (!(alias in categoriesObj)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", categoriesObj[alias]);

              case 8:
                return _context5.abrupt("return", []);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function category(_x7, _x8) {
        return _category.apply(this, arguments);
      }

      return category;
    }()
  }
};
exports.default = _default;