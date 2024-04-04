import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";

const router = Router()


router.post("/", authenticateToken)


export default Router