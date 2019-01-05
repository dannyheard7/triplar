"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directiveResolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var directiveResolvers = {
  isAuthenticated: function () {
    var _isAuthenticated = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(next, source, args, _ref) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = _ref.user;

              if (!user) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return next();

            case 4:
              return _context.abrupt("return", _context.sent);

            case 7:
              throw new _apolloServerExpress.ForbiddenError("You must be signed in to view this resource.");

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function isAuthenticated(_x, _x2, _x3, _x4) {
      return _isAuthenticated.apply(this, arguments);
    }

    return isAuthenticated;
  }(),
  hasRole: function () {
    var _hasRole = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(next, source, _ref2, _ref3) {
      var role, user;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              role = _ref2.role;
              user = _ref3.user;

              if (!user) {
                _context2.next = 14;
                break;
              }

              _context2.next = 5;
              return user.hasRole(role);

            case 5:
              if (!_context2.sent) {
                _context2.next = 11;
                break;
              }

              _context2.next = 8;
              return next();

            case 8:
              return _context2.abrupt("return", _context2.sent);

            case 11:
              throw new _apolloServerExpress.ForbiddenError("You are not authorized to view this resource.");

            case 12:
              _context2.next = 15;
              break;

            case 14:
              throw new _apolloServerExpress.ForbiddenError("You must be signed in to view this resource.");

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function hasRole(_x5, _x6, _x7, _x8) {
      return _hasRole.apply(this, arguments);
    }

    return hasRole;
  }()
};
exports.directiveResolvers = directiveResolvers;