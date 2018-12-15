//Fetch profile information
//location bio testimony social media links 
const express = require('express');
const router = express.Router();

//@route  GET api/profile/test
//@desc   tests profile route
//@access Public

//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

//must export to work
module.exports = router;
