import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    order: {},
    statusText: "",
}

const orders_slice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        "fetch_orders": (state) => {
            state.status = "LOADING";
        },
        "fetch_orders_success": (state, action) => {
            state.status = "SUCCESS";
            state.statusText = "";
            state.orders = action.payload.orders;
        },
        "fetch_orders_failure": (state, action) => {
            state.status = "FAILED";
            state.statusText = action.payload.error.message;
            state.error = action.payload.error;
        },
        "fetch_order": (state) => {
            // state.status = "LOADING";
        },
        "fetch_order_success": (state, action) => {
            state.status = "SUCCESS";
            state.statusText = "";
            state.order = action.payload.order;
        },
        "fetch_order_failure": (state, action) => {
            state.status = "FAILED";
            state.statusText = action.payload.error.message;
            state.error = action.payload.error;
        },
    },
})


export default orders_slice;
export const { fetch_order, fetch_order_success, fetch_order_failure, fetch_orders, fetch_orders_success, fetch_orders_failure } = orders_slice.actions;
