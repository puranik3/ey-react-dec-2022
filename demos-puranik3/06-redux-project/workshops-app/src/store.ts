import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import themeReducer from './reducers/theme';
import workshopsReducer from './reducers/workshops';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import IWorkshop from './models/IWorkshop';

export type State = {
    theme: {
        value : 'light' | 'dark'
    },
    wd: {
        workshop: IWorkshop | null,
        loading: boolean,
        error: Error | null
    }
}

// state -> {
//     theme: {
//         value: 'light'
//     },
//     wd: {
    //     workshop: null,
    //     loading: true,
    //     error: null
    // }
// }
const rootReducer = combineReducers({
    theme: themeReducer,
    wd: workshopsReducer
});

const store = createStore( rootReducer, composeWithDevTools( applyMiddleware( thunk ) ) );

export default store;