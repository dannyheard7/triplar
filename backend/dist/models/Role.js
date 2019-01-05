"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose.default.Schema;
var roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  collection: 'Role'
});

roleSchema.statics.findOneOrCreate =
/*#__PURE__*/
function () {
  var _findOneOrCreate = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(condition) {
    var self;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            self = this;
            _context2.next = 3;
            return new Promise(function (resolve, reject) {
              self.findOne(condition,
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(err, result) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 4;
                            break;
                          }

                          reject(err);
                          _context.next = 13;
                          break;

                        case 4:
                          if (!result) {
                            _context.next = 8;
                            break;
                          }

                          resolve(result);
                          _context.next = 13;
                          break;

                        case 8:
                          _context.t0 = resolve;
                          _context.next = 11;
                          return self.create(condition);

                        case 11:
                          _context.t1 = _context.sent;
                          return _context.abrupt("return", (0, _context.t0)(_context.t1));

                        case 13:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x2, _x3) {
                  return _ref.apply(this, arguments);
                };
              }());
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function findOneOrCreate(_x) {
    return _findOneOrCreate.apply(this, arguments);
  }

  return findOneOrCreate;
}();

var _default = _mongoose.default.model('Role', roleSchema);

exports.default = _default;