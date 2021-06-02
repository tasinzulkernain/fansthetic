import { combineReducers, createSlice } from '@reduxjs/toolkit'
import loading_reducer from './reducers/loading'
import scripts_reducer from './reducers/scripts' 
import products_slice from './products/products_slice'
import reduceReducers from 'reduce-reducers';


const initialState = {
    "home": {
        loading: true,
        loaded_scripts: [],
        components_loading: {}
    },
    "products": {
        loaded_scripts: [],
        ...products_slice.initialState
    }
}

const pages_slice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        load_scripts: scripts_reducer,
        // update_loading: loading_reducer,
        // products: products_slice.reducer
    },
    // extraReducers: combineReducers({"products": products_slice.reducer})
}) 

pages_slice.reducer = reduceReducers(
    initialState,
    pages_slice.reducer,
    combineReducers({"products": products_slice.reducer})
)

export const { load_scripts } = pages_slice.actions;
export default pages_slice