import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';


// this step also creates a root reducer internally
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})