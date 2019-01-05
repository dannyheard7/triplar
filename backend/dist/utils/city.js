"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByPopulation = sortByPopulation;
exports.findCityByCityAndCountryName = findCityByCityAndCountryName;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _City = _interopRequireDefault(require("../models/City"));

function sortByPopulation(a, b) {
  return b.population - a.population;
} // TODO: Better way to write this?


function findCityByCityAndCountryName(_x, _x2) {
  return _findCityByCityAndCountryName.apply(this, arguments);
}

function _findCityByCityAndCountryName() {
  _findCityByCityAndCountryName = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(cityName, countryName) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(resolve, reject) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _City.default.find({
                          name: cityName
                        }).sort({
                          'population': -1
                        }).populate("country").exec(function (err, cities) {
                          var city = cities.filter(function (city) {
                            return city.country.name === countryName;
                          })[0];
                          if (city) resolve(city);else reject();
                        });

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3, _x4) {
                return _ref.apply(this, arguments);
              };
            }());

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _findCityByCityAndCountryName.apply(this, arguments);
}