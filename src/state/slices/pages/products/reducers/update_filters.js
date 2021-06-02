const add_filter_reducer = (state, action) => {
    state.filters = action.payload.filters;
};

const add_filter_action = filters => {
    return { payload: { filters } }
}


export default {
    reducer: add_filter_reducer,
    prepare: add_filter_action
};