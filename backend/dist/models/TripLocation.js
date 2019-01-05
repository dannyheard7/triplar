"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var uniqueValidator = require('mongoose-unique-validator');

var Schema = _mongoose.default.Schema;
var tripLocationSchema = new Schema({
  city: {
    type: Number,
    ref: 'TripLocation',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  trip: {
    type: Schema.ObjectId,
    ref: 'Trip',
    required: true
  },
  items: [{
    type: Schema.ObjectId,
    ref: 'TripLocationItem'
  }]
}, {
  collection: 'TripLocation'
});
tripLocationSchema.plugin(uniqueValidator);

var _default = _mongoose.default.model('TripLocation', tripLocationSchema);

exports.default = _default;