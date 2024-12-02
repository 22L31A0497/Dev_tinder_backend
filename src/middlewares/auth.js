const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Error } = require("mongoose");

const userAuth = async(req,res,next) =>{

    try{
        const cookies = req.cookies;
    const {token} = req.cookies;

    const decodedObj = await jwt.verify(token,"J@gan2004$");
    const {_id} = decodedObj;
    const user  = await User.findById(_id);
    if(!user){
        throw new Error("User not found")
    }
    req.user =user
    next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }


};
module.exports ={
    userAuth,
};