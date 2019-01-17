<<<<<<< HEAD
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
=======
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
>>>>>>> master

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
<<<<<<< HEAD
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
=======
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
>>>>>>> master
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
<<<<<<< HEAD
    .post("/api/users/login", userData)
=======
    .post('/api/users/login', userData)
>>>>>>> master
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
<<<<<<< HEAD
      localStorage.setItem("jwtToken", token);
=======
      localStorage.setItem('jwtToken', token);
>>>>>>> master
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
<<<<<<< HEAD
  localStorage.removeItem("jwtToken");
=======
  localStorage.removeItem('jwtToken');
>>>>>>> master
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
