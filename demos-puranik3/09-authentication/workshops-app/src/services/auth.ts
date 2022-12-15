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
    const [ token, setToken ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ role, setRole ] = useState( '' );

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

    return {
        token,
        email,
        role,
        login
    };
};

export {
    useAuth
};