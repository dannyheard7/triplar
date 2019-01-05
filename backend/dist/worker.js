"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesImporterQueue = exports.geoImporterQueue = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bull = _interopRequireDefault(require("bull"));

var _countriesImporter = require("./plugins/countriesImporter");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _City = _interopRequireDefault(require("./models/City"));

var _datastore = require("./config/datastore");

var _redis = require("./config/redis");

var _yelpApi = require("./plugins/yelpApi");

var _redis2 = _interopRequireDefault(require("redis"));

var bluebird = _interopRequireWildcard(require("bluebird"));

bluebird.promisifyAll(_redis2.default);

var client = _redis2.default.createClient(_redis.REDIS_PORT, _redis.REDIS_HOST);

var geoImporterQueue = new _bull.default('countries & cities importer', {
  redis: {
    port: _redis.REDIS_PORT,
    host: _redis.REDIS_HOST
  }
});
exports.geoImporterQueue = geoImporterQueue;
var categoriesImporterQueue = new _bull.default('yelp categories importer', {
  redis: {
    port: _redis.REDIS_PORT,
    host: _redis.REDIS_HOST
  }
});
exports.categoriesImporterQueue = categoriesImporterQueue;
geoImporterQueue.empty();
categoriesImporterQueue.empty();
geoImporterQueue.process(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(job, done) {
    var countries;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _countriesImporter.importCountries)();

          case 3:
            countries = _context.sent;
            _context.next = 6;
            return (0, _countriesImporter.importCities)(countries);

          case 6:
            done();
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);
            throw _context.t0;

          case 13:
            _context.prev = 13;

            _mongoose.default.connection.close();

            return _context.finish(13);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9, 13, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

if (_mongoose.default.connection.readyState !== 1) {
  _mongoose.default.connect(_datastore.MONGO_URL);
}

_City.default.countDocuments({}, function (err, count) {
  if (!count || count === 0) geoImporterQueue.add();
});

categoriesImporterQueue.process(
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(job, done) {
    var categories, allCategories;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _yelpApi.PlacesAPI.getAllCategories();

          case 3:
            categories = _context2.sent;
            allCategories = {};
            categories.forEach(function (category, index, object) {
              if (!category.parent_categories || category.parent_categories.length === 0) {
                allCategories[category.alias] = category;
                object.splice(index, 1);
              }
            });
            categories.forEach(function (category) {
              category.parent_categories.forEach(function (_ref3) {
                var alias = _ref3.alias;

                if (allCategories[alias] && allCategories[alias].subCategories) {
                  allCategories[alias].subCategories.push(category);
                } else if (allCategories[alias]) {
                  allCategories[alias].subCategories = [category];
                }
              });
            });
            _context2.next = 9;
            return client.setAsync("yelp-categories", JSON.stringify(allCategories), 'EX', _yelpApi.oneDayInSeconds);

          case 9:
            done();
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.message);
            throw _context2.t0;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
client.exists('yelp-categories', function (err, count) {
  if (!count || count === 0) categoriesImporterQueue.add();
}); // Run every night at midnight

categoriesImporterQueue.add(null, {
  repeat: {
    cron: '0 0 * * *'
  }
});