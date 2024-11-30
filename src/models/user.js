const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength:4, // Ensure first name is mandatory
    },
    lastName: {
        type: String,
        required: true, // Ensure last name is mandatory
    },
    emailId: {
        type: String,
        required: true, // Email is mandatory
        unique: true, // No duplicate emails
        lowercase:true,
        trim : true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email format validation
    },
    password: {
        type: String,
        required: true, // Password is mandatory
        minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
    },
    photoURL :{
        type : String,
        default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s",
    },
    about:{
        type : String,
        default :"this is the defult value of the user",

    },
    skills :{
        type : [String],
    },
    age: {
        type: Number,
        min: [18, "Age cannot be less than 18 years"],
        required:true, // Optional validation for age
    },
    gender: {
        type: String,
        lowercase : true,
        enum: ["male", "female", "other"], // Restrict values for gender
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
},{
    timestamps : true,
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
