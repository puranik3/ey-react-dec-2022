import axios from 'axios';
const {
    REACT_APP_API_BASE_URL
} = process.env;

console.log( REACT_APP_API_BASE_URL );

axios.defaults.baseURL = REACT_APP_API_BASE_URL;
axios.defaults.headers = {
    'Content-Type': 'application/json'
};

// to setup request and response interception
// axios.interceptors