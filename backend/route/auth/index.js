import { Router } from "express";
import googleRoute from "./google.auth.js";
import twitterRoute from "./twitter.auth.js";
import facebookRoute from "./facebook.auth.js";

const router = Router();

router.use("/google", googleRoute);
router.use("/twitter", twitterRoute);
router.use("/facebook", facebookRoute);

export default router;
