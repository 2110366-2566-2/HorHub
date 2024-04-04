import { NextFunction, Request, Response } from "express";
import generateStatusResponse from "../lib/statusResponseGenerator";

// For checking if user has "Customer" permission, user after authenticateToken
export function authorizeCustomer(req: Request, res: Response, next: NextFunction) {
    if (!req.body.user) {
        return res.status(403).send(generateStatusResponse(403, 'This account is not customer'))
    }

    if (!(req.body.user.role === "Customer")) {
        return res.status(403).send(generateStatusResponse(403, 'This account is not customer'))
    }

    next()

}