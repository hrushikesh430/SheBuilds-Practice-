const express =require("express");
const ejs=require("ejs");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();
const app = express();
//body-parser
app.use(bodyparser.urlencoded({
  extended: true
}));


//


exports.postLogin = async(req,res,next)=>{
    const newUser= new sheBuilds(req.body);
    // if(
    //     !newUser.name||
    //     !newUser.age||
    //     !newUser.email||
    //     !newUser.phoneNo||
    //     !newUser.username||
    //     !newUser.password
    // ){
    //     return next("provide all fields");

    // }
    // if(req.user.role=="user"){
    //     return next("User not Autthoried for this function")
    // }

    // newUser.save();
    res.status(201).json({
        status:"succsess",
        data: {
            newUser,
        },
    });
}


exports.getLogin = async(req,res,next)=>{
    
    const newUser = await sheBuilds.find(); 
    res.status(201).json({
        status:"succsess",
        data: {
            newUser,
        },
    });
}

