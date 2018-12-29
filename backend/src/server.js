import express from 'express';
import {ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import cors from 'cors';
import resolvers from './resolvers';
import schema from './schema'
import {directiveResolvers} from "./directives/resolvers";
import {dbName, MONGO_PORT, MONGO_URL} from "./config/datastore";
import mongoose from "mongoose";
import User from "./models/User";


mongoose.set("debug", true);
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`);

const execSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
    directiveResolvers
});

const server = new ApolloServer({
    schema: execSchema,
    context: async({ req }) => {
        const bearerLength = "JWT ".length;

        let user = null;
        if (req.headers.authorization && req.headers.authorization.length > bearerLength) {
            const token = req.headers.authorization.slice(bearerLength);
            user = await User.findByToken({token});
        }

        return { req: req, user: user };
    },
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => console.log('Apollo Server on http://localhost:8000/graphql'));