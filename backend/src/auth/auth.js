import passport from "passport/lib";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES, JWT_SECRET} from "../config/auth";
import jwtAuthStrategy from "./jwtAuthStrategy";
import {localStrategyLogin} from "./localAuthStrategy";
import {facebookLoginStrategy} from "./facebookAuthStrategy";

passport.use(jwtAuthStrategy);
passport.use('login', localStrategyLogin);
passport.use(facebookLoginStrategy);

passport.serializeUser( (user, done) => done(null, user._id));
export default passport;

export const loginRoute = (req, res) => {
    passport.authenticate('login', {session: false},  (err, user, info) => {
        if (err) return res.status(500).send(error);
        if (!user) return res.status(500).send(new Error("Could not find user"));

        req.login(user, {session: false}, (error) => {
            if (error) return res.status(500).send(error);
            const body = { _id : user._id, email : user.email };

            body.jwt = jwt.sign({user: body}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
            return res.json(body);
        });
    })(req,res)
};

export const facebookLoginRoute = (req, res) => {
    passport.authenticate('facebook-token', {session: false}, (err, user, info) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(500).send(new Error("Could not find user"));

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



