const express = require("express");
const connectDB = require("../config/database");
const { Error } = require("mongoose");
const app = express();
const errors = require("validators/lib/errors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../middlewares/auth");
const user = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
     const fromUserId = req.user._id;
     const toUserId = req.params.toUserId;
     const status = req.params.status;

     const allowedStatus = ["interested","ignored"];
     if(!allowedStatus.includes(status)){
        return res.status(400).json({message :"Nuvvu send chesindi Invalid status 😈dont play with me ☠️ :" + status});

     }

     //touser is not in our data base oor not the user of the our app then how to find is ?
     const toUser =await User.findById(toUserId);

     if(!toUser){
        return res.status(404).json({
           message:";🤦‍♂️🤦 the Alien ur sending request that is not present in our data base"
        });
     }
   // if there is an existing connection request

   const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId : toUserId,toUserId:fromUserId},
    ],
   });

  

   if(existingConnectionRequest){
    return res.status(400).send({message:"Connection Request is Already Exists !"});

   }



     const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
     });
     const data = await connectionRequest.save();
     res.json({
        message: "connection request successfully send",
        data,
     });

    }
 
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    };
 })

 module.exports = requestRouter; 

