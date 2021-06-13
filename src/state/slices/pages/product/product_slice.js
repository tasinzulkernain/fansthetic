import { createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'

const initialState = {
    product: {},
    status: "LOADING"
}

const product_slice = createSlice({
    name: "product",
    initialState,
    reducers: {
        "fetch_product": (state) => {
            state.status = "LOADING";
        },
        "fetch_product_success": (state, action) => {
            state.status = "SUCCESS";
            state.product = action.payload.product;
        },
        "fetch_product_failure": (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.error;
        }
    },
}) 


export default product_slice;
export const { fetch_product, fetch_product_success, fetch_product_failure} = product_slice.actions;
