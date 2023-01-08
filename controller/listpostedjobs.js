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


exports.getListAppliedJobs = tryCatch(async(req,res)=>{

    const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);
    const data = await Employer.find({key:user.newUser[0]._id});
    const count = await Employer.countDocuments({key:user.newUser[0]._id});
    console.log(data);
    console.log(count);

    let code = ``;
    for(let i =0 ; i < count ; i++){
        const appliedUser = await JobApply.find({workid:data[i].workid})
        let count1 = 0;
        count1 = await JobApply.countDocuments({workid:data[i].workid})
        // console.log(appliedUser)
        let infoUser=[];
         for(let j = 0 ; j < count1 ; j++){

            infoUser[j] = await User.find({_id:appliedUser[j].userId})       
            
         }
         for(let j =0 ; j < count1 ; j++)
         {
            // console.log("thissss ");
          //  console.log(infoUser[0][0])
 //  <h3>Work Experience: ${infoUser].name}</h3>
         code += `<div class="grid-item">
        <div class="card">
          <!-- <img class="card-img" src="./img/rome.jpg" alt="Rome" /> -->
          <div class="card-content">
            <h1 class="card-header">Work Title : ${data[i].name}</h1>
            <p class="card-text">
                <h3 class="heading">Work ID: ${data[i].workid}</h3>
             <h3>Name: ${infoUser[j][0].name}</h3>
             <h3>Age: ${infoUser[j][0].age}</h3>
             <h3>Phone Number: ${infoUser[j][0].name}</h3>
             <h3 >Address: ${infoUser[j][0].name}</h3>
           
            </p>
            <form action="/clickedAcc" method="post">
            
              
            <button class="card-btn" name="butt1" value="${data[i].name}+${data[i].workid}+${infoUser[j][0]._id}+${data[i].key}" type="submit">Accept</button>
            </form>
            </div>
        </div>
      </div>`
        
    }
}
    // console.log(code);   

    res.render("alljobsapplied",{code :code});
})