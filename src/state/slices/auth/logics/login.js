import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, save_interceptor } from '../auth_slice';
import { fatal_error } from '../../errors/errors';
import api from '../../../../api'
import _ from 'lodash'
import forge from 'node-forge';
import Cookies from 'js-cookie';


const loginLogic = createLogic({
    type: login,
    latest: true,

    async process({ getState, action }, dispatch, done) {
        try {
            const { username, password } = action.payload;
            Cookies.remove('Authorization');

            const d = await api.post('/auth/login/', {
                username: username,
                password: password
            })
            
            // api.defaults.headers.common['Authorization'] = "Basic " + forge.util.encode64(action.payload.username + ":" + action.payload.password);
            Cookies.set('Authorization', "Basic " + forge.util.encode64(action.payload.username + ":" + action.payload.password));


            dispatch( login_success( {
                username: d.data.response.username,
                password: action.payload.password
            } ) );
        }catch (e) {
            dispatch( login_failure({error: e.response}) )
        }
    }
})

export default loginLogic;