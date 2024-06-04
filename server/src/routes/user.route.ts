import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);

export default userRoutes;
