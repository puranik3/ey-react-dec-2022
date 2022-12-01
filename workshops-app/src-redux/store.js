import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import workshops from './reducers/workshops';
import ui from './reducers/ui';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
    combineReducers({
        workshops,
        ui
    }),
    composeWithDevTools( applyMiddleware( thunk ) )
);