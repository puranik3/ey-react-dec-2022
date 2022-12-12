import {
    createStore,
    combineReducers
} from 'redux';

import themeReducer from './reducers/theme';

// state -> {
//     theme: {
//         theme: 'light'
//     }
// }
const rootReducer = combineReducers({
    theme: themeReducer
});

const store = createStore( rootReducer );

export default store;