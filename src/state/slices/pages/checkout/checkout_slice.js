import { createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'

const initialState = {
    loaded_scripts: [],
}

const scripts = {
    "default": ["/js/checkout.js"]
}

const checkout_slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        "load_scripts": (state, action) => {
            state.loaded_scripts = _.union(state.loaded_scripts, scripts[action.payload])
        }
    },
}) 


export default checkout_slice;
export const { load_scripts } = checkout_slice.actions;
