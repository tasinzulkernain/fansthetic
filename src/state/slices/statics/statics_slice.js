import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "categories": {
        "list": [],
        "loading": true
    },
}

const statics_slice = createSlice({
    name: "statics",
    initialState,
    reducers: {
        set_categories: (state,action) => {
            state.categories.loading = true
        },
        set_categories_success: (state, action) => {
            state.categories.loading = false;
            state.categories.list = action.payload;
        }
    },
}) 

export const { set_categories, set_categories_success } = statics_slice.actions;
export default statics_slice