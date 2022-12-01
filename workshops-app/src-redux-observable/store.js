import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import workshops from './reducers/workshops';
import ui from './reducers/ui';
import { composeWithDevTools } from 'redux-devtools-extension';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import workshopsEpic from './epics/workshops';

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
    workshopsEpic
);

export default createStore(
    combineReducers({
        workshops,
        ui
    }),
    composeWithDevTools( applyMiddleware( thunk, epicMiddleware ) )
);

epicMiddleware.run( rootEpic );