import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    //const authHeader = req.headers['authorization']
    const {auth} = req.cookies
    const token = auth;

    if (token == null) return res.redirect(401,"/login");

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, async (err: any, user: any) => {
        // console.log(err)
        if(err && token) {
            
            // console.log("Called!");
            res.clearCookie("auth");
        }
        if (err) return res.redirect(403,'/login');

        const userQuery = await db.user.findUnique({
            where: {
                id: user.id
            }
        })
    
        if (!user) {
            res.redirect(403,'/login');
            return
        }
    
        req.body.user = {
            ...userQuery,
            ...user
        }

        next()
    })
}