import passport from "passport/lib";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES, JWT_SECRET} from "../config/auth";
import jwtAuthStrategy from "./jwtAuthStrategy";
import {localStrategyLogin} from "./localAuthStrategy";
import {facebookLoginStrategy} from "./facebookAuthStrategy";
import {RestError} from "../utils/errors";

passport.use(jwtAuthStrategy);
passport.use('login', localStrategyLogin);
passport.use(facebookLoginStrategy);

passport.serializeUser( (user, done) => done(null, user._id));
export default passport;

export const loginRoute = (req, res, next) => {
    passport.authenticate('login', {session: false},  (err, user, info) => {
        if (err) next(err);
        if (!user) next(new RestError("Could not find user", 404));

        req.login(user, {session: false}, (error) => {
            if (error) next(error);
            const body = { _id : user._id, email : user.email };

            body.jwt = jwt.sign({user: body}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
            return res.json(body);
        });
    })(req,res,next)
};

export const facebookLoginRoute = (req, res) => {
    passport.authenticate('facebook-token', {session: false}, (err, user, info) => {
        if (err) next(err);
        if (!user) next(new RestError("Could not find user", 404));

        req.login(user, {session: false}, (error) => {
            if (error) return res.status(500).send(error);
            const body = { _id : user._id, email : user.email };

            body.jwt = jwt.sign({user: body}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
            return res.json(body);
        });
    })(req, res);
};


export const jwtAuthRoute = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (user) {
            req.user = user;
        }

        next();
    })(req, res, next)
};



