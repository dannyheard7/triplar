"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAuthRoute = exports.facebookLoginRoute = exports.loginRoute = exports.default = void 0;

var _lib = _interopRequireDefault(require("passport/lib"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = require("../config/auth");

var _jwtAuthStrategy = _interopRequireDefault(require("./jwtAuthStrategy"));

var _localAuthStrategy = require("./localAuthStrategy");

var _facebookAuthStrategy = require("./facebookAuthStrategy");

_lib.default.use(_jwtAuthStrategy.default);

_lib.default.use('login', _localAuthStrategy.localStrategyLogin);

_lib.default.use(_facebookAuthStrategy.facebookLoginStrategy);

_lib.default.serializeUser(function (user, done) {
  return done(null, user._id);
});

var _default = _lib.default;
exports.default = _default;

var loginRoute = function loginRoute(req, res) {
  _lib.default.authenticate('login', {
    session: false
  }, function (err, user, info) {
    if (err) return res.status(500).send(error);
    if (!user) return res.status(500).send(new Error("Could not find user"));
    req.login(user, {
      session: false
    }, function (error) {
      if (error) return res.status(500).send(error);
      var body = {
        _id: user._id,
        email: user.email
      };
      body.jwt = _jsonwebtoken.default.sign({
        user: body
      }, _auth.JWT_SECRET, {
        expiresIn: _auth.JWT_EXPIRES
      });
      return res.json(body);
    });
  })(req, res);
};

exports.loginRoute = loginRoute;

var facebookLoginRoute = function facebookLoginRoute(req, res) {
  _lib.default.authenticate('facebook-token', {
    session: false
  }, function (err, user, info) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(500).send(new Error("Could not find user"));
    req.login(user, {
      session: false
    }, function (error) {
      if (error) return res.status(500).send(error);
      var body = {
        _id: user._id,
        email: user.email
      };
      body.jwt = _jsonwebtoken.default.sign({
        user: body
      }, _auth.JWT_SECRET, {
        expiresIn: _auth.JWT_EXPIRES
      });
      return res.json(body);
    });
  })(req, res);
};

exports.facebookLoginRoute = facebookLoginRoute;

var jwtAuthRoute = function jwtAuthRoute(req, res, next) {
  _lib.default.authenticate('jwt', {
    session: false
  }, function (err, user) {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
};

exports.jwtAuthRoute = jwtAuthRoute;