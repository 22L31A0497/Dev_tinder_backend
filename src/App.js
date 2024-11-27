const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// POST endpoint for user signup
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();

        // Respond with success
        res.status(201).send({ message: "User added successfully"});
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate email error
            res.status(400).send({ message: "Email already exists", error });
        } else {
            // Handle other errors
            console.error("Error creating user:", error.message);
            res.status(500).send({ message: "Server error", error });
        }
    }
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        console.log("Database connected");
        app.listen(6969, () => {
            console.log("Boss 😎 Your 6969 😜 Server is running very fast. Don't try to catch 🤣");
        });
    })
    .catch((err) => {
        console.error("Database not connected", err.message);
    });
