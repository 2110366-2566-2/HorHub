import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { DataSender, Schema_DataSender, sender } from "../lib/mail_sender";


const router = Router()

router.post("/emails/send",async (req : Request,res : Response) => {
    const {from,to,subject,text} = req.body;

    const data = {
        "from" : from,
        "to" : to,
        "subject" : subject,
        "text" : text
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