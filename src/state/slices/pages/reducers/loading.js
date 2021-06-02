const obj_mutator = (obj, lvls, v) => {
    if(lvls.length == 0) {
        return v;
    }else {
        if(obj) obj[lvls[0]] = obj_mutator(obj[lvls[0]], lvls.slice(1), v);
        return obj;
    }
} 

const loading_reducer = (state, action) => {  
    const lvls = action.payload.lvls;      
    let comp = state[lvls[0]].component_states;
    if(lvls.length > 1) comp = obj_mutator(comp, lvls.slice(1), action.payload.loading)
    state[lvls[0]].comp = comp;
};

const loading_action = (lvls, loading) => {
    return { payload: { lvls: lvls.split('.'), loading } }
}


export default {
    reducer: loading_reducer,
    prepare: loading_action
};