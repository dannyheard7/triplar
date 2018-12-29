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
            console.log("I am here")
            return await User.findById(id);
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
        tokenAuth: async (parent, args) => {
            const user = await User.findByLogin(args);
            user.jwt = jwt.sign({
                id: user._id,
                email: user.email
            }, JWT_SECRET, {expiresIn: JWT_EXPIRES});
            return user;
        },
        verifyToken: async (parent, args) => {
            const user = await User.findByToken(args);
            user.jwt = args.token;
            return user;
        },
    },
};