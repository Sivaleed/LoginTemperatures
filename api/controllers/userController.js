const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user");


//define salt for bcrypt
const saltRounds = 10;

//User registrtaion (signup) contoller
const postRegister = (req, res) => {
    //Temp Code ----------------------------------
    const cities = [
        { id: 1, name: "Colombo", lat: "6.9271", lon: "79.8612" },
        { id: 2, name: "Chicago", lat: "33.44", lon: "-94.04" },
        { id: 3, name: "Melbourne", lat: "37.8136", lon: "144.9631" },
        { id: 4, name: "London", lat: "51.5072", lon: "0.1276" },
        { id: 5, name: "Cape Town", lat: "33.9249", lon: "18.4241" },
    ]
    //Temp Code Finish----------------------------------
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