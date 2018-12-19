//Importing MongoDB
const mongoose = require('mongoose');

//Connect to Mongodb via mongoose
//mongoose.connect('mongodb://benfaul:engage19@ds133776.mlab.com:33776/engage')


module.exports = {
  mongoURI:     'mongodb://benfaul:engage19@ds133776.mlab.com:33776/engage', 
  secretOrKey: 'secret'
};
