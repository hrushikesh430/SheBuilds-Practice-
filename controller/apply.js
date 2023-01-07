// for adding experiance and to apply for job/work

const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config();
//different schema 
const User = require('../model/User')
const Employer = require("../model/emp");
const AppError = require("../utils/AppError")
const tryCatch = require("../utils/tryCatch")
const JobApply = require("../model/jobsapply")
const jsonParser = bodyParser.json()
const EmployeeData = require("../model/employee");
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.postApply = tryCatch(async(req,res,next)=>{
    
    const {workid,workExp} = req.body;

    const workApp = await Employer.find({workid:workid});
    const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);
    // newEmployer.key = user.newUser[0]._id;
    // console.log(workApp);
    const employeeData = await EmployeeData.findOneAndUpdate({key:user.newUser[0]._id},{$inc:{jobsapplied:1}});
    console.log(employeeData)
    const applyUser = new JobApply({workid:req.body.workid,workexp:req.body.workExp,userId:user.newUser[0]._id})
    applyUser.save();
    
    res.redirect("alljobs");
})


exports.getApply = tryCatch(async(req,res,next)=>{
    
   res.render("applyjob")
})


















