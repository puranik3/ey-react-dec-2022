import {
    TOGGLE_THEME
} from '../actions/constants';

const initialState = {
    value: 'light'
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case TOGGLE_THEME:
            return {
                ...state,
                value: state.value === 'light' ? 'dark' : 'light'
            };
        default:
            return state;
    }
};

export default reducer;