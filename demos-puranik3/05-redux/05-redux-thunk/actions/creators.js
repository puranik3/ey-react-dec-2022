import {
    INCREMENT,
    DECREMENT,
    UPDATE_NAME
} from './constants.js';

// action creators
const decrement = ( changeBy ) => {
    return {
        type: DECREMENT,
        payload: {
            // changeBy: changeBy
            changeBy
        }
    };
};

const increment = ( changeBy ) => {
    return {
        type: INCREMENT,
        payload: {
            changeBy
        }
    };
};

const updateName = ( name ) => {
    return {
        type: UPDATE_NAME,
        payload: {
            name
        }
    };
};

export {
    increment,
    decrement,
    updateName
};