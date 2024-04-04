import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { createIssue } from "../controller/issue.control";

const router = Router()

/**
* @swagger
* components:
*   schemas:
*     Issue:
*       type: object
*       required:
*           - id
*           - userId
*           - type
*           - status
*           - title
*           - description
*           - images
*           - reportAt
*       properties:
*         id:
*           type: string
*           description: ID of the issue
*           example: '194638c38ab20d7601f74e8294'
*         userId:
*           description: ID of the user who reported
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         type:
*           description: Type of the issue
*           type: string
*           enum: [Technical, Account, Content, Payment, Security, Suggestion, Other]
*           example: Technical
*         status:
*           description: Status of the issue
*           type: string
*           enum: [Waiting, Resolved, Rejected]
*           example: Waiting
*         title:
*           type: string
*           description: Title of the issue
*           example: Skill Issue
*         description:
*           type: string
*           description: Description of this issue
*           example: "I have skill issue, help me!"
*         images:
*           type: array
*           description: Array of image links
*           items:
*               tyoe: string
*           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*         reportedAt:
*           type: string
*           format: date-time
*           description: Datetime that user reported the issue
*           example: "2017-07-21T17:32:28Z"
*/


router.post("/", authenticateToken, createIssue)


export default Router