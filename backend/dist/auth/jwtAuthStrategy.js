"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passportJwt = require("passport-jwt");

var _auth = require("../config/auth");

var _User = _interopRequireDefault(require("../models/User"));

var params = {
  secretOrKey: _auth.JWT_SECRET,
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt')
};
var jwtAuthStrategy = new _passportJwt.Strategy(params,
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(payload, done) {
    var user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User.default.findById(payload.user._id);

          case 3:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 6;
              break;
            }

            _context.t0 = null;

          case 6:
            user = _context.t0;
            return _context.abrupt("return", done(null, user));

          case 10:
            _context.prev = 10;
            _context.t1 = _context["catch"](0);
            done(_context.t1);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = jwtAuthStrategy;
exports.default = _default;