const { json } = require("body-parser");
const tempModel = require("../models/temp");
const userModel = require("../models/user");
const axios = require("axios");


/**
 * Retrive temperature data from db and convert to json format
 * @param {*} req 
 * @param {*} res 
 * @returns Json format 
 */

const getAllTempByUser = async (req, res) => {

    const userId = req.query.id
    const data = {}

    await tempModel.getTempByUserId( userId ).then(r=>{

        r.forEach( v => {
            if( data.hasOwnProperty( v.city_name) ){	
                data[v.city_name].push(v)
            } else {
                Object.assign(data, {[v.city_name]: [v]})
            }
        })
        
    })
    .catch(e=>{
        return res.status(400).json({errors: e.message})
    })
   
    return res.status(200).json({data})
    
}

/**
 * request weather api end point and prepare data to store into temperature table
 * @param {*} req 
 * @param {*} res 
 * @returns Json 
 */

const callWeatherApi = async (req, res) => {
    
    const apiReqData = []
    const userId = req.query.id
    const apiKey = process.env.OPEN_WEATHER_API_KEY

    const user = await userModel.findOne('id', req.query.id)
   
    JSON.parse(user.cities).forEach((e) => {
        apiReqData.push(
            {   
                url: process.env.OPEN_WEATHER_URL + '?lat='+e.lat+'&lon='+e.lon+'&exclude=hourly,daily,minutely,alerts&appid='+apiKey+'&units=metric',
                userId: Number(userId),
                cityId: e.id,
                cityName: e.name
            })
    });

    //Weather api request
    try { 
        let apiData = await axios.all(apiReqData.map( r => axios.get(r.url) ));

            apiData.forEach((v, k) => {
                delete apiReqData[k].url
                Object.assign(apiReqData[k], {celsius : v.data.current.temp }, {fahrenheit : Number((((v.data.current.temp * 9)/5)+32).toFixed(2))} )
            });
            
            try{
                await tempModel.createMultiTemp(apiReqData)
                return res.status(200).json({result: 'ok'})
            } catch(e) {
                return res.status(400).json({result: e.message})
            }

             
    } catch(e){
        return res.status(400).json({errors: e.message})
    } 
    
} 

module.exports = {
    getAllTempByUser,
    callWeatherApi
}