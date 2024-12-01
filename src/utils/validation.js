const { Error } = require("mongoose");
const validator = require("validator");


const validateSignupData = (req) =>{
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid !");        
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password ")
    }

    
};

module.exports  ={
    validateSignupData,
};