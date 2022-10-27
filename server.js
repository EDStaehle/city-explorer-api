'use strict';

console.log('our fist server');

// const { response } = require('express');
//******requires*****
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
// once express is in we need to use it
// app === server
const app = express();
// middleware to share resouces across internet
app.use(cors());
// define my port

const PORT = process.env.PORT || 3002;


//******endpoints */
// base endpoint

app.get('/weather', async(request, response,next) => {
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
});

class Forcast {
  constructor(cityObj){
    this.weather = cityObj.weather.description;
    this.date = cityObj.datetime;
    this.key = cityObj._id;
  }
}
app.get('/movies', async(req, res, next) =>{
  try {
    let cityName = req.query.city_name;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}&language=en-US&page=1&include_adult=false`;
    let movieResults = await axios.get(url);
    let dataToSend = movieResults.data.results.map(mov => new Movies(mov));
    console.log(dataToSend);
    res.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

class Movies {
  constructor(movObj){
    this.title = movObj.title;
    this.overview = movObj.overview;
    this.img = movObj.poster_path;
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



