import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/callback", passport.authenticate("google"), (req, res, next) => {
  res.json({ user: req.user });
  next();
});

export default router;
