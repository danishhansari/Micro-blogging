import { Router } from "express";
import {
  getSessionsHandler,
  deleteSessionHandler,
} from "../controllers/session.controller";

const sessionRoute = Router();

sessionRoute.get("/", getSessionsHandler);
sessionRoute.delete("/:id", deleteSessionHandler);

export default sessionRoute;
