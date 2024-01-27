import express, { Express, Request, Response } from "express";
import send_mail from "./lib/mail_sender";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
//app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript server");
});

app.get('/api/email',(req : Request, res : Response) => {
  res.send("Email sender");
});

app.post("/api/email",send_mail);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;