import { Request, Response, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchErrors =
  (controllers: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controllers(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { catchErrors };
