import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { createIssue } from "../controller/issue.control";

const router = Router()


router.post("/", authenticateToken, createIssue)


export default Router