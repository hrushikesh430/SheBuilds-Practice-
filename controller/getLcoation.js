const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const Employer = require('../model/emp')
const JobApply = require("../model/jobsapply")
const AppError = require("../utils/AppError")
const User = require("../model/User");
const tryCatch = require("../utils/tryCatch")
const EmployerData = require("../model/employers");
const jsonParser = bodyParser.json()
const cookieParser = require("cookie-parser");
const { json } = require("stream/consumers");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

exports.getLocation = tryCatch(async(req,res)=>{

    const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);
    console.log("this is user")
    const userData = await User.find({_id:user.newUser[0]._id});
    console.log(userData)
    userData[0].location.coordinates[1] = parseFloat(req.body.buttonLoc.split(" ")[0]);
    userData[0].location.coordinates[0]= parseFloat(req.body.buttonLoc.split(" ")[1]);
    userData[0].location.type = "Point"
    userData[0].save();
    console.log("this i sneww user");
    console.log(userData[0]);
    console.log("thisss ")
    // console.log(req.body);
    res.redirect('back')
})