import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { createIssue, deleteIssue, getIssue, getIssues, rejectIssue, resolveIssue, updateIssue } from "../controller/issue.control";
import { authorizeAdmin } from "../middlewares/authAdmin";

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

/**
* @swagger
* components:
*   schemas:
*     ResolvedIssue:
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
*           - resolverId
*           - resolveMessage
*           - resolveAt
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
*           example: Resolved
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
*         resolverId:
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         resolveMessage:
*           tyoe: string
*           example: 'Dear user, thank you for reporting. The issue has been resolved.'
*         resolveAt:
*           type: string
*           format: date-time
*           description: Datetime that user reported the issue
*           example: "2017-07-22T19:22:11Z"
*/

/**
* @swagger
* components:
*   schemas:
*     RejectedIssue:
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
*           - resolverId
*           - resolveMessage
*           - resolveAt
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
*           example: Rejected
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
*         resolverId:
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         resolveMessage:
*           tyoe: string
*           example: 'Dear user, please provide more information about this issue, thank you.'
*         resolveAt:
*           type: string
*           format: date-time
*           description: Datetime that user reported the issue
*           example: "2017-07-22T19:22:11Z"
*/

/**
* @swagger
* /issues:
*   get:
*     summary: "View all issues [Roles: Customer, Provider, Admin]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     responses:
*       200:
*         description: The list of issues (In case user is admin, all issues will be listed. Otherwise, only issues which this user reported will be listed)
*         content:
*           application/json:
*               schema:
*                 type: array
*                 items:
*                   $ref: '#/components/schemas/Issue'
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*/

router.get("/", authenticateToken, getIssues)

/**
* @swagger
* /issues/{id}:
*   get:
*     summary: "View specfic issue [Roles: Customer, Provider, Admin]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the issue
*     responses:
*       200:
*         description: The specific issue
*         content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/Issue'
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: You don't have permission to view this issue
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "You don't have permission to view this issue"
*       404:
*         description: The issue with the provided issue ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No issue found"
*/

router.get("/:issueId", authenticateToken, getIssue)

/**
* @swagger
* /issues:
*   post:
*     summary: "Create issue [Roles: Customer, Provider]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       type:
*                           type: string
*                           enum: [Technical, Account, Content, Payment, Security, Suggestion, Other]
*                           example: Technical
*                       title:
*                           type: string
*                           example: Skill Issue
*                       description:
*                           type: string
*                           example: "I have skill issue, help me!"
*                       images:
*                           type: array
*                           items:
*                               tyoe: string
*                           optional: true
*                           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*     responses:
*       201:
*         description: The issue information
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Issue'
*       400:
*         description: The request body is invalid
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 400
*                       message:
*                           type: string
*                           example: "Bad Request"
*                       error:
*                           type: string
*                           example: "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"array\",\n    \"received\": \"string\",\n    \"path\": [\n      \"images\"\n    ],\n    \"message\": \"Expected array, received string\"\n  }\n]"
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: You don't have permission to report an issue
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "Admin cannot report the issue"
*     
*/

router.post("/", authenticateToken, createIssue)

/**
* @swagger
* /issues/{id}:
*   put:
*     summary: "Update issue [Roles: Customer, Provider]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the issue
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       type:
*                           type: string
*                           enum: [Technical, Account, Content, Payment, Security, Suggestion, Other]
*                           optional: true
*                           example: Technical
*                       title:
*                           type: string
*                           optional: true
*                           example: Skill Issue
*                       description:
*                           type: string
*                           optional: true
*                           example: "I have skill issue, help me!"
*                       images:
*                           type: array
*                           items:
*                               tyoe: string
*                           optional: true
*                           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*     responses:
*       200:
*         description: The updated issue
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Issue'
*       400:
*         description: The request body is invalid
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 400
*                       message:
*                           type: string
*                           example: "Bad Request"
*                       error:
*                           type: string
*                           example: "[\n  {\n    \"expected\": \"'Technical' | 'Account' | 'Content' | 'Payment' | 'Security' | 'Suggestion' | 'Other'\",\n    \"received\": \"number\",\n    \"code\": \"invalid_type\",\n    \"path\": [\n      \"type\"\n    ],\n    \"message\": \"Expected 'Technical' | 'Account' | 'Content' | 'Payment' | 'Security' | 'Suggestion' | 'Other', received number\"\n  }\n]"
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: You don't have permission to edit this issue
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "You don't have permission to edit this issue"
*       404:
*         description: The issue with the provided issue ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No issue found"
*     
*/

router.put("/:issueId", authenticateToken, updateIssue)

/**
* @swagger
* /issues/{id}:
*   delete:
*     summary: "Delete issue [Roles: Customer, Provider]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the issue
*     responses:
*       200:
*         description: Message shown successful delete operation
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 200
*                       message:
*                           type: string
*                           example: "OK"
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: You don't have permission to delete this issue
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "You don't have permission to delete this issue"
*       404:
*         description: The issue with the provided issue ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No issue found"
*     
*/

router.delete("/:issueId", authenticateToken, deleteIssue)

/**
* @swagger
* /issues/{id}/resolve:
*   put:
*     summary: "Resolve specific issue [Roles: Admin]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the issue
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       resolveMessage:
*                           type: string
*                           example: "Dear user, this issue has been resolved. Thank you for reporting."
*     responses:
*       200:
*         description: The updated issue
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/ResolvedIssue'
*       400:
*         description: The request body is invalid
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 400
*                       message:
*                           type: string
*                           example: "Bad Request"
*                       error:
*                           type: string
*                           example: "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"resolveMessage\"\n    ],\n    \"message\": \"Required\"\n  }\n]"
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: This issue have already been resolved or rejected
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "This issue had already been resolved or rejected"
*       404:
*         description: The issue with the provided issue ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No issue found"
*     
*/

router.put("/:issueId/resolve", authenticateToken, authorizeAdmin, resolveIssue)

/**
* @swagger
* /issues/{id}/reject:
*   put:
*     summary: "Reject specific issue [Roles: Admin]"
*     tags: [Issue]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the issue
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       resolveMessage:
*                           type: string
*                           example: "Dear user, please provide more information about issue and send again, thank you."
*     responses:
*       200:
*         description: The updated issue
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/RejectedIssue'
*       400:
*         description: The request body is invalid
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 400
*                       message:
*                           type: string
*                           example: "Bad Request"
*                       error:
*                           type: string
*                           example: "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"resolveMessage\"\n    ],\n    \"message\": \"Required\"\n  }\n]"
*       401:
*         description: You have not logged in
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 401
*                       message:
*                           type: string
*                           example: "Unauthorized"
*       403:
*         description: This issue have already been resolved or rejected
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "This issue had already been resolved or rejected"
*       404:
*         description: The issue with the provided issue ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No issue found"
*     
*/

router.put("/:issueId/reject", authenticateToken, authorizeAdmin, rejectIssue)


export default router