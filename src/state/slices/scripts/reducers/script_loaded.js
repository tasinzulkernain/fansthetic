import _ from 'lodash'

const script_loaded_reducer = (state, action) => {
    state.to_load_scripts.splice(0,1);
    state.loaded_scripts = _.union( state.loaded_scripts, [action.payload.script]);
}

const script_loaded_action = script => {
    return { payload: { script } }
}

export default {
    reducer: script_loaded_reducer,
    prepare: script_loaded_action
};
