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


exports.getEmployee= tryCatch(async(req,res,next)=>{
    
    const employee = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN)
    const data1 = employee.newUser[0];
    const newEmployee = await User.find();
     
    res.render("employeeuserprofile",{username:data1.username,name:data1.name,email:data1.email,phoneNo:data1.phoneNo,jobsdone:data1.jobsdone,jobsapplied:data1.jobsapplied}); 
    
})

app.use(authetication);
