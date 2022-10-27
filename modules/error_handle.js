'use strict'
const axios = require('axios');
async function errorHandle(request, response){
  response.status(404).send('this route does not exist');
}
module.exports = errorHandle