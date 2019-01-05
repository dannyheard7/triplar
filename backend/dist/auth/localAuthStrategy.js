"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localStrategyLogin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passportLocal = require("passport-local");

var _User = _interopRequireDefault(require("../models/User"));

var localStrategyLogin = new _passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(email, password, done) {
    var user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User.default.findByLogin({
              email: email,
              password: password
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);

          case 11:
            return _context.abrupt("return", done(null, false, {
              message: 'Incorrect email or password.'
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.localStrategyLogin = localStrategyLogin;