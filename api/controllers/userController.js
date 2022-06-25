const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user");


//define salt for bcrypt
const saltRounds = 10;

//User registrtaion (signup) contoller
const postRegister = (req, res) => {
    
    bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
        
        if( error ){
            return res.json({errors:[{location: "null", msg : error.message, param: "defaultError", value:'' }]})
        }
        
        //store hash into body object
        req.body.password = hash

        userModel.createUser(req.body).then(result=>{
            if(result?.id){
                return res.json({id: result.id, msg: 'You have successfully created your account.' })
            }
        })
   
    });    
  
}

//User login (signin) contoller
const postLogin = (req, res) => {

    return userModel.findOne( 'username' , req.body.userName).then(result=>{       
        if(result?.id){
            //check password validation
            const match = bcrypt.compare(req.body.password, result.password)
                .then(match => {
                    if(!match){
                        return res.json({errors:[{location: "null", msg : 'Incorrect password.', param: "password", value:'' }]})
                    } else {
                        //TODO: generate the session key and insert into the table
                        delete result.password
                        return res.json(Object.assign( result, {msg: "You have succsefully logged"}) )
                    }
                })
           
        }    
    })    
 
}

module.exports = {
    postRegister,
    postLogin
}