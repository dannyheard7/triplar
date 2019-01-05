"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    directive @hasRole(role: String) on FIELD_DEFINITION\n\n  extend type Query {\n    users: [User!] @hasRole(role: \"ADMIN\")\n    user(id: ID!): User! @isAuthenticated\n    userInfo(token: String!): User! @isAuthenticated\n  }\n  \n  extend type Mutation {\n    createUser(input: UserInput!): User!\n  }\n\n  type User {\n    id: ID\n    username: String,\n    firstName: String!,\n    lastName: String!,\n    email: String!,\n    jwt: String,\n    roles: [Role!]\n  }\n  \n  input UserInput{\n    username: String,\n    firstName: String!,\n    lastName: String!,\n    email: String!,\n    password: String!\n  }   \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;