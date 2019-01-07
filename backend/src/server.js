import express from 'express';
import {ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import cors from 'cors';
import resolvers from './resolvers';
import schema from './schema'
import {directiveResolvers} from "./directives/resolvers";
import {MONGO_URL} from "./config/datastore";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport, {facebookLoginRoute, jwtAuthRoute, loginRoute} from "./auth/auth";

mongoose.connect(MONGO_URL);

const execSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    directiveResolvers
});

const server = new ApolloServer({
    schema: execSchema,
    context: ({req}) => ({user: req.user})
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

app.listen({port: 8000}, () => console.log('Apollo Server on http://localhost:8000/graphql'));