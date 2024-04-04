import { User } from "@prisma/client";
import { Request, Response } from "express";
import generateStatusResponse from "../lib/statusResponseGenerator";
import { z } from "zod";
import { issueTypes } from "../lib/constant";
import { db } from "../lib/db";


const createIssueSchema = z.object({
    type: z.enum(issueTypes),
    title: z
        .string()
        .trim()
        .min(1, { message: "Please fill title" }),
    description: z
        .string()
        .trim()
        .min(1, { message: "Please fill description" }),
    images: z
        .string()
        .array()
        .max(10, { message: "The images must not exceed 10 files" })
        .optional(),    
})

//=============================================================================

//@desc     Create reported issue
//@route    POST /issues
//@access   Private

export const createIssue = async (req: Request, res: Response) => {
    const user: User = req.body.user
    const body = req.body

    try {
        if (user.role === "Admin") {
            return res.status(403).send(generateStatusResponse(403, "Admin cannot report the issue"))
        }

        const parseStatus = createIssueSchema.safeParse(body);
        if (!parseStatus.success) console.log(parseStatus.error.issues);
        if (!parseStatus.success) return res.status(400).send(generateStatusResponse(400, parseStatus.error.message));

        const parsedBody = parseStatus.data;

        const issueRes = await db.issue.create({
            data: {
                userId: user.id,
                ...parsedBody
            }
        })

        return res.status(201).send(issueRes)
        
    } catch (err) {
        return res.status(400).send(generateStatusResponse(400, err))
    }
}