import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)
    
        req.body.user = user

        next()
    })
}