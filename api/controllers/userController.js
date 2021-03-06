const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user");
const configData = require('../../vue-app/config.json');


//define salt for bcrypt
const saltRounds = 10;

//User registration (signup) contoller
const postRegister = (req, res) => {
    
    const cities = configData?.config?.cities
    
    const cityArr = []
        
    req.body.cities.forEach(e => {        
        cityArr.push(cities[e])
    });

    Object.assign(req.body, {selectedCity : cityArr})

    bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
        
        if( error ){
            return res.status(400).json({errors:[{location: "null", msg : error.message, param: "defaultErr", value:'' }]})
        }
        
        //store hash into body object
        req.body.password = hash

        userModel.createUser(req.body).then(result=>{
            if(result?.id){
                return res.status(200).json({id: result.id, msg: 'You have successfully created your account.' })
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
                        return res.status(400).json({errors:[{location: "null", msg : 'Incorrect password.', param: "password", value:'' }]})
                    } else {
                        
                        delete result.password
                        
                        //generate token and assigned to user object
                        Object.assign(result, {token: generateToken(result.id, 50) })

                        userModel.updateUser(result, (error, update) =>{

                            if(error){
                                return res.status(400).json({errors:[{location: "null", msg : "Could not create the token, please try again", param: "defaultErr", value:'' }]})
                            }
                            if(!update){
                                return res.status(400).json({errors:[{location: "null", msg : "Could not create the token, please try again", param: "defaultErr", value:'' }]})
                            }

                            if(update){                                
                                return res.status(200).json(Object.assign( result, {msg: "You have succsefully logged"}) )
                            }
                        })

                        
                    }
                })
           
        }    
    })    
 
}

const logout = (req, res) => {
        
    Object.assign(req.query, {token:''})
    
    userModel.updateUser(req.query, (error, update) =>{
        if(error){
            return res.status(400).json({errors:[{location: "null", msg : error.message, param: "defaultErr", value:'' }]})
        }
        if(!update){
            
            return res.status(400).json({errors:[{location: "null", msg : "Could not logout from the system, please try again", param: "defaultErr", value:'' }]})
        }
        return res.status(200).json({msg: "You have succsefully logged out"})
        
    })

    
}


/**
 * Temporary function to generate a random key as token
 *  
 */

const generateToken = (id, len) => {
    
    let key = "";
    const possible = "@-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  	const d = new Date().getTime();	
    
    for (var i = 0; i < (len-String(id).length-String(d).length); i++)
      key += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return id+key+new Date().getTime();
}

module.exports = {
    postRegister,
    postLogin,
    logout
}