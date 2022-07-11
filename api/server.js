'use strict';

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const path = require("path");
const userModel = require("./models/user"); 
require('dotenv').config({ path: path.resolve(__dirname, '../vue-app/.env') })


// Constants
const PORT = process.env.NODE_SERVER_PORT;
const HOST = process.env.NODE_SERVER_HOST;

// App
const app = express()

//Enable All CORS Requests
app.use(cors())

app.use(bodyParser.json())


/**
 * passport bearer configuration
 * 
 */
passport.use(new Strategy(
  async function(token, cb) {          
      await userModel.findToken({'token' : token}, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
      return cb(null, user);
  });
}));


//import user route
const user = require('./routes/userRoute');
app.use('/user', user);

//import temp route 
const temp = require('./routes/tempRoute');
app.use('/temp', temp);
//**public folder for vue-app
app.use(express.static('./public/assets'));
app.use(express.static('./public'));

//if any invalid request populate common error message
app.get('*', (req, res, next) => {
    let err = new Error("Request Doesn't Exist");
    err.statusCode = 404;
    next(err)
});

app.use((error, req, res, next) => {
    res.json({
      error: error.message, code: error.statusCode
    });
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);