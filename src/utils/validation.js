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

const validateEditProfileData = (req)=>{
    const allowedEditFields =["firstName","lastName","emailId","gender","age","about","photoUrl","skills"];
    const iseditAllowed = Object.keys(req.body).every((field)=>
       allowedEditFields.includes(field)
      );
      return iseditAllowed ;
}

module.exports  ={
    validateSignupData,
    validateEditProfileData,
};