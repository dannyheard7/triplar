import {UserInputError} from "apollo-server-express";

import User from '../models/User';
import Role from '../models/Role';
import {convertMongooseValidationErrorToGraphqlValidationError} from "../utils/validationError";

export default {
    Query: {
        users: async (parent, args, {user}) =>  await User.find(),
        user: async (parent, {id}) => await User.findById(id),
        userInfo: async (parent, {token}) => {
            const user = await User.findByToken({token});
            user.jwt = token;
            return user;
        },
    },
    Mutation: {
        createUser: async (parent, {input}) => {
            const {firstName, lastName, email, password} = input;
            try {
                await new User({firstName, email, lastName, password: await User.hashPassword({password}),
                    roles: [await Role.findOneOrCreate({name: "User"})]}).save();
            } catch (e) {
                if(e.name === 'ValidationError') {
                    convertMongooseValidationErrorToGraphqlValidationError(e);
                } else {
                    throw new UserInputError(e.message);
                }
            }
        },
    },
};