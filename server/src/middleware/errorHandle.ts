import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constant/http";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);
  return res.status(INTERNAL_SERVER_ERROR).json("Internal Server Error");
};

export { errorHandler };
