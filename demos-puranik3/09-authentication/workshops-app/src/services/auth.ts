import { createContext, useState } from 'react';

import axios from 'axios';
import ILoginRequest from '../models/ILoginRequest';
import ILoginResponse from '../models/ILoginResponse';

export type AuthContextType = {
    token: string,
    email: string,
    role: 'admin' | 'general' | '',
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    email: '',
    role: '',
});

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_ROLE = 'role';

const useAuth = () => {
    const [ token, setToken ] = useState( localStorage.getItem( KEY_TOKEN ) || '' );
    const [ email, setEmail ] = useState( localStorage.getItem( KEY_EMAIL ) || '' );
    const [ role, setRole ] = useState( localStorage.getItem( KEY_ROLE ) || '' );

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

        // set the state
        setToken( authToken );
        setEmail( email );
        setRole( role );

        return response.data as ILoginResponse;
    };

    // call it on App component useEffect( __, [] );
    const getProfile = (  ) => {

    };

    return {
        token,
        email,
        role,
        login,
        getProfile
    };
};

export {
    useAuth
};