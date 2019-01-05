"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _user = _interopRequireDefault(require("./user"));

var _role = _interopRequireDefault(require("./role"));

var _trip = _interopRequireDefault(require("./trip"));

var _itinerary = _interopRequireDefault(require("./itinerary"));

var _geo = _interopRequireDefault(require("./geo"));

var _place = _interopRequireDefault(require("./place"));

var _types = _interopRequireDefault(require("./types"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  type Query {\n    _: Boolean\n  }\n\n  type Mutation {\n    _: Boolean\n  }\n\n  type Subscription {\n    _: Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var linkSchema = (0, _apolloServerExpress.gql)(_templateObject());
var _default = [linkSchema, _types.default, _user.default, _role.default, _trip.default, _itinerary.default, _geo.default, _place.default];
exports.default = _default;