const port = process.env.PORT || 5000;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Passport is Authentication
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const path = require('path');

const app = express ();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//if none of above hits. hit below for heroku
/* Server static assets if in production
if(process.env.NODE_ENV === 'production') {
//Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}*/

//When connecting to Heroku

app.listen(port, () => console.log(`Server running on port ${port}`));