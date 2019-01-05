import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import {JWT_SECRET} from "../config/auth";
import User from "../models/User";

const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

const jwtAuthStrategy = new JWTStrategy(params, async (payload, done) => {
    try {
        const user = (await User.findById(payload.user._id)) || null;
        return done(null, user);
    } catch(error) {
        done(error);
    }
});

export default jwtAuthStrategy;