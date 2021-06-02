import { createSlice } from "@reduxjs/toolkit";

const obj_mutator = (obj, lvls, v) => {
    if(lvls.length == 0) {
        return v;
    }else {
        if(obj === undefined) obj = {};
        obj[lvls[0]] = obj_mutator(obj[lvls[0]], lvls.slice(1), v);
        return obj;
    }
} 

const reducer = (state, action) => {  
    const { path, val } = action.payload;
    console.log("test", path, val);      
    state.test = obj_mutator(state.test, path, val)
};

const prepare = (path, val) => {
    return { payload: { path: path.split('.'), val } }
}

const test_slice = createSlice({
    name: "test",
    initialState: {},
    reducers: {
        test_val: {
            reducer,
            prepare
        }
    }
}) 

console.log(test_slice.actions);

export const { test_val } = test_slice.actions;
export default test_slice;