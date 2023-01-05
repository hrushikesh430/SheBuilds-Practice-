const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const register = require("../controller/register")
const login = require("../controller/login")

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//login
router.get('/login',login.getLogin);
router.post('/login',login.postLogin);

// register
router.get('/register',register.getRegister);
router.post('/register',register.postRegister);

module.exports = router;    