import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
    statusText: "",
    credentials: {},
    error: {},
    status: ""
}

const auth_slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // initialize_cart: state => {
        //     state.status = "INITIALIZING"
        // },
        login: (state,action) => {
            state.status = "PROCESSING"
            // state.statusText = "Hold on, logging you in"
        },
        login_success: (state, action) => {
            state.status = "LOGGED IN";
            state.statusText = "Logged you in"
            state.credentials = {
                username: action.payload.username,
                password: action.payload.password,
            }
        },
        login_failure: (state, action) => {
            // state.statusText = "Sorry couldn't log you in :(";
            state.status = "LOGIN FAILED"
            state.statusText = action.payload.error.data.message || "login failed"
            state.error = action.payload.error;
        },
        logout: (state,action) => {
            state.status = "PROCESSING";
            // state.statusText = "logging you out :("
        },
        logout_success: (state, action) => {
            state.status = "LOGGED OUT"
            state.statusText = "Logged you out"
            state.credentials = {}
        },
        logout_failure: (state, action) => {
            // state.statusText = "Sorry couldn't log you out, guess you are stuck with us :P";
            state.reset_password_status = "LOGOUT FAILED"
            state.statusText = action.payload.error.data.message || "logout failed"
            state.error = action.payload.error;
        },
        signup: (state,action) => {
            state.status = "PROCESSING"
            // state.statusText = "Hold on, signing you up"
        },
        signup_success: (state, action) => {
            state.status = "SIGNUP SUCCESS"
            state.statusText = "Successfully registered your account. welcome aboard"
            // state.credentials = {
            //     username: action.payload.username,
            //     password: action.payload.password,
            // }
        },
        signup_failure: (state, action) => {
            state.status = "SIGNUP FAILED"
            state.statusText = action.payload.error.data.message || "signup failed"
            state.error = action.payload.error;

        },
        reset_password_initiate: (state, action) => {
            state.status = "RESET EMAIL SEND SUCCESS"
            state.statusText = "Check your email inbox. you should receive an email from us soon"
        },
        reset_password_confirm: (state, action) => {
            state.status = "PROCESSING"
            // state.statusText = "Successfully reset your password"
        },
        reset_password_success: (state, action) => {
            state.reset_password_status = "RESET PASSWORD SUCCESS"
            state.statusText = "Successfully reset your password"
        },
        reset_password_failure: (state, action) => {
            state.status = "RESET PASSWORD FAILED"
            state.statusText = action.payload.error.data.message || "reset password failed"
            state.reset_password_error = action.payload.error;
        }
    },
}) 


const persistConfig = {
    key: 'auth',
    storage: storage,
}

// auth_slice.reducer = persistReducer( persistConfig, auth_slice.reducer );

export const { login, login_success, login_failure, signup, signup_success, signup_failure, logout, logout_success, 
            logout_failure, save_interceptor, reset_password_initiate, reset_password_confirm, reset_password_success, reset_password_failure } = auth_slice.actions;
export default auth_slice