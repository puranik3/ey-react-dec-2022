import {
    UPDATE_NAME
} from '../actions/constants.js';

const initialState = {
    name: ''
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case UPDATE_NAME:
            return {
                name: action.payload.name
            };
        default:
            return state;
    }
};

export default reducer;