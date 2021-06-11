import { combineReducers, createSlice } from '@reduxjs/toolkit'
import loading_reducer from './reducers/loading'
import scripts_reducer from './reducers/scripts' 
import products_slice from './products/products_slice'
import product_slice from './product/product_slice'

export default combineReducers({
    "products": products_slice.reducer,
    "product": product_slice.reducer,
})