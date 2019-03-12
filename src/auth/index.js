import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../db/models";

export default app => {
  const {
    NODE_ENV,
    SESSION_LIFETIME = 1000 * 60 * 60 * 2, // 2 hours
    SESSION_NAME,
    SESSION_SECRET
  } = process.env;

  const IN_PROD = NODE_ENV === "production";

  // SESSION
  const MongoStore = connectMongo(session);
  app.use(
    session({
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      name: SESSION_NAME,
      secret: SESSION_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESSION_LIFETIME),
        sameSite: false,
        secure: IN_PROD
      }
    })
  );

  // PASSPORT
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user || !(await user.verifyPassword(password)))
          done(null, false, { message: "Incorrect email or password" });

        return done(null, user);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export function auth(req, res, next) {
  if (req.user) next();
  else {
    next({
      name: "Unauthorized",
      message: "You are not authorized to perform this action"
    });
  }
}

export function guest(req, res, next) {
  if (req.user)
    next({
      name: "AlreadySignedIn",
      message: "You are already signed in"
    });
  else {
    next();
  }
}
