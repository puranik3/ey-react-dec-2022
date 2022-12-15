import axios from 'axios';
import ILoginRequest from '../models/ILoginRequest';
import ILoginResponse from '../models/ILoginResponse';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_ROLE = 'role';

const login = async ( credentials : ILoginRequest ) => {
    const response = await axios.post( `/login`, credentials );

    const {
        email,
        authToken,
        role 
    } = response.data;

    localStorage.setItem( KEY_TOKEN, authToken );
    localStorage.setItem( KEY_EMAIL, email );
    localStorage.setItem( KEY_ROLE, role );

    return response.data as ILoginResponse;
};

export {
    login
};