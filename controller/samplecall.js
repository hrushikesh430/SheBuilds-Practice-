const express =require("express");
const cookieParser = require("cookie-parser");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const tryCatch = require("../utils/tryCatch");
const AppError = require("../utils/AppError");
const User = require("../model/User");
const EmployeeData = require('../model/employee');
dotenv.config();
const app = express();
const jwt = require("jsonwebtoken");
const authetication = require("../middleware/authetication");
const Employee = require("../model/employee");
const AcceptedList = require('../model/acceptedList');

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(bodyParser.json())

exports.call = tryCatch(async(req,res)=>{
        // console.log(req.body.butt1.split("+")[0]);
        const workName = req.body.butt1.split("+")[0];
        const workId = req.body.butt1.split("+")[1];
        const applicantUserId = req.body.butt1.split("+")[2];
        const employerId = req.body.butt1.split("+")[3];
        const acceptedList = new AcceptedList();
        acceptedList.workName = workName;
        acceptedList.workId = workId;
        acceptedList.applicantUserId = applicantUserId;
        acceptedList.employerId = employerId;
        acceptedList.save();
       console.log(acceptedList)
        // if(data = 1){
        //         console.log("butt1 clicked");
        //      }else{
        //         console.log("butt2 clicked");
        // }
        
        res.redirect('/listallapplied')
})