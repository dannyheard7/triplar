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

var _apolloServerExpress = require("apollo-server-express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Role = _interopRequireDefault(require("./Role"));

var uniqueValidator = require('mongoose-unique-validator');

var Schema = _mongoose.default.Schema;
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function required() {
      return this.facebookProvider.id === null;
    }
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
}, {
  collection: 'User'
});
UserSchema.plugin(uniqueValidator);

UserSchema.statics.hashPassword =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(opts) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              _bcryptjs.default.hash(opts.password, _auth.saltRounds, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
              });
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

UserSchema.statics.findByLogin =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(opts) {
    var user;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.findOne({
              email: opts.email
            });

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return new Promise(function (resolve, reject) {
              return _bcryptjs.default.compare(opts.password, user.password, function (err, res) {
                if (err) reject(err);else if (res) resolve(user);else reject();
              });
            });

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

UserSchema.statics.upsertFacebookUser =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(accessToken, refreshToken, profile) {
    var user, _user;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.findOne({
              'facebookProvider.id': profile.id
            });

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 19;
              break;
            }

            _context3.next = 6;
            return this.findOne({
              email: profile.emails[0].value
            });

          case 6:
            _user = _context3.sent;

            if (!_user) {
              _context3.next = 14;
              break;
            }

            _user.set({
              facebookProvider: {
                id: profile.id,
                token: accessToken
              }
            });

            _context3.next = 11;
            return _user.save();

          case 11:
            return _context3.abrupt("return", _user);

          case 14:
            _context3.next = 16;
            return this.create({
              firstName: profile.first_name,
              lastName: profile.last_name,
              email: profile.emails[0].value,
              facebookProvider: {
                id: profile.id,
                token: accessToken
              }
            });

          case 16:
            return _context3.abrupt("return", _context3.sent);

          case 17:
            _context3.next = 20;
            break;

          case 19:
            return _context3.abrupt("return", user);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

UserSchema.statics.findByToken =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(_ref4) {
    var _this = this;

    var token;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = _ref4.token;
            _context5.next = 3;
            return new Promise(function (resolve, reject) {
              return _jsonwebtoken.default.verify(token, _auth.JWT_SECRET,
              /*#__PURE__*/
              function () {
                var _ref6 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee4(err, result) {
                  return _regenerator.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!err) {
                            _context4.next = 4;
                            break;
                          }

                          reject(err);
                          _context4.next = 13;
                          break;

                        case 4:
                          if (!result) {
                            _context4.next = 12;
                            break;
                          }

                          _context4.t0 = resolve;
                          _context4.next = 8;
                          return _this.findOne({
                            email: result.user.email
                          });

                        case 8:
                          _context4.t1 = _context4.sent;
                          (0, _context4.t0)(_context4.t1);
                          _context4.next = 13;
                          break;

                        case 12:
                          reject();

                        case 13:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                }));

                return function (_x7, _x8) {
                  return _ref6.apply(this, arguments);
                };
              }());
            });

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x6) {
    return _ref5.apply(this, arguments);
  };
}();

UserSchema.methods.hasRole =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6(role) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userRoleId, userRole;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context6.prev = 3;
            _iterator = this.roles[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context6.next = 15;
              break;
            }

            userRoleId = _step.value;
            _context6.next = 9;
            return _Role.default.findById(userRoleId);

          case 9:
            userRole = _context6.sent;

            if (!(userRole.name.toLowerCase() === role.toLowerCase())) {
              _context6.next = 12;
              break;
            }

            return _context6.abrupt("return", true);

          case 12:
            _iteratorNormalCompletion = true;
            _context6.next = 5;
            break;

          case 15:
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context6.t0;

          case 21:
            _context6.prev = 21;
            _context6.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 24:
            _context6.prev = 24;

            if (!_didIteratorError) {
              _context6.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context6.finish(24);

          case 28:
            return _context6.finish(21);

          case 29:
            return _context6.abrupt("return", false);

          case 30:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[3, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function (_x9) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;