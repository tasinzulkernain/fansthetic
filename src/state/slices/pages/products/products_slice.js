import { createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'

const initialState = {
    products: [],
    filters: {
        category: "",
        price_range: {
            min: 0,
            max: 999999999
        },
        search: "",
        page: 0
    },
    page: 0,
    loaded_scripts: [],
    status: "PROCESSING"
}

const products_slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        update_filters: (state,action) => {
            state.filters = action.payload
        },
        update_products: state => {
            state.status = "PROCESSING"
        },
        update_products_success: (state,action) => {
            state.status = "SUCCESS"
            state.products = action.payload.products;
            state.page = action.payload.page;
            state.next = action.payload.next;
        },
        update_products_failure: (state,action) => {
            state.status = "FAILURE";
            state.error = action.payload.error;
        }
    },
}) 


export default products_slice;
export const { update_filters, update_products, update_products_success, update_products_failure } = products_slice.actions;
