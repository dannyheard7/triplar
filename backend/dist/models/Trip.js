"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var uniqueValidator = require('mongoose-unique-validator');

var Schema = _mongoose.default.Schema;
var tripSchema = new Schema({
  name: {
    type: String,
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
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'TripLocation'
  }]
}, {
  collection: 'Trip'
});
tripSchema.plugin(uniqueValidator);

var _default = _mongoose.default.model('Trip', tripSchema);

exports.default = _default;