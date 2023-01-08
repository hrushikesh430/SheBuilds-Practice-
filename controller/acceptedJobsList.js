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
const AcceptedList = require('../model/acceptedList');
const User = require("../model/User");
const tryCatch = require("../utils/tryCatch")
const EmployeeData = require('../model/employee')
const EmployerData = require("../model/employers");
const jsonParser = bodyParser.json()
const cookieParser = require("cookie-parser");
const { json } = require("stream/consumers");


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


exports.getAcceptedJobs = tryCatch(async(req,res)=>{

    const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);
    // newEmployer.key = user.newUser[0]._id;

    const acceptedData = await AcceptedList.find({applicantUserId : user.newUser[0]._id})
    // console.log(acceptedData[0]);
    const employeeData = await EmployeeData.findOneAndUpdate({key:user.newUser[0]._id},{$inc:{jobsdone:1}})
    // console.log(employeeData);
    const count = await AcceptedList.countDocuments({applicantUserId : user.newUser[0]._id})
    // console.log(count)
    let code = ``;
    for(let  i = 0 ; i < count ; i++)
    {
        let employerData = await User.find({_id : acceptedData[i].employerId});
        // console.log(employerData);

        code += `<div class="grid-item">
        <div class="card">
          <!-- <img class="card-img" src="./img/rome.jpg" alt="Rome" /> -->
          <div class="card-content">
            <h1 class="card-header">Work Title : ${acceptedData[i].workName}</h1>
            <p class="card-text">
                <h3 class="heading">Work ID: ${acceptedData[i].workId}</h3>
             <h3> Employer Name: ${employerData[0].name}</h3>
             <h3>Employer Age: ${employerData[0].age}</h3>
             <h3>Employer Phone Number: ${employerData[0].phoneNo}</h3>
             <h3 >Employer Email: ${employerData[0].email}</h3>
           
            </p>
            <form action="/clickedAcc" method="post">
            
              
            <button class="card-btn" name="butt1" value="{data[i].name}+{data[i].workid}+{infoUser[j][0]._id}+{data[i].key}" type="submit">Accepted</button>
            </form>
            </div>
        </div>
      </div>`
    }

    // res.json({status:"succs"})
    res.render("acceptedjobs",{code:code})

    // res.json("acceptedjobs",{data:code})


})