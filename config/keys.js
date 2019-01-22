
//we are testing to see what environment we are in
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  //if we are not in production..we want to load keys_dev
  module.exports = require('./keys_dev');
}

//this file is included in the server.js 
//testing to see what environment we are in

//So plainly if we are in heroku getting ready for 'production' it will load keys_prod, if we are in our local machine it will load keys_dev. 