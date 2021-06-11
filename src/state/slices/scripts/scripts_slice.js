import { createSlice } from '@reduxjs/toolkit'

import load_scripts_obj from './reducers/load_scripts'
import script_loaded_obj from './reducers/script_loaded'

import _ from 'lodash'

const initialState = {
    to_load_scripts: [],
    loaded_scripts: [],
}

const scripts_slice = createSlice({
    name: "scripts",
    initialState,
    reducers: {
        "load_scripts": load_scripts_obj,
        "script_loaded": script_loaded_obj,
    },
}) 

export const { load_scripts, script_loaded } = scripts_slice.actions;
export default scripts_slice;
