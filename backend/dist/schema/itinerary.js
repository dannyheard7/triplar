"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    directive @isAuthenticated on FIELD_DEFINITION\n    \n    extend type Query {\n        locationDayItinerary(date: Date!, locationId: ID!): LocationDayItinerary! @isAuthenticated\n    }\n  \n  extend type Mutation {\n    addTripLocation(input: TripLocationInput!): TripLocation! @isAuthenticated\n    addTripLocationItem(input: TripLocationItemInput!): TripLocationItem! @isAuthenticated\n    removeTripLocationItem(input: TripLocationItemInput!): Boolean! @isAuthenticated\n  }\n  \n  type LocationDayItinerary {\n    date: Date\n    places: [Place]\n    location: TripLocation!\n  }\n  \n  type TripLocation {\n    id: ID,\n    city: City!\n    startDate: Date!,\n    endDate: Date!,\n    trip: Trip!\n  }\n  \n  input TripLocationInput {\n    city: String!,\n    startDate: Date!,\n    endDate: Date!,\n    tripId: ID!\n  }\n  \n  type TripLocationItem {\n    startTime: Date!,\n    endTime: Date!,\n    order: Int!,\n    place: Place,\n    location: Location\n  }\n  \n  input TripLocationItemInput {\n    startTime: Date!,\n    endTime: Date!,\n    order: Int,\n    yelpPlaceId: String,\n    locationId: ID!\n  }\n \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports.default = _default;