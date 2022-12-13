import {
    TOGGLE_THEME,
    WD_LOADING,
    WD_LOADED,
    WD_ERROR_LOADING
} from './constants.js';

import {
    getWorkshopById
} from '../services/workshops';

const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    };
};

const wdLoading = () => {
    return {
        type: WD_LOADING
    };
};

const wdLoaded = ( workshop ) => {
    return {
        type: WD_LOADED,
        payload: {
            workshop
        }
    };
};

const wdError = ( error ) => {
    return {
        type: WD_ERROR_LOADING,
        payload: {
            error
        }
    };
};

const loading = ( id ) => {
    return async ( dispatch ) => {
        // loading
        dispatch( wdLoading() );

        // side-effect of loading
        try {
            const workshop = await getWorkshopById( id );
            dispatch( wdLoaded( workshop ) );
        } catch (error) {
            dispatch( wdError( error ) );
        }
    };
};

export {
    toggleTheme,
    wdLoading,
    wdLoaded,
    wdError,
    loading
};