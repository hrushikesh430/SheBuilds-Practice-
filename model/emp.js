const mongoose = require("mongoose")

const sheBuildsEmployer = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    work:{
        type:String,
        required :[true,"Please provide your Type of work"]  
    },
    salary:{
        type:Number,
        possibleValues:["Home","Work","Remote"],
        required :[true,"Please provide your salary"]  
    },
    workmode :{
        type:Radio,
        required :[true,"Please provide your workmode"]  
    },
    address:{
        type:String,
        required :[true,"Please provide your address"]  
    },

});
const Employer = mongoose.model("sheBuildsEmp",sheBuildsEmployer); 
module.exports = Employer