"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FACEBOOK_APP_SECRET = exports.FACEBOOK_APP_ID = exports.JWT_SECRET = exports.JWT_EXPIRES = exports.saltRounds = void 0;
var saltRounds = parseInt(process.env.SALT_ROUNDS);
exports.saltRounds = saltRounds;
var JWT_EXPIRES = process.env.JWT_EXPIRES;
exports.JWT_EXPIRES = JWT_EXPIRES;
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
exports.FACEBOOK_APP_ID = FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
exports.FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET;