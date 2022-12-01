import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS
} from './constants';

import { getWorkshops } from '../services/workshops';

function fetchingWorkshopsAC() {
    return {
        type: FETCHING_WORKSHOPS
    };
}

function fetchedWorkshopsAC( workshops ) {
    return {
        type: FETCHED_WORKSHOPS,
        payload: {
            workshops
        }
    };
}

function errorFetchingWorkshopsAC( error ) {
    return {
        type: ERROR_FETCHING_WORKSHOPS,
        payload: {
            error
        }
    };
}

function fetchWorkshops() { // thunk - a function that returns an (Action) function
    return function ( dispatch ) {
        dispatch( fetchingWorkshopsAC() );
                
        getWorkshops()
            .then( ( workshops ) => dispatch( fetchedWorkshopsAC( workshops ) ) )
            .catch( ( error ) => dispatch( errorFetchingWorkshopsAC( error ) ) );
    };
}

export {
    fetchingWorkshopsAC,
    fetchedWorkshopsAC,
    errorFetchingWorkshopsAC,
    fetchWorkshops
};