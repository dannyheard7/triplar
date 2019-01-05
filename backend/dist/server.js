"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _cors = _interopRequireDefault(require("cors"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers2 = require("./directives/resolvers");

var _datastore = require("./config/datastore");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _auth = _interopRequireWildcard(require("./auth/auth"));

_mongoose.default.connect(_datastore.MONGO_URL);

var execSchema = (0, _apolloServerExpress.makeExecutableSchema)({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  directiveResolvers: _resolvers2.directiveResolvers
});
var server = new _apolloServerExpress.ApolloServer({
  schema: execSchema,
  context: function context(_ref) {
    var req = _ref.req;
    return {
      user: req.user
    };
  }
});
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_auth.default.initialize());
app.post('/login', _auth.loginRoute);
app.post('/login/facebook', _auth.facebookLoginRoute);
app.use('/graphql', _auth.jwtAuthRoute);
server.applyMiddleware({
  app: app,
  path: '/graphql'
});
app.listen({
  port: 8000
}, function () {
  return console.log('Apollo Server on http://localhost:8000/graphql');
});