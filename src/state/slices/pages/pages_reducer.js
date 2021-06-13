import { combineReducers, createSlice } from '@reduxjs/toolkit'
import products_slice from './products/products_slice'
import product_slice from './product/product_slice'
import home_slice from './home/home_slice'
import checkout_slice from './checkout/checkout_slice'
import orders_slice from './orders/orders_slice'

export default combineReducers({
    "products": products_slice.reducer,
    "product": product_slice.reducer,
    "home": home_slice.reducer,
    "checkout": checkout_slice.reducer,
    "orders": orders_slice.reducer
})