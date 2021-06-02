import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogicMiddleware } from 'redux-logic'
import pages_slice from './slices/pages/pages_slice'
import test_slice from "./slices/test/test";

import products_page_logic from './slices/pages/products/logics'

const logics = [
    ...products_page_logic
]
const logicMiddleware = createLogicMiddleware(logics);


const initialState = {
    "pages": pages_slice.initialState
}

console.log("pages slice");
console.log(pages_slice);

const store = configureStore({
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logicMiddleware),
    reducer: combineReducers({
        "pages": pages_slice.reducer,
        "test": test_slice.reducer,
    }),
    devTools: true,
});

export default store;