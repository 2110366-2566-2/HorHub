import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import mailRouter from "./routes/mail.routes";
import testRouter from "./routes/test.routes";
import authRouter from "./routes/auth.routes";

import { db } from "./lib/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

app.use('/', testRouter);

app.use('/api',mailRouter);

app.use('/api',authRouter);

app.use(express.json());
//app.use(express.urlencoded());



/*
LOGIN
*/

const loginMiddleware = (req : Request,res : Response,next : NextFunction) => {
  if (req.body.username === "admin" && req.body.password === "1234")
    next();
  else
    res.send("Wrong username or password");
}

app.get("/", async (req: Request, res: Response) => {
  const tmp = await db.$queryRaw`SELECT * FROM "User"`;
  console.log(tmp);
  res.send("Hello, this is backend!");
});

app.post("/login",loginMiddleware,(req : Request,res : Response) => {
    const payload = {
      user : req.body.username,
      iat : new Date().getTime()
    };
    res.send("Login");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});




module.exports = app;