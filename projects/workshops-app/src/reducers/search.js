import {
    SEARCH_ITEMS,
    FETCHED_ITEMS
} from '../actions/constants';

const initialState = {
    items: [],
    status: ''
};

const searchReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case SEARCH_ITEMS:
            return {
                ...state,
                status: action.type
            };
        case FETCHED_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                status: action.type
            }
        default:
            return state;
    }
}

export default searchReducer;