const express = require("express");

const app = express();

// Home page
app.get("/", (req, res) => {
    res.send("This is the home page");
});

// Jagan page
app.get("/jagan", (req, res) => {
    res.send("This is the Jagan page");
});

// Test page
app.get("/test", (req, res) => {
    res.send("This is the test page");
});

// Start the server
app.listen(6969, () => {
    console.log("Boss 😎 Your 6969 😜 Server is running very fast. Don't try to catch 🤣");
});
