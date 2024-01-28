import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";

import testRouter from "./routes/test.routes"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

app.use('/', testRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is backend!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});