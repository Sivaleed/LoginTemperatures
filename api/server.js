'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '127.0.0.1';

// App
const app = express();

//import user route
const user = require('./routes/userRoute');
app.use('/user', user);

//import weather route 
const weather = require('./routes/weatherRoute');
app.use('/weather', weather);

//**Temperory added as public html
app.use(express.static('public'));

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);