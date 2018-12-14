//create posts & comments
const express = require('express');
const router = express.Router();


//@route  GET api/posts/test
//@desc   tests post route
//@access Public
//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

//must export to work
module.exports = router;
//now can go to localhost:5000/api/users/test 