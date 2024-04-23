import { Router } from "express";
import googleRoute from "./google.auth.js";

const router = Router();

router.use("/google", googleRoute);

export default router;
