import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    NEXT_PAGE
} from './constants';

import { getWorkshops } from '../services/workshops';

const fetchingWorkshops = () => {
    return {
        type: FETCHING_WORKSHOPS
    };
};

const fetchedWorkshops = ( workshops ) => {
    return {
        type: FETCHED_WORKSHOPS,
        payload: {
            workshops
        }
    };
};

const errorFetchingWorkshops = ( error ) => {
    return {
        type: ERROR_FETCHING_WORKSHOPS,
        payload: {
            error
        }
    };
};

const nextPage = ( page ) => {
    return {
        type: NEXT_PAGE,
        payload: {
            page
        }
    };
};

// thunk (a function that returns a function)
const fetchWorkshops = () => {
    // a "function" action
    return async ( dispatch, getState ) => {
        // an action that has a "side-effect"
        dispatch( fetchingWorkshops() );
 
        // the "side-effect"
        try {
            const workshops = await getWorkshops( getState().workshops.page );
            dispatch( fetchedWorkshops( workshops ) );
        } catch( error ) {
            dispatch( errorFetchingWorkshops( error ) );
        }
    };
}

export {
    fetchingWorkshops,
    fetchedWorkshops,
    errorFetchingWorkshops,
    fetchWorkshops,
    nextPage
}