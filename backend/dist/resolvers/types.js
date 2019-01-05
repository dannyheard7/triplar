"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  Date: function (_Date) {
    function Date(_x) {
      return _Date.apply(this, arguments);
    }

    Date.toString = function () {
      return _Date.toString();
    };

    return Date;
  }(function (date) {
    return new Date(date);
  })
};
exports.default = _default;