import FacebookTokenStrategy from 'passport-facebook-token';

import User from "../models/User";
import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from "../config/auth";

export const facebookLoginStrategy = new FacebookTokenStrategy({clientID: FACEBOOK_APP_ID, clientSecret: FACEBOOK_APP_SECRET},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.upsertFacebookUser(accessToken, refreshToken, profile);
            if (user) return done(null, user);
        } catch (e) {
            console.log(e.message);
            return done(e, null);
        }

        return done(null, null, {message: 'Something went wrong.'});
    }
);