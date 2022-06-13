const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

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

// router.get('/signup',(req,res)=>{
//     console.log("Users regsitration request", req, res);
//     res.status(200).send("Users regsitration request");
// });

//Signup (register) router
router.post('/signup', (req, res) => {
    userController.postRegister()
});

//Signin (login) router
router.post('/signin', (req, res) =>{
    userController.postLogin();    
});

module.exports = router;
