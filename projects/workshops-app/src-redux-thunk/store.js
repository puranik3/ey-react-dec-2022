import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import workshopsReducer from './reducers/workshops';
import thunk from 'redux-thunk';

/**
 * {
 *      workshops: {
 *          status: 'FETCHING_WORKSHOPS',
            workshops: [],
            error: null,
            page: 1
 *      }
 * }
 */
const rootReducer = combineReducers({
    workshops: workshopsReducer
});

const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( thunk ) ) );

export default store;