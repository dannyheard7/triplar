import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import {JWT_SECRET} from "../config/auth";
import User from "../models/User";
import {RestError} from "../utils/errors";

const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

const jwtAuthStrategy = new JWTStrategy(params, async (payload, done) => {
    try {
        const user = (await User.findById(payload.user._id)) || null;
        return done(null, user);
    } catch(error) {
        return done(new RestError('Expired token.', 400));
    }
});

export default jwtAuthStrategy;