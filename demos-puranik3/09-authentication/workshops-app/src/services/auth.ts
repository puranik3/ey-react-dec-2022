import axios from 'axios';
import ILoginRequest from '../models/ILoginRequest';
import ILoginResponse from '../models/ILoginResponse';

const login = async ( credentials : ILoginRequest ) => {
    const response = await axios.post( `/login`, credentials );
    return response.data as ILoginResponse;
};

export {
    login
};