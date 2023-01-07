const express =require("express");
const cookieParser = require("cookie-parser");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const User = require("../model/User");
dotenv.config();
const app = express();
const jwt = require("jsonwebtoken");
const authetication = require("../middleware/authetication");
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(bodyParser.json())

exports.postLogin = tryCatch(async(req,res,next)=>{
    
    const {username,password} = req.body;
    if(!username || !password)
    {
        throw AppError(300,"Invalid username or password",404);
    }
    const newUser = await User.find({username,password});
     console.log(newUser)
    if(!newUser)
    {
        throw AppError(300,"User Not Found",404);
    }

    const accesssToken = jwt.sign({newUser},process.env.ACCESS_TOKEN);
    
    res.redirect("/alljobs")

    // res.cookie("access_token",accesssToken).status(201).json({
    //     status:"succsess",
    //     data: {
    //         newUser,
            
    //     },
    //     accesssToken : accesssToken
    // });

    //redner to all jobs
})



exports.getLogin = tryCatch(async(req,res,next)=>{
    
    
    res.render("login")
})

app.use(authetication);
