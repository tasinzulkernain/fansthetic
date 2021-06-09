import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    "count": 0,
    "total_amount": 0,
    "products": [],
    "status": "DEFAULT"
}

const wishlist_slice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        initialize_wishlist: state => {
            state.status = "INITIALIZING"
        },
        update_wishlist: state => {
            state.status = "UPDATING"
        },
        add_to_wishlist: state => {
            state.status = "UPDATING"
        },
        remove_from_wishlist: state => {
            state.status = "UPDATING"
        },
        update_wishlist_success: (state, action) => {
            state.status = "UPDATED"
            state.products = action.payload;
        },
        update_wishlist_failure: (state, action) => {
            state.status = "FAILED"
            state.error = action.payload.error;
        }
    },
}) 

export const { update_wishlist, update_wishlist_success, update_wishlist_failure, initialize_wishlist, add_to_wishlist, remove_from_wishlist } = wishlist_slice.actions;
export default wishlist_slice