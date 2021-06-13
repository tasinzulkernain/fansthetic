import { createSlice } from '@reduxjs/toolkit'

import update_filters_obj from './reducers/update_filters'
import update_products_obj from './reducers/update_products'
import update_products_api_status_obj from './reducers/update_products_api_status'

import _ from 'lodash'

const initialState = {
    products: [],
    filters: {
        category: "",
        price_range: {
            min: 0,
            max: 999999999
        }
    },
    loaded_scripts: [],
    products_api_status: "PROCESSING"
}

const scripts = {
    "default": ["/js/main.js"],
    "sidebar": ["/js/sticky_sidebar.min.js"],
    "products_list": ["/js/specific_listing.js"]
}

const products_slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        "update_filters": update_filters_obj,
        "update_products": update_products_obj,
        "update_products_api_status": update_products_api_status_obj,
        // "load_scripts": (state, action) => {
        //     state.loaded_scripts = _.union(state.loaded_scripts, scripts[action.payload])
        // }
    },
}) 

products_slice.initialState = initialState;

export default products_slice;
export const { update_filters, update_products, update_products_api_status } = products_slice.actions;
