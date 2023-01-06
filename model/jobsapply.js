const mongoose = require("mongoose");

const alljobsApply = new mongoose.Schema({
    workid:{
        type:String,
        required :[true,"Please provide your name"]  
    },
    workexp:{
        type:String,
        required :[true,"Please provide your Type of work"]  
    },
    userId:{
        type:String,
        required :[true,"Please provide your Type of userId"]  

    }

});
const AlljobsApply = mongoose.model("alljobsApply",alljobsApply); 
module.exports = AlljobsApply