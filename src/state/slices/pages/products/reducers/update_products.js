const update_products_reducer = (state, action) => {  
    state.products = action.payload.products;
};


const update_products_action = (products) => {
    return { payload: { products } }
}


export default {
    reducer: update_products_reducer,
    prepare: update_products_action
};