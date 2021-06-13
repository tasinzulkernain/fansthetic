import { createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'
import { set_categories_success } from '../../statics/statics_slice'

const initialState = {
    trending_products: [],
    banners: [],
    loaded: [],
}

const home_slice = createSlice({
    name: "home",
    initialState,
    reducers: {
        "fetch_trending_products": (state) => {
            _.remove(state.loaded, e => e === "trending_products")
            state.status = "LOADING";
        },
        "fetch_trending_products_success": (state, action) => {
            state.loaded.push("trending_products")
            state.trending_products = action.payload.trending_products;
            console.log("came inside reducer")
        },
        "fetch_trending_products_failure": (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.error;
        },
        "fetch_banners": (state) => {
            _.remove(state.loaded, e => e === "banners")
            state.status = "LOADING";
        },
        "fetch_banners_success": (state, action) => {
            state.status = "SUCCESS";
            state.loaded.push("banners")
            state.banners = action.payload.banners;
        },
        "fetch_banners_failure": (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.error;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(set_categories_success, (state, action) => {
                state.loaded.push("categories");
            })
    },
})


export default home_slice;
export const { fetch_trending_products, fetch_trending_products_success, fetch_trending_products_failure, fetch_banners, fetch_banners_success, fetch_banners_failure } = home_slice.actions;
