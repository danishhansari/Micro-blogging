import { Router } from "express";
import authRouter from "./auth/index.js";
const router = Router();

router.get("/", (req, res, next) => {
  res.json({ user: req.user });
});
router.use("/auth", authRouter);

export default router;
