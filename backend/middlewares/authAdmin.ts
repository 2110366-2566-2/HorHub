import { NextFunction, Request, Response } from "express";
import generateStatusResponse from "../lib/statusResponseGenerator";

// For checking if user has "Admin" permission, user after authenticateToken
export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.body.user) {
        return res.status(403).send(generateStatusResponse(403, 'This account is not admin'))
    }

    if (!(req.body.user.role === "Admin")) {
        return res.status(403).send(generateStatusResponse(403, 'This account is not admin'))
    }

    next()

}