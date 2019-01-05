"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["  \n   directive @isAuthenticated on FIELD_DEFINITION\n\n  extend type Query {\n    cities(name: String = \"\"): [City!] @isAuthenticated\n  }\n\n  type City {\n    id: ID\n    name: String!,\n    country: Country!,\n    population: Int,\n    latitude: Float,\n    longitude: Float,\n  }  \n  \n  type Country {\n    id: ID\n    name: String!,\n    alpha2Code: String,\n    alpha3Code: String\n  } \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;