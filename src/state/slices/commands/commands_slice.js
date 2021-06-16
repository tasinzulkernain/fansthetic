import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    re_initialize: false,
    alert_item: {}
}

const commands_slice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        re_initialize_issue: (state, action) => {
            state.re_initialize = true
        },
        re_initialize_done: state => {
            state.re_initialize = false
        },
        show_alert: (state, action) => {
            state.alert_item = {text: action.payload.text, timeout: action.payload.timeout || 1500}; 
        },
        show_alert_done: (state) => {
            state.alert_item = {};
        }
    },
}) 


export const { show_alert, show_alert_done } = commands_slice.actions
export default commands_slice