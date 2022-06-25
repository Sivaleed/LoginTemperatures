const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { signupValidationRules, signupValidate, signinValidationRules, signinValidate } = require('../controllers/validation/validation')


// middleware specific to user
router.use(function timeLog (req, res, next) {
    console.log('user login at: ', Date.now())
    //TODO: check session or user logged
    next()
});

router.get('/',(req,res)=>{
    console.log("Users Middleware");
    res.status(200).send("Users");
});

//Signup (register) router and middleware validation
router.post('/signup', 
    signupValidationRules(),
    signupValidate,
    userController.postRegister);

//Signin (login) router
router.post('/signin',
    signinValidationRules(),
    signinValidate,    
    userController.postLogin);    


module.exports = router;
