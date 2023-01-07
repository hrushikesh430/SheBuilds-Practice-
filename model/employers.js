const mongoose = require("mongoose")

const EmployerData = new mongoose.Schema({
    key:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    jobsposted:{
        type:Number,
        required :[true,"Please provide your Type of work"]  
    },
    hired:{
        type:Number,
        required :[true,"Please provide your salary"]  
    },
   

});
const Employer = mongoose.model("employersData",EmployerData); 
module.exports = Employer