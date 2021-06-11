import { createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'

const initialState = {
    loaded_scripts: [],
}

const scripts = {
    "default": ["/js/header.js"]
}

const header_slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        "load_scripts": (state, action) => {
            state.loaded_scripts = _.union(state.loaded_scripts, scripts[action.payload])
        }
    },
}) 


export default header_slice;
export const { load_scripts } = header_slice.actions;
