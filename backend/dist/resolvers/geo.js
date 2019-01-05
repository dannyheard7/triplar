"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _City = _interopRequireDefault(require("../models/City"));

var _Country = _interopRequireDefault(require("../models/Country"));

var _default = {
  Query: {
    cities: function () {
      var _cities = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(parent, _ref) {
        var name, _ref$limit, limit, cities;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 5 : _ref$limit;
                cities = _City.default.find({
                  name: new RegExp(name, "i")
                }).sort({
                  'population': -1
                }).limit(limit);
                return _context.abrupt("return", cities ? cities : []);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function cities(_x, _x2) {
        return _cities.apply(this, arguments);
      }

      return cities;
    }()
  },
  City: {
    country: function () {
      var _country2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref2) {
        var _country;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _country = _ref2.country;
                _context2.next = 3;
                return _Country.default.findById(_country);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function country(_x3) {
        return _country2.apply(this, arguments);
      }

      return country;
    }(),
    latitude: function () {
      var _latitude2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(_ref3) {
        var _latitude;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _latitude = _ref3.latitude;
                return _context3.abrupt("return", parseFloat(_latitude));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function latitude(_x4) {
        return _latitude2.apply(this, arguments);
      }

      return latitude;
    }(),
    longitude: function () {
      var _longitude2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(_ref4) {
        var _longitude;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _longitude = _ref4.longitude;
                return _context4.abrupt("return", parseFloat(_longitude));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function longitude(_x5) {
        return _longitude2.apply(this, arguments);
      }

      return longitude;
    }()
  }
};
exports.default = _default;