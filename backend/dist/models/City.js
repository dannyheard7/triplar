"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Country = _interopRequireDefault(require("./Country"));

var uniqueValidator = require('mongoose-unique-validator');

var Schema = _mongoose.default.Schema;
var citySchema = new Schema({
  _id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    ref: 'Country'
  },
  population: {
    type: Number,
    required: true
  },
  latitude: {
    type: Schema.Types.Decimal128,
    required: true
  },
  longitude: {
    type: Schema.Types.Decimal128,
    required: true
  },
  timezone: String
}, {
  collection: 'City'
});
citySchema.plugin(uniqueValidator);

var _default = _mongoose.default.model('City', citySchema);

exports.default = _default;