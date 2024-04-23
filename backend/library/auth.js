import passport from "passport";
import { Strategy as GoogleStretegy } from "passport-google-oauth20";
import User from "../models/user.models.js";

passport.use(
  new GoogleStretegy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const data = {
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      User.findOne({
        email: data.email,
      })
        .then((existingUser) => {
          if (existingUser) {
            console.log("Existing Email");
            return done(null, existingUser);
          }
          const user = new User(data);
          user
            .save()
            .then((user) => {
              console.log("User register");
              return done(null, user);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const initialize = passport.initialize();
const session = passport.session();
export { initialize, session };
