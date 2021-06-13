import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statusText: "",
    error: {},
    status: "",
    profile: {}
}

const profile_slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        fetch_profile: (state,action) => {
            state.status = "INITIALIZING"
            // state.statusText = "Hold on, logging you in"
        },
        fetch_profile_success: (state, action) => {
            console.log("came in");
            state.status = "PROFILE FETCHED";
            state.profile = action.payload.profile;
        },
        fetch_profile_failure: (state, action) => {
            // state.statusText = "Sorry couldn't log you in :(";
            state.status = "fetch_profile FAILED"
            state.statusText = action.payload.error.data.message || "fetch_profile failed"
            state.error = action.payload.error;
        },
        update_profile: (state,action) => {
            state.status = "PROCESSING";
            // state.statusText = "logging you out :("
        },
        update_profile_success: (state, action) => {
            state.status = "SUCCESS"
            state.statusText = "Profile updated successfully"
        },
        update_profile_failure: (state, action) => {
            // state.statusText = "Sorry couldn't log you out, guess you are stuck with us :P";
            state.password_change_status = "FAILED"
            state.statusText = action.payload.error.data.message || "update_profile failed"
            state.error = action.payload.error;
        },
        password_change: (state,action) => {
            state.status = "PROCESSING";
            // state.statusText = "logging you out :("
        },
        password_change_success: (state, action) => {
            state.status = "SUCCESS"
            state.statusText = "Password changed successfully. please login again with the new password"
        },
        password_change_failure: (state, action) => {
            // state.statusText = "Sorry couldn't log you out, guess you are stuck with us :P";
            state.password_change_status = "FAILED"
            state.statusText = action.payload.error.data.message || "password change failed"
            state.error = action.payload.error;
        },
    },
}) 


// auth_slice.reducer = persistReducer( persistConfig, auth_slice.reducer );

export const { fetch_profile, fetch_profile_success, fetch_profile_failure, password_change, password_change_success, password_change_failure, update_profile, update_profile_success, update_profile_failure } = profile_slice.actions;
export default profile_slice