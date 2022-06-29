const express=require("express");
const router=express.Router();
const tempController = require("../controllers/tempController");


/**
 * TODO: must protect below end points
 */

router.get('/callweatherapi', (req, res, next) => {    
    tempController.callWeatherApi(req, res)
})


router.get('/get', async(req, res, next) => {    
    tempController.getAllTempByUser(req, res)
})

module.exports=router;

