//Authentication & Login 
const express = require('express');
const router = express.Router();

//@route  GET api/users/test
//@desc   tests users route
//@access Public

//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

//must export to work
module.exports = router;