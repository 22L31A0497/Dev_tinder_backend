const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { Error } = require("mongoose");
const app = express();
const {validateSignupData} = require("./utils/validation");
const  bcrypt = require("bcrypt");
const errors = require("validators/lib/errors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.post("/login",async(req,res)=>{
    
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
app.post("/signup", async (req, res) => {
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

app.get(("/profile"),userAuth,async(req,res)=>{
   try{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        throw new Error("Invalid token");
    }
    //validating token 
    const decodedMessage = await jwt.verify(token, "J@gan2004$");
    const { _id } = decodedMessage;

    console.log("LoggedIn User is"+ _id);
    const user = req.user;
    if(!user){
        throw new Error("User not exist")
    }
    res.send(user);

    
    console.log(cookies);
   }
   catch (err) {
    res.status(400).send("Error : "+ err.message);
}
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
   try{
    const user = req.user;
    res.send(user.firstName +" sent the request to you");

   }

   catch{
   };
})
 
 
app.get("/users", async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId:userEmail});
        if(users.length === 0){
            res.status(404).send("👤user not found boss 🤦‍♂️");
        }
        else{
            res.send(users);
        }

    }
    catch(err){
        res.status(400).send("Something went wrong Boss");
        
    }

});

 app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);

    }
    catch(err){
        res.status(400).send("Something went wrong Boss");
        
    }


  });

  app.delete("/user", async(req,res)=>{

    const userId = req.body._Id;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong Boss");
    }
  })

  app.patch("/patch", async(req,res)=>{
    const userId = req.body._id;
    const data = req.body;
    
    try{
        // const Allowed_Updates = [
        //     "photoURL","age","about","skills",
        // ];
    
        // const IsAllowed_updates = Object.keys(data).every((k)=>
        // Allowed_Updates.includes(k));
        
        // if (!IsAllowed_updates){
        //     throw new Error("Updaate is not allowed")
        // }
        await User.findByIdAndUpdate({_id: userId }, data);
        res.send("user updated successfully");

    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
  })

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
