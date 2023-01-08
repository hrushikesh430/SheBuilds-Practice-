// for adding experiance and to apply for job/work
const jwt = require("jsonwebtoken")
const express =require("express");
const ejs=require("ejs");
const app = express();
const bodyParser = require("body-parser")
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Employer = require("../model/emp")
dotenv.config();
//different schema 
const User = require('../model/User')

const AppError = require("../utils/AppError")
const tryCatch = require("../utils/tryCatch")
const jsonParser = bodyParser.json()

const fun =require("../controller/samplecall");

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// 
exports.getalljobs = tryCatch(async (req,res,next)=>{

  const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);
  const userData = await User.find({_id:user.newUser[0]._id});
    const employerpost =await Employer.find({location:{ $near: {$geometry:{coordinates:[userData[0].location.coordinates[0],userData[0].location.coordinates[1]],type:"Point"}}}});
    const count = await Employer.countDocuments({});
   
    // console.log(userData);
    // console.log(employerData)
    let sortedData = [];
    // for(let i = 0 ; i < count ; i++)
  
    // for(let i = 0; i < count ; i++)
    // {
    //   console.log("this is ")
    //   console.log(sortedData[i]);
    // }


    let code = ``;


    for(let i = 0 ; i < count ; i++){

        code += `<div class="wid-33 arrange-left">
        <div class="cart">
          <div>
            <img
              src="https://www.maxwoman.in/h-upload/2022/04/20/1600x960_1519766-.jpg"
              style="height: 200;"
              
              alt=""
            />
          </div>
          <div class="cart-details">
            <h6 class="name-head">Job Name:${employerpost[i].name}</h6>
    
            <h6 class="name-head">Salary:${employerpost[i].salary}</h6>
            <h6 class="name-head">Work Mode : ${employerpost[i].workmode}</h6>
            <h6 class="name-head">Work Description :${employerpost[i].work}</h6>
            <h6 class="name-head">Work Id :${employerpost[i].workid}</h6>
          </div>
          <div class="cart-footer">
            <button class="Apply"><a href="/applyjob">Apply</a></button>
          </div>
        </div>
      </div>`

    
    }
    res.render("alljobs",{data:code});


})