const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const register = require("../controller/register")
const login = require("../controller/login")
const employer = require("../controller/employer");
const alljobs = require('../controller/alljobs')
const applyjob = require("../controller/apply")
const authetication = require("../middleware/authetication");
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
router.post('/jobapply',applyjob.postApply);

module.exports = router;    