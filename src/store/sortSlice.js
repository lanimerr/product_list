import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortByPrice: null,
};

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        updateSortByPrice: (state, action) => {
            state.sortByPrice = action.payload;
        },
    },
});

export const { updateSortByPrice } = sortSlice.actions;

export default sortSlice.reducer;