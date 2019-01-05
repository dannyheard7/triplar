"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Trip = _interopRequireDefault(require("../models/Trip"));

var _User = _interopRequireDefault(require("../models/User"));

var _apolloServerExpress = require("apollo-server-express");

var _TripLocation = _interopRequireDefault(require("../models/TripLocation"));

var _default = {
  Query: {
    trips: function () {
      var _trips = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(parent, args, _ref) {
        var user;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = _ref.user;
                _context.next = 3;
                return _Trip.default.find({
                  createdBy: user._id
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function trips(_x, _x2, _x3) {
        return _trips.apply(this, arguments);
      }

      return trips;
    }(),
    trip: function () {
      var _trip = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(parent, _ref2, _ref3) {
        var id, user, trip;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                user = _ref3.user;
                _context2.next = 4;
                return _Trip.default.findById(id);

              case 4:
                trip = _context2.sent;

                if (!trip.createdBy.equals(user.id)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", trip);

              case 7:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to view this trip");

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function trip(_x4, _x5, _x6) {
        return _trip.apply(this, arguments);
      }

      return trip;
    }()
  },
  Mutation: {
    createTrip: function () {
      var _createTrip = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(parent, _ref4, _ref5) {
        var input, user, name, startDate, endDate;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                input = _ref4.input;
                user = _ref5.user;
                name = input.name, startDate = input.startDate, endDate = input.endDate;
                _context3.next = 5;
                return _Trip.default.create({
                  name: name,
                  startDate: startDate,
                  endDate: endDate,
                  createdBy: user
                });

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createTrip(_x7, _x8, _x9) {
        return _createTrip.apply(this, arguments);
      }

      return createTrip;
    }(),
    updateTrip: function () {
      var _updateTrip = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(parent, _ref6, _ref7) {
        var input, user, id, trip;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref6.input;
                user = _ref7.user;
                id = input.id;
                _context4.next = 5;
                return _Trip.default.findById(id);

              case 5:
                trip = _context4.sent;

                if (!trip.createdBy.equals(user._id)) {
                  _context4.next = 13;
                  break;
                }

                trip.set((0, _objectSpread2.default)({}, input));
                _context4.next = 10;
                return trip.save();

              case 10:
                return _context4.abrupt("return", _context4.sent);

              case 13:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to update this trip.");

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateTrip(_x10, _x11, _x12) {
        return _updateTrip.apply(this, arguments);
      }

      return updateTrip;
    }(),
    deleteTrip: function () {
      var _deleteTrip = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(parent, _ref8, _ref9) {
        var id, user, trip;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref8.id;
                user = _ref9.user;
                _context5.next = 4;
                return _Trip.default.findById(id);

              case 4:
                trip = _context5.sent;

                if (!trip.createdBy.equals(user._id)) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 8;
                return trip.remove();

              case 8:
                return _context5.abrupt("return", true);

              case 11:
                throw new _apolloServerExpress.ForbiddenError("You are not authorized to delete this trip.");

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteTrip(_x13, _x14, _x15) {
        return _deleteTrip.apply(this, arguments);
      }

      return deleteTrip;
    }()
  },
  Trip: {
    createdBy: function () {
      var _createdBy2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(_ref10) {
        var _createdBy;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _createdBy = _ref10.createdBy;
                _context6.next = 3;
                return _User.default.findById(_createdBy);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function createdBy(_x16) {
        return _createdBy2.apply(this, arguments);
      }

      return createdBy;
    }(),
    locations: function () {
      var _locations2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(_ref11) {
        var _locations;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _locations = _ref11.locations;
                _context7.next = 3;
                return _TripLocation.default.find({
                  _id: {
                    $in: _locations
                  }
                });

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function locations(_x17) {
        return _locations2.apply(this, arguments);
      }

      return locations;
    }()
  }
};
exports.default = _default;