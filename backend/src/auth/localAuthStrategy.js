import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/User";
import {RestError} from "../utils/errors";

export const localStrategyLogin = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async function (email, password, done) {
    try {
        const user = await User.findByLogin({email, password});
        if (user) return done(null, user);
    } catch (e) {
        return done(new RestError('Incorrect email or password.', 400));
    }

    return done(new RestError('Incorrect email or password.', 400));
});

