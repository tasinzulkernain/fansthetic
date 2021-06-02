import { createSlice } from '@reduxjs/toolkit'

import update_filters_obj from './reducers/update_filters'
import update_products_obj from './reducers/update_products'
import update_products_api_status_obj from './reducers/update_products_api_status'

const initialState = {
    products: [],
    filters: {
        categories: [],
        price_range: {
            min: 0,
            max: 999999999
        }
    },
    products_api_status: "PROCESSING"
}

const products_slice = createSlice({
    name: "products",
    initialState,
    reducers: {
        "update_filters": update_filters_obj,
        "update_products": update_products_obj,
        "update_products_api_status": update_products_api_status_obj
    },
}) 

products_slice.initialState = initialState;

export default products_slice;
export const { update_filters, update_products, update_products_api_status } = products_slice.actions;
