'use strict';

console.log('our fist server');

const { response } = require('express');
//******requires*****
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');

// once express is in we need to use it
// app === server
const app = express();

// define my port

const PORT = process.env.PORT || 3002;


//******endpoints */
// base endpoint
app.get('/', (request, response) => {
  console.log('this is showing up in my terminal');
  response.status(200).send('welcome to my server');
});
app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`hello ${firstName} ${lastName}`);
});
app.get('.pet', (request, response) => {
  try {
    let species = request.query.species;
    let dataToGroom = data.find(pet => pet.species === species);
    let dataToSend = new Forcast(dataToGroom);
    response.statusMessage(200).send(dataToSend);
    console.log(species);
  } catch (error) {
    next(error);
  }
});
class Forcast {
  constructor(petObj){
    this.name = petObj.name;
    this.weather = petObj.weather;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
});
//*****error handling*** *

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//******server start ********
app.listen(PORT, () => console.log(`we are up and running on ${PORT}`));



