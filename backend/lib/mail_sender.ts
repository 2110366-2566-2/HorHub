import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import z from 'zod';

const Schema_DataSender = z.object({
    "from" : z.string().email("Invalid email in section from"),
    "to" : z.string().email("Invalid email in section to"),
    "subject" : z.string().min(1,{message : "There is no subject in this form"}),
    "text" : z.string().optional().or(z.literal('')),
    "html" : z.string().optional().or(z.literal(''))
});

const MAIL_PORT = Number(process.env.MAIL_PORT || 465);

type DataSender = z.infer<typeof Schema_DataSender>;

const sender = async (data : DataSender) =>{
    const transporter = nodemailer.createTransport({
      service:"gmail",
      port: MAIL_PORT,               // true for 465, false for other ports
      host: "smtp.gmail.com",
         auth: {
              user: process.env.HOST_USER,
              pass: process.env.HOST_PASSWORD,
           },
      secure: true,
    });
    transporter.sendMail(data,(err,info)=>{
        if(err){
          console.log(err);
        }
        else {
          return info.response;
        }
    });};


export {sender , DataSender, Schema_DataSender};