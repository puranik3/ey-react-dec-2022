import counterReducer from './reducers/counter.js';
import logger from './middleware/logger.js';     
import storeState from './middleware/storeState.js';

const store = Redux.createStore( counterReducer, Redux.applyMiddleware( logger, storeState ) );

export default store;