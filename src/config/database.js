const mongoose = require('mongoose');
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://jaganmohanraokuna2004:7GPUXZVfXkzEaWPV@namasthenodejs.oz6st.mongodb.net/devTinder");
};
module.exports=connectDB;
