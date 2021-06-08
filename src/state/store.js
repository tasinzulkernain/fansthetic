import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogicMiddleware } from 'redux-logic'
import pages_slice from './slices/pages/pages_slice'
import test_slice from "./slices/test/test";
import cart_slice from './slices/cart/cart_slice'
import errors_slice from "./slices/errors/errors";
import statics_slice from './slices/statics/statics_slice'

//logics
import productsLogic from './slices/pages/products/logics'
import cartLogic from './slices/cart/logics'
import staticsLogic from './slices/statics/logics'


const logics = [
    ...productsLogic,
    ...cartLogic,
    ...staticsLogic
]

console.log("logics ", logics);

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
        "statics": statics_slice.reducer,
        "cart": cart_slice.reducer,
        "errors": errors_slice.reducer,
    }),
    devTools: true,
});

export default store;