//Authentication & Login 
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

//Encrypt Password
const bcrypt = require('bcryptjs');

//Load User model
const User = require('../../models/User');

//@route  GET api/users/test
//@desc   tests users route
//@access Public

//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//@route  GET api/users/register
//@desc   register user
//@access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
    if(user) {
      return res.status(400).json({email: 'Email already exists'});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })

    }
  })
});




//must export to work
module.exports = router;