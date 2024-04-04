import { Router } from "express";
import { deleteReview, getReview, updateReview } from "../controller/review.control";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";

const router = Router()

/**
* @swagger
* components:
*   schemas:
*     Review:
*       type: object
*       required:
*           - id
*           - customerId
*           - dormId
*           - rating
*           - description
*           - images
*           - reviewAt
*       properties:
*         id:
*           type: string
*           description: ID of the review
*           example: '194638c38ab20d7601f74e8294'
*         customerId:
*           description: ID of the customer who reviewed
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         dormId:
*           description: ID of the dorm where is reviewed
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         rating:
*           description: Rating score
*           type: integer
*           minimum: 1
*           maximum: 5
*           example: 3
*         description:
*           type: string
*           description: Description of this review
*           example: "This is very good"
*         images:
*           type: array
*           description: Array of image links
*           items:
*               tyoe: string
*           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*         reviewAt:
*           type: string
*           format: date-time
*           description: Date and time that the customer reviewed
*           example: "2017-07-21T17:32:28Z"
*/

/**
* @swagger
* /reviews/{id}:
*   get:
*     summary: "Get review from review ID"
*     tags: [Review]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the review
*     responses:
*       200:
*         description: The review information   
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Review'
*       404:
*         description: The review is invalid
*     
*/

router.get("/:reviewId", getReview)

/**
* @swagger
* /reviews/{id}:
*   put:
*     summary: "Update review from review ID [Roles: Customer]"
*     tags: [Review]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the review
*     requestBody:
*         required: true
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     properties:
*                         rating:
*                             type: integer
*                             optional: true
*                             minimum: 1
*                             maximum: 5
*                             example: 3
*                         description:
*                             type: string
*                             optional: true
*                             example: "This dorm is very good bro!"
*                         images:
*                             type: array
*                             items:
*                                 tyoe: string
*                             optional: true
*                             example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*     responses:
*       200:
*         description: The review information   
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Review'
*       400:
*         description: The request body is invalid
*       401:
*         description: Unauthorized
*       403:
*         description: There is no access to manage this review
*       404:
*         description: The review is invalid
*     
*/

router.put("/:reviewId", authenticateToken, authenticateCustomer, updateReview)

/**
* @swagger
* /reviews/{id}:
*   delete:
*     summary: "Delete review from review ID [Roles: Customer]"
*     tags: [Review]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the review
*     responses:
*       200:
*         description: The review information   
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Review'
*       401:
*         description: Unauthorized
*       403:
*         description: There is no access to manage this review
*       404:
*         description: The review is invalid
*     
*/

router.delete("/:reviewId", authenticateToken, authenticateCustomer, deleteReview)


export default router