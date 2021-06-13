import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, save_interceptor, signup, signup_success, signup_failure } from '../auth_slice';
import { fatal_error } from '../../errors/errors';
import api from '../../../../api'
import _ from 'lodash'
import forge from 'node-forge';
import Cookies from 'js-cookie';


const signupLogic = createLogic({
    type: signup,
    latest: true,

    async process({ getState, action }, dispatch, done) {
        try {
            const { email, username, password1, password2 } = action.payload;

            Cookies.remove('Authorization');

            await api.post('/auth/register/', {
                email, username, password1, password2
            })
            
            // api.defaults.headers.common['Authorization'] = "Basic " + forge.util.encode64(action.payload.username + ":" + action.payload.password);
            // Cookies.set('Authorization', "Basic " + forge.util.encode64(action.payload.username + ":" + action.payload.password));


            dispatch( signup_success( ) );

            dispatch( login( {username, password: password1} ) )
        }catch (e) {
            console.log("signup failed");
            dispatch( signup_failure({error: e.response}) )
        }
    }
})

export default signupLogic;