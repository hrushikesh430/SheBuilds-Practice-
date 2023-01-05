const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const errorHandler = require("./middleware/errorHandler")
const tryCatch = require("./utils/tryCatch")
const AppError = require("./utils/AppError")
const route = require("./routes/route")
dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;



// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// connecting db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.URI,()=>{
  console.log("Db connected")
});
console.log(mongoose.connection.readyState);



// serving static files
app.use(express.static('public'));
app.set('view engine','ejs');


const getUser = ()=> undefined;

app.get('/', tryCatch( async (req,res,next)=>{

    
        const user = getUser();
        console.log(user)
        if(!user){
            throw new AppError(300,"this is AppError",400);
        }


 
      res.send("hello");
})
);
app.get('/home',(req,res)=>{
  res.render('layout',{name:"my name is thapa"});
});

//middleware
app.use(errorHandler);
app.use('/v1/api',route)





// listining port
app.listen(PORT,(req,res)=>{
  console.log(`server is listining on port ${PORT}`)
});