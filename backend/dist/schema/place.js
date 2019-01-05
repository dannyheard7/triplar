"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    directive @isAuthenticated on FIELD_DEFINITION\n\n  extend type Query {\n    popularPlaces(latitude: Float!, longitude: Float!, category: String, limit: String): [Place] @isAuthenticated\n    searchNearbyPlaces(term: String!, latitude: Float!, longitude: Float!, category: String, limit: String): [Place] @isAuthenticated\n    place(id: String!): Place @isAuthenticated\n    categories: [Category] @isAuthenticated\n    category(alias: String!, countryCode: String): Category! @isAuthenticated\n  }\n \n  type Place {\n    id: ID!\n    name: String!\n    url: String\n    location: Location\n    coordinates: Coordinates\n    photos: [String],\n    rating: Float,\n    displayPhone: String\n  }\n  \n  type Location {\n    address: String\n  }\n  \n  type Coordinates {\n    latitude: Float!\n    longitude: Float!\n  }\n  \n  type Category {\n      alias: String\n      title: String\n      subCategories: [Category]\n      countryWhitelist: [YelpCountry]\n      countryBlacklist: [YelpCountry]\n  }\n  \n  type YelpCountry {\n    code: String\n  }\n \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;