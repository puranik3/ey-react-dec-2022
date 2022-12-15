import { createContext, useState, useContext, ReactNode } from 'react';

import axios from 'axios';
import ILoginRequest from '../models/ILoginRequest';
import ILoginResponse from '../models/ILoginResponse';

export type AuthContextType = {
    token: string,
    email: string,
    role: 'admin' | 'general' | '',
    login: Function,
    getProfile: Function,
    logout: Function,
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    email: '',
    role: '',
    login: () => {},
    getProfile: () => {},
    logout: () => {},
});

export const KEY_TOKEN = 'token';
export const KEY_EMAIL = 'email';
export const KEY_ROLE = 'role';

/**
 * <AuthProvider>
 *  ...
 * </AuthProvider>
 */
const AuthProvider = ( { children } : { children : ReactNode } ) => {
    const value = useAuth();

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// custom hook for consuming auth context
const useAuthentication = () => {
    return useContext( AuthContext );
};

const useAuth = () => {
    const [ token, setToken ] = useState<string>( localStorage.getItem( KEY_TOKEN ) || '' );
    const [ email, setEmail ] = useState<string>( localStorage.getItem( KEY_EMAIL ) || '' );
    const [ role, setRole ] = useState<'admin' | 'general' | ''>( localStorage.getItem( KEY_ROLE ) as 'admin' | 'general' || '' );

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

    const logout = () => {
        localStorage.removeItem( KEY_TOKEN );
        localStorage.removeItem( KEY_EMAIL );
        localStorage.removeItem( KEY_ROLE );

        // set the state
        setToken( '' );
        setEmail( '' );
        setRole( '' );
    };

    return {
        token,
        email,
        role,
        login,
        getProfile,
        logout
    };
};

export {
    useAuth,
    useAuthentication,
    AuthProvider
};