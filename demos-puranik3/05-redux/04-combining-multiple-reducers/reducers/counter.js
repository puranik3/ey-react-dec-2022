import {
    INCREMENT,
    DECREMENT
} from '../actions/constants.js';

const storedState = JSON.parse( localStorage.getItem( 'state' ) );
const initialState =  storedState || {
    value: 0
};

 const reducer = ( state = initialState, action ) => {
     switch( action.type ) {
         case DECREMENT:
             // state.value++; // Rule #3 violated
             return {
                 ...state,
                 value: state.value - action.payload.changeBy
             };
         case INCREMENT:
             return {
                 ...state,
                 value: state.value + action.payload.changeBy
             };
         default:
             return state;
     }
 };

 export default reducer;