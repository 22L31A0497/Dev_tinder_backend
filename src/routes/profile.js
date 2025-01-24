const express = require("express");
const connectDB = require("../config/database");
const { Error } = require("mongoose");
const errors = require("validators/lib/errors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const profileRouter = express.Router();

const {validateEditProfileData}= require("../utils/validation");

profileRouter.use(cookieParser());

profileRouter.get(("/profile/view"),userAuth,async(req,res)=>{
    try{
     const cookies = req.cookies;
     const {token} = cookies;
     if(!token){
         throw new Error("Invalid token");
     }
     //validating token 
     const decodedMessage = await jwt.verify(token, "J@gan2004$");
     const { _id } = decodedMessage;
 
     console.log("LoggedIn User is"+ _id);
     const user = req.user;
     if(!user){
         throw new Error("User not exist")
     }
     res.send(user);
 
     
     console.log(cookies); 
    }
    catch (err) {
     res.status(400).send("Error : "+ err.message);
 }
 });


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");

        }
        const LoggedInuser = req.user;
        console.log(LoggedInuser);

        Object.keys(req.body).forEach((key)=>(LoggedInuser[key]=req.body[key]));
        await LoggedInuser.save();
        console.log(LoggedInuser);
        res.send(`${LoggedInuser.firstName}, Your profile updated successfully`);

    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);

    }
});




 module.exports=profileRouter;