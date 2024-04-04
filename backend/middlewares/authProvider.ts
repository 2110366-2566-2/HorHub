import { NextFunction, Request, Response } from "express";

/** For checking if user has "Provider" permission, user after authenticateToken*/
export function authorizeProvider(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.user) {
    return res.status(403).send("This account is not provider");
  }

  if (!(req.body.user.role === "Provider")) {
    return res.status(403).send("This account is not provider");
  }

  next();
}
