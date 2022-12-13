import {
    WD_LOADING,
    WD_LOADED,
    WD_ERROR_LOADING
} from '../actions/constants';

const initialState = {
    workshop: null,
    loading: true,
    error: null
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case WD_LOADING:
            return {
                ...state,
                loading: true
            };
        case WD_LOADED:
            return {
                ...state,
                loading: false,
                workshop: action.payload.workshop
            }
        case WD_ERROR_LOADING:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
};

export default reducer;