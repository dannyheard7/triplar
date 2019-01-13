import express from 'express';
import {ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import cors from 'cors';
import mongoose from "mongoose";
import winston from "winston";
import bodyParser from "body-parser";

import resolvers from './resolvers';
import schema from './schema'
import {directiveResolvers} from "./directives/resolvers";
import {MONGO_URL} from "./config/datastore";
import passport, {facebookLoginRoute, jwtAuthRoute, loginRoute} from "./auth/auth";
import logger from "./utils/logger";


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

mongoose.connect(MONGO_URL);

const execSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    directiveResolvers
});

const server = new ApolloServer({
    schema: execSchema,
    context: ({req}) => ({user: req.user}),
    debug: false,
    formatError: error => ({
        message: error.message,
        state: error.originalError && error.originalError.state,
        locations: error.locations,
        path: error.path,
    }),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.post('/login',  loginRoute);
app.post('/login/facebook',  facebookLoginRoute);
app.use('/graphql', jwtAuthRoute);

app.use(function(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.code);
    res.json({ error: { code: err.code, message: err.message } });
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => logger.info('Apollo Server on http://localhost:8000/graphql'));

