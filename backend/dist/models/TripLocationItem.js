"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var uniqueValidator = require('mongoose-unique-validator');

var Schema = _mongoose.default.Schema;
var tripLocationItemSchema = new Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  yelpPlaceId: String,
  location: {
    type: Schema.ObjectId,
    ref: 'TripLocation',
    required: true
  }
}, {
  collection: 'TripLocationItem'
});
tripLocationItemSchema.plugin(uniqueValidator);

var _default = _mongoose.default.model('TripLocationItem', tripLocationItemSchema);

exports.default = _default;