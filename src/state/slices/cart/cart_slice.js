import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "count": 0,
    "total_amount": 0,
    "products": [],
    "status": "DEFAULT"
}

const cart_slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initialize_cart: state => {
            state.status = "INITIALIZING"
        },
        update_cart: state => {
            state.status = "UPDATING"
        },
        update_cartitem_quantity: state => {
            state.status = "UPDATING"
        },
        add_to_cart: state => {
            state.status = "UPDATING"
        },
        remove_from_cart: state => {
            state.status = "UPDATING"
        },
        update_cart_success: (state, action) => {
            state.status = "UPDATED"
            state.count = action.payload.count;
            state.total_amount = action.payload.total_amount;
            state.products   = action.payload.products;
        },
        update_cart_failure: (state, action) => {
            state.status = "FAILED"
            state.error = action.payload.error;
        }
    },
}) 

export const { update_cart, update_cart_success, update_cart_failure, initialize_cart, add_to_cart, remove_from_cart, update_cartitem_quantity } = cart_slice.actions;
export default cart_slice