const express = require("express");
const router = express.Router();
const passport = require('passport');
const userController = require("../controllers/userController");
const { signupValidationRules, signupValidate, signinValidationRules, signinValidate } = require('../controllers/validation/validation')


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

//Logout router (Router protected with passport token)
router.get('/logout', 
    passport.authenticate('bearer', { session: false }), 
    async(req, res, next) => {           
        userController.logout(req, res)
})

module.exports = router;
