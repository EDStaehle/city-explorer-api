'use strict';

console.log('our fist server');

// const { response } = require('express');
//******requires*****
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
// once express is in we need to use it
// app === server
const app = express();
// middleware to share resouces across internet
app.use(cors());
// define my port

const PORT = process.env.PORT || 3002;


//******endpoints */
// base endpoint

app.get('/weather', (request, response,next) => {
  try {
    console.log('hit weather route');
    const {city} = request.query;
    let lat = Math.floor(request.query.lat);
    let lon = Math.floor(request.query.lon);
    let dataToGroom = data.find(cityObj => cityObj.city_name.toLowerCase() === city.toLowerCase() && Math.floor(cityObj.lat) === lat && Math.floor(cityObj.lon) === lon);
    let dataToSend = dataToGroom.data.map(day => new Forcast(day));
    console.log(dataToSend);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

class Forcast {
  constructor(cityObj){
    this.weather = cityObj.weather.description;
    this.date = cityObj.datetime;
    this.key = cityObj._id;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});
//*****error handling*** *

// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });


//******server start ********
app.listen(PORT, () => console.log(`we are up and running on ${PORT}`));



