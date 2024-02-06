import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from 'bcrypt';

const Schema_User = z.object({
    "email" : z.string().email(),
    "password" : z.string(),
});

const router = Router();

router.use(express.json());

const login = async (req : Request, res : Response) => {
    const {email, password} = req.body;
    const user = await db.user.findUnique({
        where : {
            email : email
        }
    });
    if (!user){
        return res.status(400).send("Invalid User");
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch){
        return res.status(400).send("Invalid User");
    }

    console.log("Matched");

    
    return res.status(200).send("Logged in");


}


const register = async (req : Request,res : Response) => {
    const data = req.body;
    const user = Schema_User.safeParse(data);
    if (!user.success){
        res.status(400).send("Fail parsing");
        return;
    }
    const {email,password} = user.data;

    //check whether user existed or not
    const user_finder = await db.user.count({
        where : {
            email : email
        }
    })
    if(user_finder != 0) {
        res.status(204).send("User is already existed!");
        return;
    }

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    
    console.log(hashedPassword);
    
    const result = await db.user.create({data : {
        email : email,
        password : hashedPassword,
    }});
    console.log(result);
    res.send("success");
    

};

router.post('/register',register);

router.post('/login',login);

export default router;