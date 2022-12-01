import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import workshopsReducer from './reducers/workshops';
import searchReducer from './reducers/search';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import fetchWorkshopsSaga from './sagas/workshops.saga';
import searchItemsSaga from './sagas/search.saga';

const sagaMiddleware = createSagaMiddleware();

/**
 * {
 *      workshops: {
 *          status: 'FETCHING_WORKSHOPS',
            workshops: [],
            error: null,
            page: 1
 *      },
        search: {
            status: '',
            items: []
        }
 * }
 */
const rootReducer = combineReducers({
    workshops: workshopsReducer,
    search: searchReducer
});

const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( sagaMiddleware ) ) );

sagaMiddleware.run( fetchWorkshopsSaga );
sagaMiddleware.run( searchItemsSaga );

export default store;