import { createLogic } from 'redux-logic';
import { login, login_success, login_failure, save_interceptor, reset_password_initiate, reset_password_failure } from '../auth_slice';
import { fatal_error } from '../../errors/errors';
import api from '../../../../api'
import _ from 'lodash'
import Cookies from 'js-cookie';

const resetPasswordInitiateLogic = createLogic({
    type: reset_password_initiate,
    latest: true,

    async process({ action }, dispatch, done) {
        try {

            Cookies.remove('Authorization');

            await api.post('/auth/password/reset/', {
                email: action.payload.email,
            })
            Cookies.remove('Authorization');
            // dispatch( reset( {
            //     username: d.data.response.username,
            //     password: action.payload.password
            // } ) );
        }catch (e) {
            dispatch( reset_password_failure({error: e.response}) )
        }
    }
})

export default resetPasswordInitiateLogic;