import WorkshopsService from '../services/workshops';

import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    TOGGLE_DESCRIPTIONS,
    SET_PAGE_WORKSHOPS_LIST
} from './constants';

function fetchWorkshopsAC( currentPage, pageSize ) {
    console.log( `fetchWorkshopsAC : `, currentPage, pageSize );
    return {
        type: FETCHING_WORKSHOPS,
        payload: {
            currentPage,
            pageSize
        }
    };
}

function fetchedWorkshopsAC( { workshops, total } ) {
    return {
        type: FETCHED_WORKSHOPS,
        payload: {
            workshops,
            total
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

function fetchWorkshops( currentPage, pageSize ) {
    return function( dispatch ) {
        dispatch( fetchWorkshopsAC() );

        return WorkshopsService.getWorkshopsByPage( currentPage, pageSize )
            .then( args => dispatch( fetchedWorkshopsAC( args ) ) )
            .catch( error => dispatch( errorFetchingWorkshopsAC( error ) ) );
    }
}

function toggleDescriptionsAC() {
    return {
        type: TOGGLE_DESCRIPTIONS
    };
}

function setPageWorkshopsListAC( { currentPage } ) {
    console.log( 'currentPage = ', currentPage );
    return {
        type: SET_PAGE_WORKSHOPS_LIST,
        payload: {
            currentPage
        }
    };
}

export {
    fetchWorkshopsAC,
    fetchedWorkshopsAC,
    errorFetchingWorkshopsAC,
    fetchWorkshops,
    toggleDescriptionsAC,
    setPageWorkshopsListAC
};