const loading_reducer = (state, action) => {  
    state.loading = action.payload.loading;
};

const loading_action = (loading) => {
    return { payload: { loading } }
}


export default {
    reducer: loading_reducer,
    prepare: loading_action
};