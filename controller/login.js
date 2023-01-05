const express =require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const User = require("../model/User");
dotenv.config();
const app = express();


// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.postLogin = tryCatch(async(req,res,next)=>{
    
    const newUser = await User.find({name:req.body.name}); 
    res.status(201).json({
        status:"succsess",
        data: {
            newUser,
        },
    });
})


exports.getLogin = tryCatch(async(req,res,next)=>{
    
    
    res.status(201).json({
        status:"succsess",
        data: {
            
        },
    });
})

