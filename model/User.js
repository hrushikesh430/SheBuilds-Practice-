import mongoose from "mongoose";

const sheBuildsUser = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    age:{
        type:Number,
        required :[true,"Please provide your age"]  
    },
    email:{
        type:String,
        required :[true,"Please provide your email"]  
    },
    phoneNo:{
        type:Number,
        required :[true,"Please provide your Phone Number"]  
    },
    username:{
        type:String,
        required :[true,"Please provide your username"] 
    },
    password:{
        type:Number,
        required :[true,"Please provide your password"] 
    }



});
const userSchema = mongoose.model("sheBuilds",sheBuildsUser); 
module.exports = userSchema