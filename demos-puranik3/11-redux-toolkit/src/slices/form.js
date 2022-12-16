import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: ''
    },
    reducers: {
        updateName( draft, action ) {
            draft.name = action.payload.name;
        }
    }
});

export const getName = state => state.form.name;

export default formSlice.reducer;
export const Actions = formSlice.actions;