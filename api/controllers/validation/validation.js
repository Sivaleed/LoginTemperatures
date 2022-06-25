const { body, validationResult } = require('express-validator');
const userModel = require("../../models/user");

//signup user validation rules
const signupValidationRules = () => {
  return [
    //validate fullname
    body('fullName').not().isEmpty().withMessage('Please enter fullname'), 
    //validate username
    body('userName').isLength({ min: 4 }).withMessage('Username must contain 4 or more characters.'),
    //validate username already used
    body('userName').custom((value) => {
      
      return userModel.findOne('username', value).then(result=>{        
        if(result?.id){          
          return Promise.reject(false);          
        } else {
          return Promise.resolve(true);
        }       
      })
        
  }).withMessage('Username already in use'),
    //Password validation 
    body('password').isLength({ min: 6 }).withMessage('Password must contain 6 or more characters.'),
    //Confirmation password validation
    body('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) {
            return true;
        } else {
            return false;
        }
    }).withMessage('Confirm password does not match'),
    //Cities validation
    body('cities').custom(value => {        
        if (value.length === 2) {
            return true;
        } else {
            return false;
        }
    }).withMessage('Please select 2 cities')
  ];
}

//signup user validation
const signupValidate = (req, res, next) => {
  const errors = validationResult(req)
  
  if (errors.isEmpty()) {
    return next()
  }

  return res.json({ errors: errors.array() });

}

//signin (login) user validation rules
const signinValidationRules = () => {
  return [
    //validate username
    body('userName').isLength({ min: 4 }).withMessage('Username must contain 4 or more characters.'),
    //validate username already used
    body('userName').custom((value) => {      
      return userModel.findOne('username', value).then(result=>{       
        if(result?.id){          
          return Promise.resolve(true);          
        } else {          
          return Promise.reject(false);
        }       
      })
        
  }).withMessage('Username not exits')
  ];
}

//signin (login) user validation
const signinValidate = (req, res, next) => {
  const errors = validationResult(req)
  
  if (errors.isEmpty()) {
    return next()
  }

  return res.json({ errors: errors.array() });

}


// Export functions
module.exports = {
  signupValidationRules,
  signupValidate,
  signinValidationRules,
  signinValidate
};