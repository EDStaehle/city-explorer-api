'use strict';
const axios = require('axios');
         
async function weatherHandler(request, response,next){
  try {
    console.log('hit weather route');
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    let weatherResults = await axios.get(url);
    console.log(weatherResults);
    let dataToSend = weatherResults.data.data.map(day => new Forcast(day));
    console.log('this is my data to send', dataToSend);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
}
//**********.then chaining method *********/
// function movieHandlerWuthChaining (request, response,next){
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   let baseUrl = 'http://api.weatherbit.io/v2.0/forecast/daily';
//   let params = {
//     key: process.env.WEATHER_API_KEY,
//     lat: lat,
//     lon: lon,
//   }
//   // chaining
//   axios.get(baseUrl, { params })
//   .then(weatherResults => weatherResults.data.data.map(day => new Forcast(day)))
//   .then(dataToSend => response.status(200).send(dataToSend))
//   .catch(error => next(error));
// }
// *********************************************************

class Forcast {
  constructor(cityObj){
    this.weather = cityObj.weather.description;
    this.date = cityObj.datetime;
    this.key = cityObj._id;
  }
}
module.exports = weatherHandler;