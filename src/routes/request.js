const express = require("express");
const connectDB = require("../config/database");
const { Error } = require("mongoose");
const app = express();
const errors = require("validators/lib/errors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try{
     const user = req.user;
     res.send(user.firstName +" sent the request to you");
 
    }
 
    catch{
    };
 })

 module.exports = requestRouter; 