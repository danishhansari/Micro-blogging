import { Router } from "express";
import authRoute from "./auth/index.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({ user: req.user });
});
router.use("/auth", authRoute);

export default router;
