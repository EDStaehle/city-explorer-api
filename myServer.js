'use strict';
console.log('our fist server');
//******requires*****
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
const weatherHandler = require('./modules/weather_api');
const movieHandler = require('./modules/movies.js');
const errorHandle = require('./modules/error_handle')
// once express is in we need to use it
// app === server
const app = express();
// middleware to share resouces across internet
app.use(cors());
// define my port
// const PORT = process.env.PORT || 3002;
//******endpoints */
// base endpoint
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);
app.get('*', errorHandle);
//*****error handling*** *
app.use((error, req, res, next)=>{
  console.log(error.message);
  res.status(500).send(error);
})
//******server start ********
app.listen(PORT, () => console.log(`we are up and running on ${PORT}`));



