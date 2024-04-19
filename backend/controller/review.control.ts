import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { User } from "@prisma/client";
import generateStatusResponse from "../lib/statusResponseGenerator";


const updateReviewSchema = z.object({
    rating: z
      .number()
      .min(1, { message: "Rating should be between 1 to 5" })
      .max(5, { message: "Rating should be between 1 to 5" })
      .optional(),
    description: z
      .string()
      .trim()
      .min(1, { message: "Please fill description for the review" })
      .max(2048, { message: "Your description is too long" })
      .optional(),
    images: z
      .string()
      .array()
      .max(10, { message: "The images must not exceed 5 files" })
      .optional(),
  })

//======================================================================


//@desc     Get review by the review ID
//@route    GET /reviews/:reviewId
//@access   Private

export const getReview = async (req: Request, res: Response) => {
    const { reviewId } = req.params;

    try {

        if (reviewId.length != 24 || /[0-9A-Fa-f]{24}/g.test(reviewId) === false) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }
      
        const findReviewRes = await db.review.findUnique({
          where: {
            id: reviewId,
          },
        });

        if (!findReviewRes) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }

        return res.send(findReviewRes)

    } catch (err) {
        return res.status(404).send(generateStatusResponse(404, err))
    }
}

//@desc     Update review by the review ID
//@route    PUT /reviews/:reviewId
//@access   Private

export const updateReview = async (req: Request, res: Response) => {
    const { reviewId } = req.params;

    const user: User = req.body.user;
    const body = req.body

    try {
        const parseStatus = updateReviewSchema.safeParse(body);
        if (!parseStatus.success) console.log(parseStatus.error.issues);
        if (!parseStatus.success) return res.status(400).send(parseStatus.error.message);

        const parsedBody = parseStatus.data;

        if (reviewId.length != 24 || /[0-9A-Fa-f]{24}/g.test(reviewId) === false) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }
      
        const findReviewRes = await db.review.findUnique({
          where: {
            id: reviewId,
          },
        });

        if (!findReviewRes) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }

        if (findReviewRes.customerId !== user.id) {
            return res.status(403).send(generateStatusResponse(403, "You don't have access to manage this review"));
        }

        const updateReviewRes = await db.review.update({
            where: {
                id: reviewId
            },
            data: {
                ...parsedBody
            }
        })

        return res.send(updateReviewRes)

    } catch (err) {
        return res.status(400).send(generateStatusResponse(400, err))
    }
}

//@desc     Delete review by the review ID
//@route    DELETE /reviews/:reviewId
//@access   Private

export const deleteReview = async (req: Request, res: Response) => {
    const { reviewId } = req.params;

    const user: User = req.body.user;

    try {
        if (reviewId.length != 24 || /[0-9A-Fa-f]{24}/g.test(reviewId) === false) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }
    
        const findReviewRes = await db.review.findUnique({
          where: {
            id: reviewId,
          },
        });
    
        if (!findReviewRes) {
            return res.status(404).send(generateStatusResponse(404, "No review found"));
        }
    
        if (findReviewRes.customerId !== user.id && user.role !== "Admin") {
            return res.status(403).send(generateStatusResponse(403, "You don't have access to manage this review"));
        }

        const deleteReviewRes = await db.review.delete({
            where: {
                id: reviewId
            }
        })

        return res.send(generateStatusResponse(200))
    }
    catch (err) {
        return res.status(404).send(generateStatusResponse(404, err))
    }

    
}