import { NextFunction, Request, Response } from "express";

// For checking if user has "Customer" permission, user after authenticateToken
export function authenticateCustomer(req: Request, res: Response, next: NextFunction) {
    if (!req.body.user) {
        return res.status(403).send('This account is not customer')
    }

    if (!(req.body.user.role === "Customer")) {
        return res.status(403).send('This account is not customer')
    }

    next()

}