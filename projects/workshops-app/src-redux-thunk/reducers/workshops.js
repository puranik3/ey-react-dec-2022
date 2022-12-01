import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    NEXT_PAGE
} from '../actions/constants';

const initialState = {
    status: 'FETCHING_WORKSHOPS',
    workshops: [],
    error: null,
    page: 1
};

const workshopsReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case FETCHING_WORKSHOPS:
            return {
                ...state,
                status: action.type
            };
        case FETCHED_WORKSHOPS:
            return {
                ...state,
                status: action.type,
                workshops: action.payload.workshops,
                error: null
            };
        case ERROR_FETCHING_WORKSHOPS:
            return {
                ...state,
                status: action.type,
                error: action.payload.error
            };
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        default:
            return state;
    }
}

export default workshopsReducer;