import jwt from "jsonwebtoken";
import {JWT_EXPIRES, JWT_SECRET} from "../config/auth";
import User from '../models/User';
import Role from '../models/Role';

export default {
    Query: {
        users: async (parent, args, {user}) => {
            return await User.find();
        },
        user: async (parent, {id}) => {
            return await User.findById(id);
        },
        userInfo: async (parent, {token}) => {
            const user = await User.findByToken({token});
            user.jwt = token;
            return user;
        },
    },
    Mutation: {
        createUser: async (parent, {input}) => {
            const {firstName, lastName, email, password} = input;
            return await new User({
                firstName,
                email,
                lastName,
                password: await User.hashPassword({password}),
                roles: [await Role.findOneOrCreate({name: "User"})]
            }).save();
        },
    },
};