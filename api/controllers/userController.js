const bcrypt = require("bcrypt");
const userModel = require("../models/user");

//User registrtaion (signup) contoller
function postRegister(req, res){
    //TODO: Validation, Save user records to database (userModel) 
    res.json({ message: "User registration" });
}

//User login (signin) contoller
function postLogin(req, res){
    //TODO: Validation, if success create session, cookie to frontend (to be decide)
    res.json({ message: "User login" });
}

module.exports = {
    postRegister,
    postLogin
}