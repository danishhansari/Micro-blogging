import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("facebook"));
router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res, next) {
    res.redirect("/");
    next();
  }
);

export default router;
