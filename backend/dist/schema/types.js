"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    scalar Date\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;