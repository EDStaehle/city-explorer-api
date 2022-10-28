'use strict';
const axios = require('axios');
let cache = {};
// TODO: create a key for data to store
// TODO: if the things exist and is in a valid timeframe send that data
// TODO: if the things do not exist cache it
         
async function weatherHandler(request, response,next){
  try {
    console.log('hit weather route');
    let lat = request.query.lat;
    let lon = request.query.lon;
    let key = lat && lon + 'weather';
    if(cache[key] && (Date.now() - cache[key].timestamp < 1000 * 20)){
        console.log('cache was hit');
        response.status(200).send(cache[key].data)
    }else{
      console.log('cache missed -- no data present');
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
      let weatherResults = await axios.get(url);
      let dataToSend = weatherResults.data.data.map(day => new Forcast(day));
      // add api data to cache
      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      };
      response.status(200).send(dataToSend);
    }
  } catch (error) {
    next(error);
  }
}

class Forcast {
  constructor(cityObj){
    this.weather = cityObj.weather.description;
    this.date = cityObj.datetime;
    this.key = cityObj._id;
  }
}
module.exports = weatherHandler;














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