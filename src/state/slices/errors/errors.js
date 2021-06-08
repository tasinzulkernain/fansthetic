import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    fatal_error: {
        occurred: false,
        error_string: "",
        error: null,
    }
}

const errors_slice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        fatal_error: (state, action) => {
            state.fatal_error = {
                occurred: true,
                error_string: action.payload.error_string,
                error: action.error,
            }
        } 
    },
}) 


export const { fatal_error } = errors_slice.actions
export default errors_slice