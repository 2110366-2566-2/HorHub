import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { DataSender, Schema_DataSender, sender } from "../lib/mail_sender";
import { authenticateToken } from "../middlewares/authToken";
import { User } from "@prisma/client";


const router = Router()

router.post("/verification", authenticateToken, async (req: Request, res: Response) => {
    const user: User = req.body.user

    console.log(user)

    const data = {
        "from" : process.env.HOST_USER,
        "to" : user.email,
        "subject" : "HorHub - Verifying Account",
        "html" : `<h1>Welcome to HorHub, ${user.displayName}!</h1><p>Please verify your account by click <a href="http://localhost:3000/">this link</a></p>`
    }
    const data_parse = Schema_DataSender.safeParse(data);
    console.log(data)
    if(!data_parse.success) {
        const my_message : string[] = [];
        for (const mes of data_parse.error.errors){
            const message = mes.message;
            my_message.push(message);    
        } 
        return res.status(400).send({message : my_message.join("\nAnd ")});
    }
    const mail : DataSender = data_parse.data;
    const result = await sender(mail);
    res.send(result);

})

router.post("/send",async (req : Request,res : Response) => {
    const {to,subject,html} = req.body;

    const data = {
        "from" : process.env.HOST_USER,
        "to" : to,
        "subject" : subject,
        "html" : html,
    }
    const data_parse = Schema_DataSender.safeParse(data);
    if(!data_parse.success) {
        const my_message : string[] = [];
        for (const mes of data_parse.error.errors){
            const message = mes.message;
            my_message.push(message);    
        } 
        return res.status(400).send({message : my_message.join("\nAnd ")});
    }
    const mail : DataSender = data_parse.data;
    const result = await sender(mail);
    res.send(result);
    
});


export default router