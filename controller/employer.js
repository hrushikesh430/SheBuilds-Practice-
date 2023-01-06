const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const User = require('../model/Employer')
const AppError = require("../utils/AppError")
const tryCatch = require("../utils/tryCatch")
const jsonParser = bodyParser.json()

// Body-parser middleware
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
    
    const newEmployer = await Employer.find(); 
    res.status(201).json({
        status:"succsess",
        data: {
            newEmployer,
        },
    });
})


















