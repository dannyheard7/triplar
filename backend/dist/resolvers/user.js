"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = require("../config/auth");

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _default = {
  Query: {
    users: function () {
      var _users = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(parent, args, _ref) {
        var user;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = _ref.user;
                _context.next = 3;
                return _User.default.find();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function users(_x, _x2, _x3) {
        return _users.apply(this, arguments);
      }

      return users;
    }(),
    user: function () {
      var _user = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(parent, _ref2) {
        var id;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                _context2.next = 3;
                return _User.default.findById(id);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function user(_x4, _x5) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    userInfo: function () {
      var _userInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(parent, _ref3) {
        var token, user;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = _ref3.token;
                _context3.next = 3;
                return _User.default.findByToken({
                  token: token
                });

              case 3:
                user = _context3.sent;
                user.jwt = token;
                return _context3.abrupt("return", user);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function userInfo(_x6, _x7) {
        return _userInfo.apply(this, arguments);
      }

      return userInfo;
    }()
  },
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(parent, _ref4) {
        var input, firstName, lastName, email, password;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref4.input;
                firstName = input.firstName, lastName = input.lastName, email = input.email, password = input.password;
                _context4.t0 = _User.default;
                _context4.t1 = firstName;
                _context4.t2 = email;
                _context4.t3 = lastName;
                _context4.next = 8;
                return _User.default.hashPassword({
                  password: password
                });

              case 8:
                _context4.t4 = _context4.sent;
                _context4.next = 11;
                return _Role.default.findOneOrCreate({
                  name: "User"
                });

              case 11:
                _context4.t5 = _context4.sent;
                _context4.t6 = [_context4.t5];
                _context4.t7 = {
                  firstName: _context4.t1,
                  email: _context4.t2,
                  lastName: _context4.t3,
                  password: _context4.t4,
                  roles: _context4.t6
                };
                _context4.next = 16;
                return new _context4.t0(_context4.t7).save();

              case 16:
                return _context4.abrupt("return", _context4.sent);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createUser(_x8, _x9) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }
};
exports.default = _default;