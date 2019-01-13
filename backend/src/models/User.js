import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';

import Role from "./Role";
import Trip from "./Trip";
import {JWT_SECRET, saltRounds} from "../config/auth";


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: function() { return this.facebookProvider === null } },
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
    facebookProvider: {type: {id: String, token: String}, select: false},
}, {collection:'User'});


UserSchema.plugin(uniqueValidator, { message: '{PATH} is already in use' });


UserSchema.statics.hashPassword = async function (opts) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(opts.password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash)
        });
    });
};

UserSchema.statics.findByLogin = async function (opts) {
    const user = await this.findOne({email: opts.email});

    return await new Promise((resolve, reject) => {
        return bcrypt.compare(opts.password, user.password, function (err, res) {
            if (err) reject(err);
            else if (res) resolve(user);
            else reject();
        });
    });
};

UserSchema.statics.upsertFacebookUser = async function(accessToken, refreshToken, profile) {
    const user = await this.findOne({'facebookProvider.id': profile.id});

    if (!user) {
        // Check if user already has profile
        const user = await this.findOne({email: profile.emails[0].value});

        if(user) {
            user.set({facebookProvider: {
                id: profile.id,
                token: accessToken
            }});
            await user.save();
            return user;
        } else {
            return await this.create({
                firstName: profile.first_name,
                lastName: profile.last_name,
                email: profile.emails[0].value,
                facebookProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });
        }
    } else {
        return user;
    }
};

UserSchema.statics.findByToken = async function ({token}) {
    return await new Promise((resolve, reject) => {
        return jwt.verify(token, JWT_SECRET, async (err, result) => {
            if (err) reject(err);
            else if (result) resolve(await this.findOne({email: result.user.email}));
            else reject();
        });
    });
};

UserSchema.methods.hasRole = async function (role) {
    for(let userRoleId of this.roles) {
        const userRole = await Role.findById(userRoleId);

        if (userRole.name.toLowerCase() === role.toLowerCase()) {
            return true;
        }
    }

    return false;
};

UserSchema.pre('remove', function(next) {
    Trip.remove({createdBy: this._id}).exec();
    next();
});

export default mongoose.model('User', UserSchema);