const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // Ensure first name is mandatory
    },
    lastName: {
        type: String,
        required: true, // Ensure last name is mandatory
    },
    emailId: {
        type: String,
        required: true, // Email is mandatory
        unique: true, // No duplicate emails
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Email format validation
    },
    password: {
        type: String,
        required: true, // Password is mandatory
        minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
    },
    age: {
        type: Number,
        min: [0, "Age cannot be negative"], // Optional validation for age
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // Restrict values for gender
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
