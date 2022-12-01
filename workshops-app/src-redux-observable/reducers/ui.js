import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    TOGGLE_DESCRIPTIONS
} from '../actions/constants';

const initialState = {
    WorkshopsList: {
        showDescriptions: true,
        status: '',
        error: null
    }
};

export default function( curState = initialState, action ) {
    let newState;

    switch( action.type ) {
        case FETCHING_WORKSHOPS:
            newState = {
                ...curState,
                WorkshopsList: {
                    ...curState.WorkshopsList,
                    status: FETCHING_WORKSHOPS
                }
            };
            break;
        case FETCHED_WORKSHOPS:
            newState = {
                ...curState,
                WorkshopsList: {
                    ...curState.WorkshopsList,
                    status: FETCHED_WORKSHOPS
                }
            };
            break;
        case ERROR_FETCHING_WORKSHOPS:
            newState = {
                ...curState,
                WorkshopsList: {
                    ...curState.WorkshopsList,
                    status: ERROR_FETCHING_WORKSHOPS,
                    error: action.payload.error
                }
            };
            break;
        case TOGGLE_DESCRIPTIONS:
            newState = {
                ...curState,
                WorkshopsList: {
                    ...curState.WorkshopsList,
                    showDescriptions: !curState.showDescriptions
                }
            };
            break;
        default:
            newState = curState;
    }

    return newState;
}