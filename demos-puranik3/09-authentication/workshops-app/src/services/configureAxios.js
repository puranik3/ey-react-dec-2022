import axios from 'axios';
import { KEY_TOKEN } from './auth';
const {
    REACT_APP_API_BASE_URL
} = process.env;

console.log( REACT_APP_API_BASE_URL );

axios.defaults.baseURL = REACT_APP_API_BASE_URL;
axios.defaults.headers = {
    'Content-Type': 'application/json'
};

// to setup request and response interception
axios.interceptors.request.use(
    request => {
        if( request.url.includes( 'workshops' ) || request.url.includes( 'sessions' ) || request.url.includes( 'profilephoto' ) ) {
            request.headers['Authorization'] = `Bearer ${localStorage.getItem( KEY_TOKEN )}`;
        }

        return request;
    },
    error => Promise.reject( error )
);