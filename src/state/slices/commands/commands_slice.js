import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    re_initialize: false
}

const errors_slice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        re_initialize_issue: (state, action) => {
            state.re_initialize = true
        },
        re_initialize_done: state => {
            state.re_initialize = false
        }
    },
}) 


export const { fatal_error } = errors_slice.actions
export default errors_slice