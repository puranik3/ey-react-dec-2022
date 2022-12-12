import {
    createStore,
    combineReducers
} from 'redux';

import themeReducer from './reducers/theme';

export type State = {
    theme: {
        value : 'light' | 'dark'
    }
}

// state -> {
//     theme: {
//         value: 'light'
//     }
// }
const rootReducer = combineReducers({
    theme: themeReducer
});

const store = createStore( rootReducer );

export default store;