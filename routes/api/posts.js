//create posts & comments
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');
//Profile model
const Profile = require('../../models/Profile');

//Validation for Post.js
const validatePostInput = require('../../validation/post');

//@route  GET api/posts/test
//@desc   tests post route
//@access Public

//whatever request I want: post/get etc 
//the beginning of the route is already in server.js 

router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

//@route  GET api/posts
//@desc   Get posts
//@access Public
router.get('/', (req, res) => {
  Post.find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({nopostsfound: 'No posts found with that id'})
  );
});

//@route  GET api/posts:id
//@desc   Get posts by id
//@access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({nopostfound: 'No post found with that id'})
  );
});


//@route  POST api/posts
//@desc   Create Post
//@access Private //not everyone can post

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, inValid} = validatePostInput(req.body);

  //Check Validation
  if(!isValid) {
    // if any erros, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text, 
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

//@route  DELETE api/posts/:id
//@desc   Delete post
//@access Private 
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      //Check for post owner
      if(post.user.tostring() !== req.user.id) {
        return res.status(401).json({notauthorized: 'User not authorized'})
      }
      
      //Delete
      post.remove().then(() => res.json({success: true }));
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
  })
});

//@route  POST api/posts/like/:id
//@desc   Like post
//@access Private 
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {

      //to check if the user has already like the post
      if(post.likes.filter(like => like.user.tostring() === req.user.id).length > 0) {
        return res.status(400).json({alreadyliked: 'User already liked this post'});
      }
    
      //Add user id to likes array
      post.likes.unshift({ user: req.user.id});

      //Save to database
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
  });
}
);

//@route  POST api/posts/unlike/:id
//@desc   Unlike post
//@access Private 
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {

      //to check if the user has already like the post
      if(post.likes.filter(like => like.user.tostring() === req.user.id).length === 0) 
      {
        return res.status(400).json({notliked: 'You have not yet liked this post'});
      }
    
      //Get remove index
      const removeIndex = post.likes
      .map(item => item.user.tostring())
      .indexOf(req.user.id);

      //Splice it out of array
      post.likes.splice(removeIndex, 1);

      //Save to DB
      post.save().then(post => res.json(post));
    })
    
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
  });
}
);




//must export to work
module.exports = router;
//now can go to localhost:5000/api/users/test 