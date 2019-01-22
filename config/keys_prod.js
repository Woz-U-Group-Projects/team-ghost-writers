//Importing MongoDB
//we are using environment variables
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};

//MONGO_URI & SECRET_OR_KEY can be named anything. 
//our server is the only thing that recognizes this information. so anyone using this code via github it doesn't mean anything too. 
