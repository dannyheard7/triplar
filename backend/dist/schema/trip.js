"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    directive @isAuthenticated on FIELD_DEFINITION\n\n  extend type Query {\n    trips: [Trip!] @isAuthenticated\n    trip(id: ID!): Trip @isAuthenticated\n  }\n  \n  extend type Mutation {\n    createTrip(input: TripInput!): Trip! @isAuthenticated\n    updateTrip(input: TripInput!): Trip! @isAuthenticated\n    deleteTrip(id: ID!): Boolean! @isAuthenticated\n  }\n\n  type Trip {\n    id: ID\n    name: String!\n    startDate: Date!,\n    endDate: Date!,\n    createdBy: User!\n    locations: [TripLocation!]\n  }\n  \n  input TripInput {\n    id: ID\n    name: String!,\n    startDate: Date!,\n    endDate: Date!\n  }\n \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;