"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importCountries = importCountries;
exports.importCities = importCities;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _Country = _interopRequireDefault(require("../models/Country"));

var fs = _interopRequireWildcard(require("fs"));

var _extractZip = _interopRequireDefault(require("extract-zip"));

var _City = _interopRequireDefault(require("../models/City"));

function importCountries() {
  return _importCountries.apply(this, arguments);
}

function _importCountries() {
  _importCountries = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var url, response, data, countries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, country, latLng;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'https://restcountries.eu/rest/v2/all';
            _context.prev = 1;
            _context.next = 4;
            return _axios.default.get(url);

          case 4:
            response = _context.sent;

            if (!response.data) {
              _context.next = 30;
              break;
            }

            data = response.data;
            countries = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;

            for (_iterator = data[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              country = _step.value;
              delete country["capital"];
              latLng = country.latlng;

              if (country.alpha2Code === 'GB') {
                country.name = 'United Kingdom';
              }

              if (country.alpha2Code && latLng && latLng.length === 2) {
                countries.push((0, _objectSpread2.default)({
                  _id: country.alpha2Code
                }, country, {
                  latitude: latLng[0],
                  longitude: latLng[1]
                }));
              }
            }

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 19:
            _context.prev = 19;
            _context.prev = 20;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 22:
            _context.prev = 22;

            if (!_didIteratorError) {
              _context.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context.finish(22);

          case 26:
            return _context.finish(19);

          case 27:
            _context.next = 29;
            return _Country.default.insertMany(countries);

          case 29:
            return _context.abrupt("return", countries.map(function (x) {
              return x.alpha2Code;
            }));

          case 30:
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](1);
            throw _context.t1;

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 32], [11, 15, 19, 27], [20,, 22, 26]]);
  }));
  return _importCountries.apply(this, arguments);
}

function importCities(_x) {
  return _importCities.apply(this, arguments);
}

function _importCities() {
  _importCities = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(countries) {
    var citiesFileName, citiesDataURL, targetZip, targetFolder, response, content, cities;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            citiesFileName = "cities".concat(process.env.CITY_MIN_POPULATION);
            citiesDataURL = "http://download.geonames.org/export/dump/".concat(citiesFileName, ".zip");
            targetZip = __dirname + "/data/".concat(citiesFileName, ".zip");
            targetFolder = __dirname + "/data/".concat(citiesFileName);
            if (!fs.existsSync(__dirname + '/data')) fs.mkdirSync(__dirname + '/data');
            if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);
            _context3.prev = 6;
            _context3.next = 9;
            return _axios.default.get(citiesDataURL, {
              responseType: 'arraybuffer'
            });

          case 9:
            response = _context3.sent;

            if (!response.data) {
              _context3.next = 19;
              break;
            }

            fs.writeFileSync(targetZip, response.data);
            _context3.next = 14;
            return new Promise(function (resolve, reject) {
              (0, _extractZip.default)(targetZip, {
                dir: targetFolder
              }, function (err) {
                if (err) throw err;
                resolve();
              });
            });

          case 14:
            content = fs.readFileSync(targetFolder + "/".concat(citiesFileName, ".txt"), "utf8");
            cities = [];
            content.split('\n').map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(city) {
                var p, geoCityId;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        p = city.split('\t');
                        geoCityId = p[0];

                        if (geoCityId && countries.includes(p[8])) {
                          cities.push({
                            _id: geoCityId,
                            name: p[1],
                            latitude: p[4],
                            longitude: p[5],
                            country: p[8],
                            population: p[14],
                            timezone: p[17]
                          });
                        }

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }());
            _context3.next = 19;
            return _City.default.insertMany(cities);

          case 19:
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](6);
            console.log(_context3.t0.message);
            throw _context3.t0;

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[6, 21]]);
  }));
  return _importCities.apply(this, arguments);
}