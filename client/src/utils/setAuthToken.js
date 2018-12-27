import axios from 'axios';

const setAuthToken = token => {
  if(token) {
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //if token isnt there delete header
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;