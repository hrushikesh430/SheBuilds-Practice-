const mongoose = require("mongoose")

const AcceptedList = new mongoose.Schema({
    workName:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    workId:{
        type:String,
        required :[true,"Please provide your Type of work"]  
    },
    applicantUserId:{
        type:String,
        required :[true,"Please provide your salary"]  
    },
    employerId:{
        type:String,
        required :[true,"Please provide your salary"]  
    },
   

});
const acceptedList = mongoose.model("AcceptedList",AcceptedList); 
module.exports = acceptedList