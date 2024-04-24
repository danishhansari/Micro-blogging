import passport from "passport";
import { Strategy as GoogleStretegy } from "passport-google-oauth20";
import { Strategy as TwitterStretegy } from "passport-twitter";
import { Strategy as FacebookStretegy } from "passport-facebook";
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

passport.use(
  new TwitterStretegy(
    {
      consumerKey: process.env.twitterClientKey,
      consumerSecret: process.env.twitterClientSecret,
      callbackURL: "/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      User.findOrCreate({ twitterId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new FacebookStretegy(
    {
      clientID: process.env.facebookAppID,
      clientSecret: process.env.facebookAppSecret,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // const data = {
      //   name: profile.name,
      //   email: profile.email,
      // };
      // User.findOne({
      //   email: profile.email,
      // })
      //   .then((existingUser) => {
      //     if (existingUser) {
      //       console.log("Existing Email");
      //       return done(null, existingUser);
      //     }
      //     const user = new User(data);
      //     user
      //       .save()
      //       .then((user) => {
      //         console.log("User register");
      //         return done(null, user);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
