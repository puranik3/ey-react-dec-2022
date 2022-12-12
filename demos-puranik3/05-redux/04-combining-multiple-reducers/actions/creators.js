import {
    INCREMENT,
    DECREMENT
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

export {
    increment,
    decrement
};