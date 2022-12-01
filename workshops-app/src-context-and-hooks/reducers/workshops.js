import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS
} from '../actions/constants';

export const initialState = {
    status: '',
    items: [],
    error: null
};

export default function workshopsReducer( curState, action ) {
    let newState;

    switch( action.type ) {
        case FETCHING_WORKSHOPS:
            newState = {
                ...curState,
                status: FETCHING_WORKSHOPS
            };
            break;
        case FETCHED_WORKSHOPS:
            newState = {
                ...curState,
                status: FETCHED_WORKSHOPS,
                items: action.payload.workshops
            };
            break;
        case ERROR_FETCHING_WORKSHOPS:
            newState = {
                ...curState,
                status: ERROR_FETCHING_WORKSHOPS,
                error: action.payload.error
            };
            break;
        default:
            newState = curState;
    }

    return newState;
};