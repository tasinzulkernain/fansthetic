const scripts = {
    "home": {
        "default": ["/js/main.js"],
        "carousel": ["/js/carousel-home.js"]
    },
    "products": {
        "default": ["/js/main.js"],
        "sidebar": ["/js/sticky_sidebar.min.js"],
        "products_list": ["/js/specific_listing.js"]
    }
}

const load_scripts_reducer = (state, action) => {
    const { page, comp } = action.payload;
    scripts[page][comp].map( script => {
        if(state[page].loaded_scripts.find( p_script => p_script == script)) return;
        else state[page].loaded_scripts.push(script);
    } )
}


const load_scripts_action = (page, comp) => {
    return { payload: { page, comp, "gg": "xd" } }
}


export default {
    reducer: load_scripts_reducer,
    prepare: load_scripts_action
};
