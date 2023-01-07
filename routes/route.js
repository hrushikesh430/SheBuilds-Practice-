const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const register = require("../controller/register")
const login = require("../controller/login")
const employer = require("../controller/employer");
const alljobs = require('../controller/alljobs')
const applyjob = require("../controller/apply")
const userprofile = require("../controller/employeeProfile")
const authetication = require("../middleware/authetication");
const employerprofile = require("../controller/employerProfile");
const cookieParser = require("cookie-parser");
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser);

//login
router.get('/login',login.getLogin);
router.post('/login',login.postLogin);


// register
router.get('/register',register.getRegister);
router.post('/register',register.postRegister);


// employer application request
router.get('/employerpost',authetication,employer.getEmployer);
router.post('/employerpost',employer.postEmployer);


// alljobs
router.get('/alljobs',alljobs.getalljobs);


// emloyee job apply
router.post('/applyjob',applyjob.postApply);
router.get('/applyjob',applyjob.getApply);



//employee profile
router.get('/employeeuserprofile',userprofile.getEmployee);  

//employer profile
router.get('/employerprofile',employerprofile.getEmployer);

module.exports = router;    