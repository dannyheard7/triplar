"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Trip = _interopRequireDefault(require("../models/Trip"));

var _apolloServerExpress = require("apollo-server-express");

var _City = _interopRequireDefault(require("../models/City"));

var _TripLocation = _interopRequireDefault(require("../models/TripLocation"));

var _city3 = require("../utils/city");

var _TripLocationItem = _interopRequireDefault(require("../models/TripLocationItem"));

var _yelpApi = require("../plugins/yelpApi");

var _default = {
  Query: {
    locationDayItinerary: function () {
      var _locationDayItinerary = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(parent, _ref, _ref2) {
        var date, locationId, user, tripLocation, startTime, endTime, places;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = _ref.date, locationId = _ref.locationId;
                user = _ref2.user;
                _context.next = 4;
                return _TripLocation.default.findById(locationId).populate('trip');

              case 4:
                tripLocation = _context.sent;
                startTime = new Date(date).setHours(0, 0, 0, 0);
                endTime = new Date(date).setHours(23, 59, 59, 59);

                if (!tripLocation.trip.createdBy.equals(user._id)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 10;
                return _TripLocationItem.default.find({
                  _id: {
                    $in: tripLocation.items
                  },
                  startTime: {
                    $gte: startTime,
                    $lte: endTime
                  },
                  endTime: {
                    $gte: startTime,
                    $lte: endTime
                  }
                });

              case 10:
                places = _context.sent;

                if (!(places.length > 0)) {
                  _context.next = 19;
                  break;
                }

                _context.t0 = tripLocation;
                _context.next = 15;
                return _yelpApi.PlacesAPI.getPlacesDetails(places.map(function (x) {
                  return x.yelpPlaceId;
                }));

              case 15:
                _context.t1 = _context.sent;
                return _context.abrupt("return", {
                  location: _context.t0,
                  places: _context.t1
                });

              case 19:
                return _context.abrupt("return", {
                  location: tripLocation,
                  places: []
                });

              case 20:
                _context.next = 23;
                break;

              case 22:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to view this trip.");

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function locationDayItinerary(_x, _x2, _x3) {
        return _locationDayItinerary.apply(this, arguments);
      }

      return locationDayItinerary;
    }()
  },
  Mutation: {
    addTripLocation: function () {
      var _addTripLocation = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(parent, _ref3, _ref4) {
        var input, user, city, startDate, endDate, tripId, trip, _city$split$map, _city$split$map2, cityName, countryName, cityObj, tripLocation;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref3.input;
                user = _ref4.user;
                city = input.city, startDate = input.arrivalDate, endDate = input.departureDate, tripId = input.tripId;
                _context2.next = 5;
                return _Trip.default.findById(tripId);

              case 5:
                trip = _context2.sent;

                if (!trip.createdBy.equals(user._id)) {
                  _context2.next = 27;
                  break;
                }

                _city$split$map = city.split(',').map(function (x) {
                  return x.trim();
                }), _city$split$map2 = (0, _slicedToArray2.default)(_city$split$map, 2), cityName = _city$split$map2[0], countryName = _city$split$map2[1];
                _context2.next = 10;
                return (0, _city3.findCityByCityAndCountryName)(cityName, countryName);

              case 10:
                cityObj = _context2.sent;
                _context2.prev = 11;
                _context2.next = 14;
                return _TripLocation.default.create({
                  city: cityObj._id,
                  arrivalDate: startDate,
                  departureDate: endDate,
                  trip: trip._id
                });

              case 14:
                tripLocation = _context2.sent;
                trip.locations.push(tripLocation._id);
                _context2.next = 18;
                return trip.save();

              case 18:
                return _context2.abrupt("return", tripLocation);

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](11);
                console.log(_context2.t0.message);
                throw new Error("Server Error");

              case 25:
                _context2.next = 28;
                break;

              case 27:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to modify this trip.");

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[11, 21]]);
      }));

      function addTripLocation(_x4, _x5, _x6) {
        return _addTripLocation.apply(this, arguments);
      }

      return addTripLocation;
    }(),
    addTripLocationItem: function () {
      var _addTripLocationItem = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(parent, _ref5, _ref6) {
        var input, user, locationId, location, tripLocationItem;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                input = _ref5.input;
                user = _ref6.user;
                locationId = input.locationId;
                _context3.next = 5;
                return _TripLocation.default.findById(locationId).populate('trip');

              case 5:
                location = _context3.sent;

                if (!location.trip.createdBy.equals(user._id)) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 9;
                return _TripLocationItem.default.create((0, _objectSpread2.default)({}, input, {
                  location: location._id
                }));

              case 9:
                tripLocationItem = _context3.sent;
                location.items.push(tripLocationItem._id);
                _context3.next = 13;
                return location.save();

              case 13:
                return _context3.abrupt("return", tripLocationItem);

              case 16:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to modify this trip.");

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addTripLocationItem(_x7, _x8, _x9) {
        return _addTripLocationItem.apply(this, arguments);
      }

      return addTripLocationItem;
    }(),
    removeTripLocationItem: function () {
      var _removeTripLocationItem = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(parent, _ref7, _ref8) {
        var input, user, locationId, location, tripLocationItem;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref7.input;
                user = _ref8.user;
                locationId = input.locationId;
                _context4.prev = 3;
                _context4.next = 6;
                return _TripLocation.default.findById(locationId).populate('trip');

              case 6:
                location = _context4.sent;

                if (!location.trip.createdBy.equals(user._id)) {
                  _context4.next = 19;
                  break;
                }

                _context4.next = 10;
                return _TripLocationItem.default.findOne({
                  location: location._id,
                  yelpPlaceId: input.yelpPlaceId
                });

              case 10:
                tripLocationItem = _context4.sent;
                _context4.next = 13;
                return tripLocationItem.remove();

              case 13:
                location.items.remove(tripLocationItem._id);
                _context4.next = 16;
                return location.save();

              case 16:
                return _context4.abrupt("return", true);

              case 19:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to modify this trip.");

              case 20:
                _context4.next = 26;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](3);
                console.log(_context4.t0.message);
                return _context4.abrupt("return", false);

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 22]]);
      }));

      function removeTripLocationItem(_x10, _x11, _x12) {
        return _removeTripLocationItem.apply(this, arguments);
      }

      return removeTripLocationItem;
    }()
  },
  TripLocation: {
    city: function () {
      var _city2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(_ref9) {
        var _city;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _city = _ref9.city;
                _context5.next = 3;
                return _City.default.findById(_city);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function city(_x13) {
        return _city2.apply(this, arguments);
      }

      return city;
    }(),
    trip: function () {
      var _trip2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(_ref10) {
        var _trip;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _trip = _ref10.trip;
                _context6.next = 3;
                return _Trip.default.findById(_trip);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function trip(_x14) {
        return _trip2.apply(this, arguments);
      }

      return trip;
    }()
  },
  TripLocationItem: {
    place: function () {
      var _place = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(_ref11) {
        var yelpPlaceId, places;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                yelpPlaceId = _ref11.yelpPlaceId;
                _context7.next = 3;
                return _yelpApi.PlacesAPI.getPlacesDetails([yelpPlaceId]);

              case 3:
                places = _context7.sent;

                if (!(places.length > 0)) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", places[0]);

              case 8:
                throw new Error("Cannot load place info");

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function place(_x15) {
        return _place.apply(this, arguments);
      }

      return place;
    }()
  }
};
exports.default = _default;