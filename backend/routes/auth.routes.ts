import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from 'bcrypt';

const Schema_User = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
    firstName: z.string().trim().min(1, {message: 'Fill your first name'}),
    lastName: z.string().trim().min(1, {message: 'Fill your last name'}),
    displayName: z.string().trim().min(1, {message: 'Fill display name'}),
    phoneNumber: z.string().trim().length(10, {message: 'Please fill valid phone number'})
                  .refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid phone number'}),
    birthDate: z.coerce.date().refine((data) => data < new Date(), { message: "Future date is not accepted" }),
    gender: z.string({invalid_type_error: 'Please select gender'}).trim().min(1, {message: 'Please select gender'})
                .refine((data) => ["Male", "Female", "Other"].includes(data), {message: "This gender is not available"}),
    role: z.string({invalid_type_error: 'Please select role'}).trim().min(1, {message: 'Please select role'})
                .refine((data) => ["Customer", "Provider"].includes(data), {message: "This role is not available"})
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
        res.status(400).send("User is already existed!");
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