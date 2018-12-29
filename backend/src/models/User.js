import jwt from 'jsonwebtoken';
import {JWT_SECRET, saltRounds} from "../config/auth";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import Role from "./Role";

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
}, {collection:'User'});

userSchema.plugin(uniqueValidator);


userSchema.statics.hashPassword = async function (opts) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(opts.password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash)
        });
    });
};

userSchema.statics.findByLogin = async function (opts) {
    const user = await this.findOne({email: opts.email});

    return await new Promise((resolve, reject) => {
        return bcrypt.compare(opts.password, user.password, function (err, res) {
            if (err) reject(err);
            else if (res) resolve(user);
            else reject();
        });
    });
};

userSchema.statics.findByToken = async function (opts) {
    return await new Promise((resolve, reject) => {
        return jwt.verify(opts.token, JWT_SECRET, async (err, result) => {
            if (err) reject(err);
            else if (result) resolve(await this.findOne({email: result.email}));
            else reject();
        });
    });
};

userSchema.methods.hasRole = async function (role) {
    for(let userRoleId of this.roles) {
        const userRole = await Role.findById(userRoleId);

        if (userRole.name.toLowerCase() === role.toLowerCase()) {
            return true;
        }
    }

    return false;
};

export default mongoose.model('User', userSchema);