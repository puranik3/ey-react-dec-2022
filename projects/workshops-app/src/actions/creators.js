import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    NEXT_PAGE,
    SEARCH_ITEMS,
    FETCHED_ITEMS
} from './constants';

import { getWorkshops } from '../services/workshops';

const fetchingWorkshops = ( page ) => {
    return {
        type: FETCHING_WORKSHOPS,
        payload: {
            page
        }
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

const searchItems = ( value ) => {
    return {
        type: SEARCH_ITEMS,
        payload: {
            value
        }
    };
};

const fetchedItems = ( items ) => {
    return {
        type: FETCHED_ITEMS,
        payload: {
            items
        }
    };
};

export {
    fetchingWorkshops,
    fetchedWorkshops,
    errorFetchingWorkshops,
    fetchWorkshops,
    nextPage,
    searchItems,
    fetchedItems
}