//Fetch profile information
//location bio testimony social media links 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');
// Load User profile
const User = require('../../models/User');


//@route  GET api/profile/test
//@desc   tests profile route
//@access Public

//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

//@route  GET api/profile 
//@desc   Get current users profile
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => releaseEvents.status(404).json(err));
});


//must export to work
module.exports = router;
