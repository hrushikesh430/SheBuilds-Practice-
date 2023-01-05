const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const User = require('../model/User')
const AppError = require("../utils/AppError")
const tryCatch = require("../utils/tryCatch")
const jsonParser = bodyParser.json()

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.postRegister = tryCatch(async(req,res,next)=>{
    console.log(req.body)
    const newUser= new User(req.body);
    console.log(newUser.name);
    if(
        !newUser.name ||
        !newUser.age ||
        !newUser.email ||
        !newUser.phoneNo || 
        !newUser.username ||
        !newUser.password
    ){
        
        throw new AppError(300,"input field not provided",404)

    }
    

    newUser.save();
    res.status(201).json({
        status:"succsess",
        data: {
            newUser,
        },
    });
})


exports.getRegister = tryCatch(async(req,res,next)=>{
    
    const newUser = await User.find(); 
    res.status(201).json({
        status:"succsess",
        data: {
            newUser,
        },
    });
})


















