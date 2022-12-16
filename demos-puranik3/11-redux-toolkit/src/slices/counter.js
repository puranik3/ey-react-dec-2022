import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment( draft ) {
            draft.value++;
        },
        decrement( draft ) {
            draft.value--;
        }
    }
});

export const getValue = state => state.counter.value;

export default counterSlice.reducer;
export const Actions = counterSlice.actions;