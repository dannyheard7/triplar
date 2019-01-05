import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/User";

export const localStrategyLogin = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async function (email, password, done) {
    try {
        const user = await User.findByLogin({email, password});
        if (user) return done(null, user);
    } catch (e) {
        console.log(e.message);
    }

    return done(null, false, {message: 'Incorrect email or password.'});
});

