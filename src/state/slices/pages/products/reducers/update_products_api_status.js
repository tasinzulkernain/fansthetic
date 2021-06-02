const loading_reducer = (state, action) => {  
    state.products_api_status = action.payload.products_api_status;
};

const loading_action = (status, products = [], error= null) => {
    return { payload: { status, products, error } }
}

export default {
    reducer: loading_reducer,
    prepare: loading_action
};