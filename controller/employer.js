const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const Employer = require('../model/emp')
const AppError = require("../utils/AppError")
const tryCatch = require("../utils/tryCatch")
const jsonParser = bodyParser.json()
const cookieParser = require("cookie-parser");

// Body-parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.postEmployer = tryCatch(async(req,res,next)=>{
    console.log(req.body)
    const newEmployer= new Employer(req.body);
    console.log(newEmployer.name);
    if(
        !newEmployer.name ||
        !newEmployer.work ||
        !newEmployer.salary ||
        !newEmployer.workmode || 
        !newEmployer.address
    ){
        
        throw new AppError(300,"input field not provided",404)

    }
    

    newEmployer.save();
    res.status(201).json({
        
        status:"succsess",
        data: {
            newEmployer,
        },
    });
})


exports.getEmployer = tryCatch(async(req,res,next)=>{
    

    const employeer = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN)
    const data1 = employeer.newUser[0].name;
    const newEmployer = await Employer.find(); 
    res.status(201).json({
        status:"succsess",
        data: data1
    });
})


















