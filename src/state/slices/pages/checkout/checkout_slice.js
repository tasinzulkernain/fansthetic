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
        },
        "place_order": (state, action) => {
            state.status = "PROCESSING"
        },
        "place_order_success": (state, action) => {
            state.status = "SUCCESS"
        },
        "place_order_failure": (state, action) => {
            state.status = "FAILURE"
        },
        "clear_order_status": state => {
            state.status = ""
        }
    },
}) 


export default checkout_slice;
export const { place_order, place_order_success, place_order_failure, clear_order_status, load_scripts } = checkout_slice.actions;
