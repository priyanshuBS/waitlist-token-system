import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "/api/users/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            provider: "google",
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
