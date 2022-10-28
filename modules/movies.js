'use strict';
const axios = require('axios');

let cache = require('./cache.js');

async function movieHandler(req, res, next){
  try {
    let cityName = req.query.city_name;
    let key = 'movies-' + cityName;
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');
      res.status(200).send(cache[key].data);
    }else{
      console.log('movie cache hit')
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}&language=en-US&page=1&include_adult=false`;
      let movieResults = await axios.get(url);
      let dataToSend = movieResults.data.results.map(mov => new Movies(mov));
      res.status(200).send(dataToSend);
      cache[key]= {
        timestamp: Date.now,
        data: dataToSend
      };
      res.status(200).send(cache[key].data);
      }
  } catch (error) {
    next(error);
  }
}
class Movies {
  constructor(movObj){
    this.title = movObj.title;
    this.overview = movObj.overview;
    this.img = movObj.poster_path;
  }
}
module.exports = movieHandler;

