import { Router } from "express";

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

export default router