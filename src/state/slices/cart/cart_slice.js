import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "count": 0,
    "total_amount": 0,
    "products": []
}

const cart_slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        update_cart: (state, action) => {
            state.status = "UPDATING"
        },
        update_cart_success: (state, action) => {
            state = {
                status: "UPDATED",
                ...action.payload.cart
            }
        },
        update_cart_failure: (state, action) => {
            state.status = "FAILED"
        }
    },
}) 

export const { update_cart, update_cart_success, update_cart_failure } = cart_slice.actions;
export default cart_slice