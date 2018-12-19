const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  //first goes through this to make sure they were filled out, then to validator below for the information presented 

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if(Validator.isEmail(data.text)) {
    errors.text = 'Text field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};