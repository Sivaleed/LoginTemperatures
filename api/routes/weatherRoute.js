const express=require("express");
const router=express.Router();

// middleware specific to user
router.use(function timeLog (req, res, next) {
    console.log('Check user sessaion for weather data at: ', Date.now())
    //TODO: check session or user logged
    next()
});

router.get('/',(req,res)=>{
    console.log("Weather");
    res.status(200).send("Weather");
    //TODO: Retrive weather
    //TODO: save daily weather toDB 
});

module.exports=router;

