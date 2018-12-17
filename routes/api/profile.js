//Fetch profile information
//location bio testimony social media links 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile');

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
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
}
);

//@route  POST api/profile 
//@desc   Create or edit user profile
//@access Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), (req, res) => {
      const {errors, isValid } = validateProfileInput(req.body);

  //Check Validation
  if(!isValid) {
    //Return any errors with 400 status
    return res.status(400).json(errors);
  }


  //Get fields
  const profileFields = {};
    profileFields.user = req.user.id; //<-- logged in user 
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFieldybody.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills - Split into array
    if(typeof req.body.skills !== 'undefined'){
      profileFields.skills = req.body.skills.split(',');
    }

    //Social Media links
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

//Search for user by their id (user: req.user.id)
    Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile) {
      //update profile
      Profile.findOneAndUpdate(
        {user: req.user.id}, 
        {$set: profileFields}, 
        {new: true}
        ).then(profile => res.json(profile));
    } else {
      //Create

      //Check if handle exists
      Profile.findOne({handle: profileFields.handle})
      .then(profile => {
        if(profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors);
        }
        //If handle does not exist // Save Profile
        new Profile(
          profileFields).save()
          .then(profile => res.json(profile));
        });
      }
    });
  }
    );

//must export to work
module.exports = router;
