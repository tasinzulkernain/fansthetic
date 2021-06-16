import _ from 'lodash'

const scripts = {
    "header": {
        "default": ["/js/header.js"],
    },
    "home": {
        "default": ["/js/main.js"],
        "carousel": ["/js/carousel-home.js"]
    },
    "products": {
        "default": ["/js/main.js"],
        "sidebar": ["/js/sticky_sidebar.min.js"],
        "products_list": ["/js/specific_listing.js"]
    },
    "checkout": {
        "default": ["/js/checkout.js"]
    },
    "account": {
        "default": ["js/main.js"]
    },
    "cart": {
        "default": ["/js/cart.js"]
    },
    "orders": {
        "default": ["/js/orders.js"]
    }
}

const load_scripts_reducer = (state, action) => {
    const { page, comp } = action.payload;
    // console.log("STATEA", scripts[page][comp]);
    state.to_load_scripts.push(scripts[page][comp]);
}


const load_scripts_action = (page, comp) => {
    return { payload: { page, comp } }
}


export default {
    reducer: load_scripts_reducer,
    prepare: load_scripts_action
};
