import { combineReducers, createSlice } from '@reduxjs/toolkit'
import loading_reducer from './reducers/loading'
import scripts_reducer from './reducers/scripts' 
import products_slice from './products/products_slice'
import reduceReducers from 'reduce-reducers';


const initialState = {
    "header": {
        loaded_scripts: [],
    },
    "home": {
        loaded_scripts: [],
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
    },
}) 

pages_slice.reducer = reduceReducers(
    initialState,
    pages_slice.reducer,
    combineReducers({"products": products_slice.reducer})
)

export const { load_scripts } = pages_slice.actions;
export default pages_slice