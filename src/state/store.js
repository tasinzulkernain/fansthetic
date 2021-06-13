import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogicMiddleware } from 'redux-logic'
import test_slice from "./slices/test/test";
import cart_slice from './slices/cart/cart_slice'
import errors_slice from "./slices/errors/errors";
import statics_slice from './slices/statics/statics_slice'
import scripts_slice from "./slices/scripts/scripts_slice";
import auth_slice from "./slices/auth/auth_slice";

import pages_reducer from './slices/pages/pages_reducer'


//logics
import productsLogic from './slices/pages/products/logics'
import cartLogic from './slices/cart/logics'
import staticsLogic from './slices/statics/logics'
import productLogic from './slices/pages/product/logics'
import authLogic from "./slices/auth/logics/index";
import homeLogic from "./slices/pages/home/logic"
import orderLogic from "./slices/pages/orders/logic"

const logics = [
    ...productsLogic,
    ...cartLogic,
    ...staticsLogic,
    ...productLogic,
    ...authLogic,
    ...homeLogic,
    ...orderLogic
]

console.log("logics ", logics);

const logicMiddleware = createLogicMiddleware(logics);


// const initialState = {
//     "pages": pages_slice.initialState
// }

const store = configureStore({
    // preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logicMiddleware),
    reducer: combineReducers({
        "auth": auth_slice.reducer,
        "pages": pages_reducer,
        "scripts": scripts_slice.reducer,
        "test": test_slice.reducer,
        "statics": statics_slice.reducer,
        "cart": cart_slice.reducer,
        "errors": errors_slice.reducer,
    }),
    devTools: true,
});

export default store;