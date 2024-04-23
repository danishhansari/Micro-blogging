import passport from "passport";
import { Strategy as GoogleStretegy } from "passport-google-oauth20";

passport.use(
  new GoogleStretegy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile.id);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

const initialize = passport.initialize();
const session = passport.session();
export { initialize, session };
