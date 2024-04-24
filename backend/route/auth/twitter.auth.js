import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("twitter"));
router.get(
  "/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res, next) {
    res.redirect("/");
    next();
  }
);

export default router;
