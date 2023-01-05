import express from 'express'
import dotenv from 'dotenv'
import mongoose from  'mongoose'
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;


//body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// connecting db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.URI,()=>{
  console.log("Db connected")
});
console.log(mongoose.connection.readyState);



// serving static files
app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
  res.send("hello");
});
app.get('/home',(req,res)=>{
  res.render('layout',{name:"my name is thapa"});
});




// listining port
app.listen(PORT,(req,res)=>{
  console.log(`server is listining on port ${PORT}`)
});