import counterReducer from './reducers/counter.js';
import userReducer from './reducers/user.js';
import logger from './middleware/logger.js';     
import storeState from './middleware/storeState.js';

// we pass the "shape" of the global state, and which reducers handle the small "slices" of the state
/**
 * global state -> {
 *      counter: {
            value: 0
        },
        user: {
            name: ''
        }
 * }
 */
const rootReducer = Redux.combineReducers({
    counter: counterReducer, // counterReducer receives only { value: ... }
    user: userReducer // userReducer receives only { name: '...' }
});

const store = Redux.createStore( rootReducer, Redux.applyMiddleware( ReduxThunk ) );

export default store;