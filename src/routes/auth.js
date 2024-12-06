const connectDB = require("../config/database")
const { Error } = require("mongoose");

const errors = require("validators/lib/errors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const { validateSignupData } = require("../utils/validation");

const User = require("../models/user");

const bcrypt = require("bcrypt");
const express = require("express");
const authRouter = express.Router();
authRouter.use(cookieParser());
authRouter.post("/signup", async (req, res) => {
    //validation of data 
    //encrypt the password 
   
    try{
        validateSignupData(req);
        const{ firstName,lastName,emailId,age,gender, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const user = new User({
            firstName,
            lastName,
            emailId,
            age,
            gender,
            password:hashedPassword,
        });
        await user.save();

        // Respond with success
        res.status(201).send({ message: "User added successfully"});
    } catch (err) {
        res.status(400).send("Error : "+ err.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    
    try{
        const{_id,emailId ,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credintials");
        }
        const isPasswordValid = bcrypt.compare(password,user.password );
        if(isPasswordValid){
            const token = await jwt.sign({ _id: user._id }, "J@gan2004$", {expiresIn:"1d",});
            console.log(token);
            res.cookie("token",token);

            res.send("Login Successfull");
        }
        else if (!isPasswordValid){
            throw new Error("Invalid Credintials");
        }


    }
    catch(err){
        res.status(400).send("ERROR :" +err.message);
    }

});

// POST endpoint for user signup

authRouter.post("/logout",async(req,res)=>{

    //cleanup activites also may you can write here and expiring the cookies 
    
   res.cookie("token", null,{
    expires:new Date(Date.now()),
   });
   res.send("User Logout Successfully 🤦‍♂️🤦‍♂️😢");

})


module.exports=authRouter;