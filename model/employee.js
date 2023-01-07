const mongoose = require("mongoose")

const EmployeeData = new mongoose.Schema({
    key:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    jobsapplied:{
        type:Number,
        required :[true,"Please provide your Type of work"]  
    },
    jobsdone:{
        type:Number,
        required :[true,"Please provide your salary"]  
    },
   

});
const Employee = mongoose.model("employeesData",EmployeeData); 
module.exports = Employee