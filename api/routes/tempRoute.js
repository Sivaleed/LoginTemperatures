const express=require("express");
const router=express.Router();
const passport = require('passport');
const tempController = require("../controllers/tempController");


/**
 * Router protected with passport token 
 */

router.get('/callweatherapi',
    passport.authenticate('bearer', { session: false }),    
    async (req, res, next) => {
                 
        tempController.callWeatherApi(req, res)
})

/**
 * Router protected with passport token 
 */
router.get('/get', 
    passport.authenticate('bearer', { session: false }), 
    async(req, res, next) => {       
        tempController.getAllTempByUser(req, res)
})

module.exports=router;

