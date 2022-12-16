import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import formReducer from './slices/form';

export default configureStore({
    reducer: {
        counter: counterReducer,
        form: formReducer
    },
    // middleware: getDefaultMiddleware => [ ...getDefaultMiddleware(), thunk ]
})