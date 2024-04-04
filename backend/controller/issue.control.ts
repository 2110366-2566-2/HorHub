import { User } from "@prisma/client";
import { Request, Response } from "express";
import generateStatusResponse from "../lib/statusResponseGenerator";
import { z } from "zod";


const createIssueSchema = z.object({

})


export const createIssue = async (req: Request, res: Response) => {
    const user: User = req.body.user

    try {
        if (user.role === "Admin") {
            return res.status(403).send(generateStatusResponse(403, "Admin cannot report the issue"))
        }



        
    } catch (err) {
        return res.status(400).send(generateStatusResponse(400, err))
    }
}